// Configuração do WhatsApp (SUBSTITUA pelo seu número)
const WHATSAPP_NUMBER = "5517909975439"; // Formato: código do país + DDD + número

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  showInstallPrompt();
});

function showInstallPrompt() {
  // Only show on mobile devices
  if (window.innerWidth <= 768) {
    const installPrompt = document.createElement('div');
    installPrompt.className = 'install-prompt';
    installPrompt.innerHTML = `
      <div class="install-content">
        <i class="fas fa-mobile-alt"></i>
        <span>Instalar App</span>
        <button onclick="installPWA()" class="install-btn">
          <i class="fas fa-download"></i>
        </button>
        <button onclick="dismissInstall()" class="dismiss-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;
    document.body.appendChild(installPrompt);
    
    // Auto dismiss after 10 seconds
    setTimeout(() => {
      if (document.querySelector('.install-prompt')) {
        dismissInstall();
      }
    }, 10000);
  }
}

async function installPWA() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    dismissInstall();
  }
}

function dismissInstall() {
  const prompt = document.querySelector('.install-prompt');
  if (prompt) {
    prompt.remove();
  }
}

// Mobile App-like Optimizations
function initMobileOptimizations() {
  // Prevent zoom on input focus (iOS)
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      document.querySelector('meta[name="viewport"]').setAttribute('content', 
        'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    });
    
    input.addEventListener('blur', () => {
      document.querySelector('meta[name="viewport"]').setAttribute('content', 
        'width=device-width, initial-scale=1.0');
    });
  });

  // Add touch feedback
  const touchElements = document.querySelectorAll('.btn, .project-card, .skill, .nav-links a');
  touchElements.forEach(element => {
    element.addEventListener('touchstart', () => {
      element.style.transform = 'scale(0.98)';
    });
    
    element.addEventListener('touchend', () => {
      element.style.transform = '';
    });
  });

  // Haptic feedback for supported devices
  if ('vibrate' in navigator) {
    const hapticsElements = document.querySelectorAll('.btn, .quick-btn, .project-link');
    hapticsElements.forEach(element => {
      element.addEventListener('click', () => {
        navigator.vibrate(10); // Light haptic feedback
      });
    });
  }
}

// Enhanced Mobile Navigation
function initMobileNavigation() {
  let touchStartY = 0;
  let touchEndY = 0;
  
  // Pull to refresh gesture
  document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
  });
  
  document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handlePullToRefresh();
  });
  
  function handlePullToRefresh() {
    if (touchEndY - touchStartY > 100 && window.scrollY === 0) {
      // Show refresh indicator
      showRefreshIndicator();
      // Simulate refresh
      setTimeout(() => {
        hideRefreshIndicator();
        // Reload if needed
        // location.reload();
      }, 1500);
    }
  }
  
  function showRefreshIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'refresh-indicator show';
    indicator.innerHTML = '<i class="fas fa-sync fa-spin"></i> Atualizando...';
    document.body.appendChild(indicator);
  }
  
  function hideRefreshIndicator() {
    const indicator = document.querySelector('.refresh-indicator');
    if (indicator) {
      indicator.remove();
    }
  }
}

// Status Bar Color Management
function updateStatusBar() {
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const currentTheme = document.body.getAttribute('data-theme');
  
  if (currentTheme === 'light') {
    themeColorMeta.setAttribute('content', '#ffffff');
  } else {
    themeColorMeta.setAttribute('content', '#00d4aa');
  }
}

// Toggle de tema
function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Atualiza ícone do toggle
  const themeIcon = document.querySelector('.theme-toggle i');
  themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  
  // Update status bar color for PWA
  updateStatusBar();
}

// Carrega tema salvo
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.body.setAttribute('data-theme', savedTheme);
  
  const themeIcon = document.querySelector('.theme-toggle i');
  if (themeIcon) {
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }
}

// Modal do WhatsApp
function openModal() {
  const modal = document.getElementById('whatsappModal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('whatsappModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Enviar mensagem rápida para WhatsApp
function sendWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
  closeModal();
}

// Enviar mensagem personalizada
function sendCustomMessage() {
  const customMessage = document.getElementById('customMessage').value.trim();
  
  if (customMessage === '') {
    alert('Por favor, digite uma mensagem!');
    return;
  }
  
  sendWhatsApp(customMessage);
}

// Scroll suave para navegação
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Animação de digitação no terminal
function initTypingAnimation() {
  const typingElements = document.querySelectorAll('.typing-animation');
  
  typingElements.forEach((element, index) => {
    const text = element.textContent;
    element.textContent = '';
    
    setTimeout(() => {
      let i = 0;
      const typeInterval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i > text.length) {
          clearInterval(typeInterval);
        }
      }, 50);
    }, index * 1000);
  });
}

// Animação de scroll reveal
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observa seções para animação
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
}

// Fechar modal clicando fora
window.onclick = function(event) {
  const modal = document.getElementById('whatsappModal');
  if (event.target === modal) {
    closeModal();
  }
}

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  initSmoothScroll();
  initTypingAnimation();
  initScrollReveal();
  initMobileOptimizations();
  initMobileNavigation();
  updateStatusBar();
  
  // Auto-focus no textarea do modal quando abrir
  const modal = document.getElementById('whatsappModal');
  const textarea = document.getElementById('customMessage');
  
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        if (modal.style.display === 'block') {
          setTimeout(() => textarea.focus(), 300);
        }
      }
    });
  });
  
  observer.observe(modal, { attributes: true });
});

// Efeito parallax sutil nos ícones flutuantes
function initParallax() {
  const floatingIcons = document.querySelectorAll('.floating-icons i');
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    floatingIcons.forEach((icon, index) => {
      const speed = 0.1 + (index * 0.05);
      icon.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Inicializar parallax após carregamento
window.addEventListener('load', () => {
  initParallax();
  
  // Hide splash screen if PWA
  if (window.matchMedia('(display-mode: standalone)').matches) {
    document.body.classList.add('pwa-loaded');
  }
});
