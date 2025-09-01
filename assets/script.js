// Configuração do WhatsApp (SUBSTITUA pelo seu número)
const WHATSAPP_NUMBER = "5517999754390"; // Formato: código do país + DDD + número

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
  const getWeatherBtn = document.getElementById('getWeatherBtn');
  const manualLocationBtn = document.getElementById('manualLocationBtn');
  const searchCityBtn = document.getElementById('searchCityBtn');
  const cityInput = document.getElementById('cityInput');
  
  if (getWeatherBtn) {
    console.log('Weather button found, adding event listener');
    getWeatherBtn.addEventListener('click', requestWeatherData);
  } else {
    console.warn('Weather button not found - widget may not be initialized');
  }
  
  if (manualLocationBtn) {
    manualLocationBtn.addEventListener('click', toggleManualLocation);
  }
  
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

function toggleManualLocation() {
  const manualLocation = document.getElementById('manualLocationInput');
  const btn = document.getElementById('manualLocationBtn');
  
  if (manualLocation.classList.contains('hidden')) {
    manualLocation.classList.remove('hidden');
    manualLocation.classList.add('show');
    btn.innerHTML = '<i class="fas fa-times"></i> Cancelar';
    
    // Focus on input
    setTimeout(() => {
      document.getElementById('cityInput').focus();
    }, 100);
  } else {
    manualLocation.classList.add('hidden');
    manualLocation.classList.remove('show');
    btn.innerHTML = '<i class="fas fa-city"></i> Buscar por cidade';
    document.getElementById('cityInput').value = '';
  }
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

async function requestWeatherData() {
  console.log('Weather request started...');
  const btn = document.getElementById('getWeatherBtn');
  const result = document.getElementById('weatherResult');
  
  // Check if elements exist
  if (!btn) {
    console.error('Weather button not found');
    return;
  }
  
  // Check if geolocation is supported
  if (!navigator.geolocation) {
    console.error('Geolocation not supported');
    showWeatherError('Geolocalização não é suportada neste navegador.');
    return;
  }
  
  // Add loading state
  btn.classList.add('loading');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Obtendo localização...';
  
  // Haptic feedback
  if ('vibrate' in navigator) {
    navigator.vibrate(50);
  }
  
  try {
    console.log('Requesting user location...');
    // Request user location
    const position = await getCurrentPosition();
    console.log('Location received:', position.coords);
    const { latitude, longitude } = position.coords;
    
    // Update button text
    btn.innerHTML = '<i class="fas fa-cloud-sun"></i> Buscando clima...';
    
    console.log('Fetching weather data for:', latitude, longitude);
    // Fetch weather data
    const weatherData = await fetchWeatherData(latitude, longitude);
    console.log('Weather data received:', weatherData);
    
    // Display weather information
    displayWeatherData(weatherData);
    
    // Show success message
    showToast('🌤️ Clima atualizado com sucesso!');
    
  } catch (error) {
    console.error('Error getting weather:', error);
    
    // More detailed error handling
    let errorMessage = 'Erro ao obter dados meteorológicos. Tente novamente.';
    
    if (error.code) {
      // Geolocation errors
      switch (error.code) {
        case 1: // PERMISSION_DENIED
          errorMessage = `
            🔐 Permissão de localização negada. 
            
            Para ativar:
            • Chrome: Clique no ícone 🔒 na barra de endereço
            • Firefox: Clique no ícone 🛡️ ao lado da URL
            • Safari: Configurações > Privacidade > Localização
            
            Ou use a opção "Buscar por cidade" abaixo.
          `;
          
          // Show custom permission toast
          showPermissionToast();
          
          // Show manual location option
          setTimeout(() => {
            const manualBtn = document.getElementById('manualLocationBtn');
            if (manualBtn) {
              manualBtn.style.background = 'var(--primary-color)';
              manualBtn.style.color = 'white';
              manualBtn.style.animation = 'pulse 2s infinite';
            }
          }, 1000);
          return; // Don't show the regular error, we're showing custom toast
          break;
        case 2: // POSITION_UNAVAILABLE
          errorMessage = 'Localização indisponível. Verifique sua conexão GPS ou use "Buscar por cidade".';
          break;
        case 3: // TIMEOUT
          errorMessage = 'Tempo limite excedido. Tente novamente ou use "Buscar por cidade".';
          break;
      }
    } else if (error.message) {
      // API errors
      if (error.message.includes('HTTP 401')) {
        errorMessage = 'Erro de autenticação da API. Verifique a chave da API.';
      } else if (error.message.includes('HTTP 404')) {
        errorMessage = 'Localização não encontrada.';
      } else if (error.message.includes('HTTP')) {
        errorMessage = 'Erro no serviço de clima. Tente novamente em alguns minutos.';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Erro de conexão. Verifique sua internet.';
      }
    }
    
    showWeatherError(errorMessage);
  } finally {
    // Reset button
    btn.classList.remove('loading');
    btn.innerHTML = '<i class="fas fa-sync-alt"></i> Atualizar';
  }
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      resolve,
      reject,
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    );
  });
}

async function fetchWeatherData(lat, lon) {
  try {
    const url = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=pt_br`;
    
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
    console.error('Fetch weather error:', error);
    throw error;
  }
}

function displayWeatherData(data) {
  const result = document.getElementById('weatherResult');
  const tempValue = document.getElementById('tempValue');
  const weatherDesc = document.getElementById('weatherDesc');
  const cityName = document.getElementById('cityName');
  const humidity = document.getElementById('humidity');
  const windSpeed = document.getElementById('windSpeed');
  const feelsLike = document.getElementById('feelsLike');
  const updateTime = document.getElementById('updateTime');
  
  // Check if all elements exist
  if (!result || !tempValue || !weatherDesc || !cityName || !humidity || !windSpeed || !feelsLike || !updateTime) {
    console.error('Missing weather display elements');
    showToast('❌ Erro na interface do widget', 3000);
    return;
  }
  
  try {
    // Populate data with safe fallbacks
    tempValue.textContent = Math.round(data.main?.temp || 0);
    weatherDesc.textContent = capitalizeFirstLetter(data.weather?.[0]?.description || 'N/A');
    cityName.textContent = `${data.name || 'Cidade'}, ${data.sys?.country || 'País'}`;
    humidity.textContent = data.main?.humidity || 0;
    windSpeed.textContent = Math.round((data.wind?.speed || 0) * 3.6); // Convert m/s to km/h
    feelsLike.textContent = Math.round(data.main?.feels_like || 0);
    updateTime.textContent = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Update weather icon based on conditions
    updateWeatherIcon(data.weather?.[0]?.icon || '01d');
    
    // Show result with animation
    result.classList.remove('hidden');
    setTimeout(() => {
      result.classList.add('show');
    }, 100);
    
  } catch (error) {
    console.error('Error displaying weather data:', error);
    showWeatherError('Erro ao exibir dados do clima');
  }
}

function updateWeatherIcon(iconCode) {
  const weatherIcon = document.querySelector('.weather-icon i');
  
  if (!weatherIcon) {
    console.warn('Weather icon element not found');
    return;
  }
  
  // Map weather icons to Font Awesome icons
  const iconMap = {
    '01d': 'fas fa-sun', // clear sky day
    '01n': 'fas fa-moon', // clear sky night
    '02d': 'fas fa-cloud-sun', // few clouds day
    '02n': 'fas fa-cloud-moon', // few clouds night
    '03d': 'fas fa-cloud', // scattered clouds
    '03n': 'fas fa-cloud',
    '04d': 'fas fa-cloud', // broken clouds
    '04n': 'fas fa-cloud',
    '09d': 'fas fa-cloud-rain', // shower rain
    '09n': 'fas fa-cloud-rain',
    '10d': 'fas fa-cloud-sun-rain', // rain day
    '10n': 'fas fa-cloud-moon-rain', // rain night
    '11d': 'fas fa-bolt', // thunderstorm
    '11n': 'fas fa-bolt',
    '13d': 'fas fa-snowflake', // snow
    '13n': 'fas fa-snowflake',
    '50d': 'fas fa-smog', // mist
    '50n': 'fas fa-smog'
  };
  
  const newIcon = iconMap[iconCode] || 'fas fa-thermometer-half';
  weatherIcon.className = newIcon;
}

function showWeatherError(message) {
  const result = document.getElementById('weatherResult');
  const tempValue = document.getElementById('tempValue');
  const weatherDesc = document.getElementById('weatherDesc');
  const cityName = document.getElementById('cityName');
  
  tempValue.textContent = '❌';
  weatherDesc.textContent = 'Erro';
  cityName.textContent = message;
  
  document.getElementById('humidity').textContent = '--';
  document.getElementById('windSpeed').textContent = '--';
  document.getElementById('feelsLike').textContent = '--';
  document.getElementById('updateTime').textContent = '--';
  
  result.classList.remove('hidden');
  setTimeout(() => {
    result.classList.add('show');
  }, 100);
  
  showToast('❌ ' + message, 5000);
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function showPermissionToast() {
  // Remove existing toast
  const existingToast = document.querySelector('.permission-toast');
  if (existingToast) {
    existingToast.remove();
  }
  
  const toast = document.createElement('div');
  toast.className = 'permission-toast';
  toast.innerHTML = `
    <div class="permission-toast-content">
      <div class="permission-icon">🔐</div>
      <div class="permission-text">
        <h4>Permissão de localização negada</h4>
        <p>Para ativar, clique no ícone 🔒 na barra de endereço ou use a busca por cidade abaixo.</p>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" class="permission-close">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;
  
  // Add toast styles
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%) translateY(-100px);
    background: #ff6b6b;
    color: white;
    padding: 0;
    border-radius: 15px;
    z-index: 10000;
    box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
    max-width: 90%;
    min-width: 300px;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;
  
  // Style the content
  const contentStyle = `
    display: flex;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
  `;
  
  const iconStyle = `
    font-size: 1.5rem;
    flex-shrink: 0;
  `;
  
  const textStyle = `
    flex: 1;
  `;
  
  const h4Style = `
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    font-weight: 600;
  `;
  
  const pStyle = `
    margin: 0;
    font-size: 0.85rem;
    opacity: 0.9;
    line-height: 1.3;
  `;
  
  const closeStyle = `
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  `;
  
  // Apply styles
  const content = toast.querySelector('.permission-toast-content');
  const icon = toast.querySelector('.permission-icon');
  const text = toast.querySelector('.permission-text');
  const h4 = toast.querySelector('h4');
  const p = toast.querySelector('p');
  const closeBtn = toast.querySelector('.permission-close');
  
  content.style.cssText = contentStyle;
  icon.style.cssText = iconStyle;
  text.style.cssText = textStyle;
  h4.style.cssText = h4Style;
  p.style.cssText = pStyle;
  closeBtn.style.cssText = closeStyle;
  
  document.body.appendChild(toast);
  
  // Animate in
  setTimeout(() => {
    toast.style.transform = 'translateX(-50%) translateY(0)';
  }, 10);
  
  // Auto remove after 8 seconds
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.transform = 'translateX(-50%) translateY(-100px)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  }, 8000);
}
