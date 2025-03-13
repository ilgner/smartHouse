document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark');
    
    if (document.body.classList.contains('dark')) {
      themeIcon.classList.remove('lucide-moon');
      themeIcon.classList.add('lucide-sun');
    } else {
      themeIcon.classList.remove('lucide-sun');
      themeIcon.classList.add('lucide-moon');
    }
  });
  
  // Check for preferred color scheme
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark');
    themeIcon.classList.remove('lucide-moon');
    themeIcon.classList.add('lucide-sun');
  }
  
  // Light Control
  const lightToggle = document.getElementById('light-toggle');
  const brightnessSlider = document.getElementById('brightness-slider');
  const brightnessValue = document.getElementById('brightness-value');
  const lightStatus = document.getElementById('light-status');
  
  lightToggle.addEventListener('change', function() {
    if (this.checked) {
      lightStatus.textContent = 'On';
      lightStatus.classList.remove('status-off');
      lightStatus.classList.add('status-on');
      brightnessSlider.disabled = false;
    } else {
      lightStatus.textContent = 'Off';
      lightStatus.classList.remove('status-on');
      lightStatus.classList.add('status-off');
      brightnessSlider.disabled = true;
    }
  });
  
  brightnessSlider.addEventListener('input', function() {
    brightnessValue.textContent = this.value + '%';
  });
  
  // RGB Light Control
  const rgbToggle = document.getElementById('rgb-toggle');
  const rgbBrightnessSlider = document.getElementById('rgb-brightness-slider');
  const rgbBrightnessValue = document.getElementById('rgb-brightness-value');
  const colorButtons = document.querySelectorAll('.color-btn');
  const selectedColorPreview = document.getElementById('selected-color-preview');
  const rainbowBtn = document.getElementById('rainbow-btn');
  const pulseBtn = document.getElementById('pulse-btn');
  
  rgbToggle.addEventListener('change', function() {
    const isOn = this.checked;
    
    colorButtons.forEach(btn => {
      btn.disabled = !isOn;
    });
    
    rgbBrightnessSlider.disabled = !isOn;
    rainbowBtn.disabled = !isOn;
    pulseBtn.disabled = !isOn;
  });
  
  rgbBrightnessSlider.addEventListener('input', function() {
    rgbBrightnessValue.textContent = this.value + '%';
  });
  
  colorButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (rgbToggle.checked) {
        colorButtons.forEach(btn => btn.classList.remove('selected'));
        this.classList.add('selected');
        selectedColorPreview.style.backgroundColor = this.dataset.color;
      }
    });
  });
  
  // IR Control - Tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.dataset.tab;
      
      // Update active tab button
      tabButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show active tab content
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabName + '-tab') {
          content.classList.add('active');
        }
      });
    });
  });
  
  // AC Control
  const acPowerBtn = document.getElementById('ac-power');
  const tempDisplay = document.getElementById('temperature');
  const tempUpBtn = document.getElementById('temp-up');
  const tempDownBtn = document.getElementById('temp-down');
  const acModeButtons = document.querySelectorAll('#ac-tab .button-grid .control-btn');
  
  let acPower = false;
  let temperature = 22;
  
  acPowerBtn.addEventListener('click', function() {
    acPower = !acPower;
    
    if (acPower) {
      this.classList.add('active');
      tempUpBtn.disabled = false;
      tempDownBtn.disabled = false;
      acModeButtons.forEach(btn => btn.disabled = false);
    } else {
      this.classList.remove('active');
      tempUpBtn.disabled = true;
      tempDownBtn.disabled = true;
      acModeButtons.forEach(btn => btn.disabled = true);
    }
  });
  
  tempUpBtn.addEventListener('click', function() {
    if (temperature < 30) {
      temperature++;
      tempDisplay.textContent = temperature + '°C';
    }
  });
  
  tempDownBtn.addEventListener('click', function() {
    if (temperature > 16) {
      temperature--;
      tempDisplay.  function() {
    if (temperature > 16) {
      temperature--;
      tempDisplay.textContent = temperature + '°C';
    }
  });
  
  // TV Control
  const tvPowerBtn = document.getElementById('tv-power');
  const tvPowerMainBtn = document.getElementById('tv-power-main');
  const tvRemoteButtons = document.querySelectorAll('#tv-tab .remote-btn');
  
  let tvPower = false;
  
  function toggleTvPower() {
    tvPower = !tvPower;
    
    if (tvPower) {
      tvPowerBtn.classList.add('active');
      tvRemoteButtons.forEach(btn => {
        if (btn !== tvPowerMainBtn) {
          btn.disabled = false;
        }
      });
    } else {
      tvPowerBtn.classList.remove('active');
      tvRemoteButtons.forEach(btn => {
        if (btn !== tvPowerMainBtn) {
          btn.disabled = true;
        }
      });
    }
  }
  
  tvPowerBtn.addEventListener('click', toggleTvPower);
  tvPowerMainBtn.addEventListener('click', toggleTvPower);
  
  // Initialize TV remote buttons as disabled
  tvRemoteButtons.forEach(btn => {
    if (btn !== tvPowerMainBtn) {
      btn.disabled = true;
    }
  });
  
  // Gate Control
  const openGateBtn = document.getElementById('open-gate');
  const stopGateBtn = document.getElementById('stop-gate');
  const closeGateBtn = document.getElementById('close-gate');
  const gateStatus = document.getElementById('gate-status');
  const gateProgress = document.getElementById('gate-progress');
  
  let gateState = 'closed'; // closed, opening, open, closing
  let gateProgressValue = 0;
  let gateInterval;
  
  function updateGateStatus() {
    gateStatus.className = '';
    gateStatus.classList.add('status-' + gateState);
    
    // Update icon and text
    if (gateState === 'closed') {
      gateStatus.innerHTML = '<i class="lucide-lock"></i> Closed';
    } else if (gateState === 'open') {
      gateStatus.innerHTML = '<i class="lucide-unlock"></i> Open';
    } else if (gateState === 'opening') {
      gateStatus.innerHTML = '<i class="lucide-unlock"></i> Opening';
    } else if (gateState === 'closing') {
      gateStatus.innerHTML = '<i class="lucide-lock"></i> Closing';
    }
    
    // Update buttons
    if (gateState === 'closed') {
      openGateBtn.disabled = false;
      stopGateBtn.disabled = true;
      closeGateBtn.disabled = true;
    } else if (gateState === 'open') {
      openGateBtn.disabled = true;
      stopGateBtn.disabled = true;
      closeGateBtn.disabled = false;
    } else if (gateState === 'opening' || gateState === 'closing') {
      openGateBtn.disabled = true;
      stopGateBtn.disabled = false;
      closeGateBtn.disabled = true;
    }
    
    // Update progress bar
    gateProgress.style.width = gateProgressValue + '%';
  }
  
  openGateBtn.addEventListener('click', function() {
    if (gateState === 'closed') {
      gateState = 'opening';
      gateProgressValue = 0;
      
      gateInterval = setInterval(function() {
        gateProgressValue += 10;
        
        if (gateProgressValue >= 100) {
          clearInterval(gateInterval);
          gateState = 'open';
          gateProgressValue = 100;
        }
        
        updateGateStatus();
      }, 300);
      
      updateGateStatus();
    }
  });
  
  closeGateBtn.addEventListener('click', function() {
    if (gateState === 'open') {
      gateState = 'closing';
      gateProgressValue = 100;
      
      gateInterval = setInterval(function() {
        gateProgressValue -= 10;
        
        if (gateProgressValue <= 0) {
          clearInterval(gateInterval);
          gateState = 'closed';
          gateProgressValue = 0;
        }
        
        updateGateStatus();
      }, 300);
      
      updateGateStatus();
    }
  });
  
  stopGateBtn.addEventListener('click', function() {
    if (gateState === 'opening' || gateState === 'closing') {
      clearInterval(gateInterval);
      gateState = gateProgressValue >= 50 ? 'open' : 'closed';
      gateProgressValue = gateState === 'open' ? 100 : 0;
      updateGateStatus();
    }
  });
  
  // Initialize all controls
  updateGateStatus();
});
