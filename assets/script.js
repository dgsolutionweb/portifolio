// Configuração do WhatsApp (SUBSTITUA pelo seu número)
const WHATSAPP_NUMBER = "5517999754390"; // Formato: código do país + DDD + número

// Remove any orphan 'html>' text that might appear
setTimeout(() => {
  const bodyTextNodes = [];
  const walker = document.createTreeWalker(
    document.body.parentNode,
    NodeFilter.SHOW_TEXT
  );
  
  let node;
  while (node = walker.nextNode()) {
    if (node.nodeValue && node.nodeValue.includes('html>')) {
      node.nodeValue = node.nodeValue.replace('html>', '');
    }
  }
}, 100);

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
  let isRefreshing = false;
  
  // Improved pull-to-refresh with visual feedback
  document.addEventListener('touchstart', e => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchmove', e => {
    if (window.scrollY === 0 && !isRefreshing) {
      const currentY = e.changedTouches[0].screenY;
      const pullDistance = currentY - touchStartY;
      
      if (pullDistance > 50) {
        showRefreshIndicator(Math.min(pullDistance / 150, 1));
      }
    }
  }, { passive: true });
  
  document.addEventListener('touchend', e => {
    touchEndY = e.changedTouches[0].screenY;
    handlePullToRefresh();
  }, { passive: true });
  
  function handlePullToRefresh() {
    const pullDistance = touchEndY - touchStartY;
    
    if (pullDistance > 120 && window.scrollY === 0 && !isRefreshing) {
      isRefreshing = true;
      triggerRefresh();
    } else {
      hideRefreshIndicator();
    }
  }
  
  function showRefreshIndicator(progress = 1) {
    let indicator = document.querySelector('.refresh-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'refresh-indicator';
      document.body.appendChild(indicator);
    }
    
    const rotation = progress * 360;
    indicator.innerHTML = `<i class="fas fa-sync" style="transform: rotate(${rotation}deg); transition: transform 0.1s ease;"></i> ${progress >= 1 ? 'Solte para atualizar' : 'Puxe para atualizar'}`;
    indicator.classList.add('show');
    indicator.style.opacity = Math.min(progress, 1);
  }
  
  function triggerRefresh() {
    const indicator = document.querySelector('.refresh-indicator');
    if (indicator) {
      indicator.innerHTML = '<i class="fas fa-sync fa-spin"></i> Atualizando...';
      
      // Haptic feedback
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100]);
      }
      
      // Simulate refresh
      setTimeout(() => {
        hideRefreshIndicator();
        isRefreshing = false;
        
        // Show success feedback
        showToast('Conteúdo atualizado!');
      }, 1500);
    }
  }
  
  function hideRefreshIndicator() {
    const indicator = document.querySelector('.refresh-indicator');
    if (indicator) {
      indicator.classList.remove('show');
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.parentNode.removeChild(indicator);
        }
      }, 300);
    }
  }
  
  // Swipe gestures for modal
  let startX = 0;
  let startY = 0;
  
  document.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].screenX;
    startY = e.changedTouches[0].screenY;
  }, { passive: true });
  
  document.addEventListener('touchend', e => {
    const modal = document.getElementById('whatsappModal');
    if (modal && modal.style.display === 'block') {
      const endX = e.changedTouches[0].screenX;
      const endY = e.changedTouches[0].screenY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;
      
      // Swipe down to close modal
      if (deltaY > 100 && Math.abs(deltaX) < 50) {
        closeModal();
      }
    }
  }, { passive: true });
}

// Toast notification system
function showToast(message, duration = 3000) {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    <span>${message}</span>
  `;
  
  // Add toast styles
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: var(--primary-color);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 25px;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(0, 212, 170, 0.3);
    font-size: 0.9rem;
    font-weight: 500;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    max-width: 90%;
    text-align: center;
  `;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);
  
  // Auto remove
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(-100px)';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
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

// Modal do WhatsApp com animações suaves
function openModal() {
  const modal = document.getElementById('whatsappModal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  
  // Add show class for mobile animation
  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
  
  // Haptic feedback on mobile
  if ('vibrate' in navigator) {
    navigator.vibrate(10);
  }
}

function closeModal() {
  const modal = document.getElementById('whatsappModal');
  modal.classList.remove('show');
  
  // Wait for animation to complete
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }, 400);
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

// Enhanced smooth scroll with haptic feedback
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    // Haptic feedback for navigation
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Animate scroll with easing
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update URL without triggering navigation
      history.pushState(null, null, this.getAttribute('href'));
      
      // Add visual feedback to clicked link
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    }
  });
});

// Initialize all mobile enhancements
document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initScrollReveal();
  
  // Preload critical images for better performance
  const criticalImages = [
    'assets/eu.jpg',
    'assets/projeto1.jpg',
    'assets/projeto2.jpg',
    'assets/projeto3.jpg'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Add loading state management
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  // Initialize weather widget
  initWeatherWidget();
});

// Weather Widget Functionality
const WEATHER_API_KEY = '4d8fb5b93d4af21d66a2948710284366'; // OpenWeatherMap API key
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function initWeatherWidget() {
  console.log('Initializing weather widget...');
  const searchCityBtn = document.getElementById('searchCityBtn');
  const cityInput = document.getElementById('cityInput');
  
  if (searchCityBtn) {
    searchCityBtn.addEventListener('click', searchWeatherByCity);
  }
  
  if (cityInput) {
    cityInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        searchWeatherByCity();
      }
    });
  }
}

// Quick city search function
function searchQuickCity(cityName) {
  const cityInput = document.getElementById('cityInput');
  if (cityInput) {
    cityInput.value = cityName;
  }
  searchWeatherByCity();
}

async function searchWeatherByCity() {
  const cityInput = document.getElementById('cityInput');
  const searchBtn = document.getElementById('searchCityBtn');
  const city = cityInput.value.trim();
  
  if (!city) {
    showToast('❌ Por favor, digite o nome de uma cidade', 3000);
    cityInput.focus();
    return;
  }
  
  // Add loading state
  searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
  searchBtn.disabled = true;
  
  try {
    console.log('Searching weather for city:', city);
    const weatherData = await fetchWeatherDataByCity(city);
    console.log('Weather data received for city:', weatherData);
    
    // Display weather information
    displayWeatherData(weatherData);
    
    // Hide manual input
    toggleManualLocation();
    
    // Show success message
    showToast('🌤️ Clima atualizado com sucesso!');
    
  } catch (error) {
    console.error('Error getting weather by city:', error);
    
    let errorMessage = 'Cidade não encontrada. Verifique o nome e tente novamente.';
    
    if (error.message.includes('HTTP 404')) {
      errorMessage = 'Cidade não encontrada. Tente usar o formato: "São Paulo, BR"';
    } else if (error.message.includes('HTTP 401')) {
      errorMessage = 'Erro de autenticação da API.';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = 'Erro de conexão. Verifique sua internet.';
    }
    
    showToast('❌ ' + errorMessage, 5000);
    
  } finally {
    // Reset button
    searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    searchBtn.disabled = false;
  }
}

async function fetchWeatherDataByCity(city) {
  try {
    const url = `${WEATHER_API_URL}?q=${encodeURIComponent(city)}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate response data
    if (!data || !data.main || !data.weather || !data.weather[0]) {
      throw new Error('Dados de clima inválidos recebidos da API');
    }
    
    return data;
  } catch (error) {
    console.error('Fetch weather by city error:', error);
    throw error;
  }
}

// Weather Widget - City Search Only
async function searchWeatherByCity() {
  const cityInput = document.getElementById('cityInput');
  const searchCityBtn = document.getElementById('searchCityBtn');
  const weatherResult = document.getElementById('weatherResult');
  
  if (!cityInput || !cityInput.value.trim()) {
    showToast('❌ Por favor, digite o nome de uma cidade', 3000);
    return;
  }
  
  const cityName = cityInput.value.trim();
  
  // Show loading state
  if (searchCityBtn) {
    searchCityBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    searchCityBtn.disabled = true;
  }
  
  try {
    const weatherData = await fetchWeatherDataByCity(cityName);
    updateWeatherInfo(weatherData);
    showToast('🌤️ Clima atualizado com sucesso!');
  } catch (error) {
    console.error('Error fetching weather:', error);
    showToast('❌ Cidade não encontrada. Verifique o nome e tente novamente.', 4000);
  } finally {
    if (searchCityBtn) {
      searchCityBtn.innerHTML = '<i class="fas fa-search"></i>';
      searchCityBtn.disabled = false;
    }
  }
}

async function fetchWeatherDataByCity(cityName) {
  const url = `${WEATHER_API_URL}?q=${encodeURIComponent(cityName)}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`);
  }
  
  const data = await response.json();
  
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    throw new Error('Dados inválidos recebidos da API');
  }
  
  return data;
}

function updateWeatherInfo(data) {
  const location = data.name;
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const feelsLike = Math.round(data.main.feels_like);
  const windSpeed = Math.round((data.wind?.speed || 0) * 3.6); // Convert m/s to km/h
  
  // Update the existing HTML elements
  const tempValue = document.getElementById('tempValue');
  const weatherDesc = document.getElementById('weatherDesc');
  const cityName = document.getElementById('cityName');
  const humidityEl = document.getElementById('humidity');
  const windSpeedEl = document.getElementById('windSpeed');
  const feelsLikeEl = document.getElementById('feelsLike');
  const updateTimeEl = document.getElementById('updateTime');
  const weatherResult = document.getElementById('weatherResult');
  
  if (tempValue) tempValue.textContent = temperature;
  if (weatherDesc) weatherDesc.textContent = capitalizeFirstLetter(description);
  if (cityName) cityName.textContent = `${location}, ${data.sys?.country || 'BR'}`;
  if (humidityEl) humidityEl.textContent = humidity;
  if (windSpeedEl) windSpeedEl.textContent = windSpeed;
  if (feelsLikeEl) feelsLikeEl.textContent = feelsLike;
  if (updateTimeEl) {
    updateTimeEl.textContent = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Show the weather result
  if (weatherResult) {
    weatherResult.classList.remove('hidden');
    setTimeout(() => {
      weatherResult.classList.add('show');
    }, 100);
  }
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Quick city search function
function searchQuickCity(cityName) {
  const cityInput = document.getElementById('cityInput');
  if (cityInput) {
    cityInput.value = cityName;
  }
  searchWeatherByCity();
}

function showWeatherError(message) {
  // Update the existing elements to show error state
  const tempValue = document.getElementById('tempValue');
  const weatherDesc = document.getElementById('weatherDesc');
  const cityName = document.getElementById('cityName');
  const humidityEl = document.getElementById('humidity');
  const windSpeedEl = document.getElementById('windSpeed');
  const feelsLikeEl = document.getElementById('feelsLike');
  const updateTimeEl = document.getElementById('updateTime');
  const weatherResult = document.getElementById('weatherResult');
  
  if (tempValue) tempValue.textContent = '--';
  if (weatherDesc) weatherDesc.textContent = 'Erro';
  if (cityName) cityName.textContent = message;
  if (humidityEl) humidityEl.textContent = '--';
  if (windSpeedEl) windSpeedEl.textContent = '--';
  if (feelsLikeEl) feelsLikeEl.textContent = '--';
  if (updateTimeEl) updateTimeEl.textContent = '--';
  
  // Show the weather result with error
  if (weatherResult) {
    weatherResult.classList.remove('hidden');
    setTimeout(() => {
      weatherResult.classList.add('show');
    }, 100);
  }
  
  showToast('❌ ' + message, 4000);
}
