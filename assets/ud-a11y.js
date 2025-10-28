// Universal Design Accessibility Features
(function() {
  'use strict';

  function initAccessibilityToggles() {
    const toggles = document.querySelectorAll('.a11y-toggle');
    
    toggles.forEach(function(toggle) {
      toggle.addEventListener('click', function() {
        const action = this.getAttribute('data-action');
        handleToggle(action, this);
      });
    });
  }

  function handleToggle(action, button) {
    const isPressed = button.getAttribute('aria-pressed') === 'true';
    const newState = !isPressed;

    // Update button state
    button.setAttribute('aria-pressed', newState);

    // Apply the toggle
    switch(action) {
      case 'toggle-contrast':
        toggleHighContrast(newState);
        savePreference('highContrast', newState);
        break;
      case 'toggle-font-scale':
        toggleLargeText(newState);
        savePreference('largeText', newState);
        break;
    }
  }

  function toggleHighContrast(enable) {
    if (enable) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }

  function toggleLargeText(enable) {
    if (enable) {
      document.body.classList.add('large-text');
    } else {
      document.body.classList.remove('large-text');
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem('a11y-' + key, value);
    } catch (e) {
      console.warn('Could not save accessibility preference:', e);
    }
  }

  function loadSavedPreferences() {
    try {
      // Load high contrast preference
      const highContrast = localStorage.getItem('a11y-highContrast') === 'true';
      if (highContrast) {
        toggleHighContrast(true);
        updateButtonState('toggle-contrast', true);
      }

      // Load large text preference
      const largeText = localStorage.getItem('a11y-largeText') === 'true';
      if (largeText) {
        toggleLargeText(true);
        updateButtonState('toggle-font-scale', true);
      }
    } catch (e) {
      console.warn('Could not load accessibility preferences:', e);
    }
  }

  function updateButtonState(action, pressed) {
    const button = document.querySelector('[data-action="' + action + '"]');
    if (button) {
      button.setAttribute('aria-pressed', pressed);
    }
  }

  // Patient Profile Tab Switching
  function initPatientTabs() {
    const tabs = document.querySelectorAll('.tab[role="tab"]');
    
    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        switchTab(this);
      });

      tab.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          switchTab(this);
        }
      });
    });
  }

  function switchTab(selectedTab) {
    const allTabs = document.querySelectorAll('.tab[role="tab"]');
    const allPanels = document.querySelectorAll('[role="tabpanel"]');
    
    // Deactivate all tabs and panels
    allTabs.forEach(function(tab) {
      tab.setAttribute('aria-selected', 'false');
    });
    allPanels.forEach(function(panel) {
      panel.hidden = true;
    });

    // Activate selected tab and panel
    selectedTab.setAttribute('aria-selected', 'true');
    const panelId = selectedTab.getAttribute('aria-controls');
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.hidden = false;
    }
  }

  // Doctor Selection and Filtering
  function initDoctorSelection() {
    const doctorCards = document.querySelectorAll('.doctor-card');
    const selectedDoctorInput = document.getElementById('selectedDoctor');
    const specializationFilter = document.getElementById('specialization');
    const availabilityFilter = document.getElementById('availability');

    doctorCards.forEach(function(card) {
      card.addEventListener('click', function() {
        selectDoctor(this, selectedDoctorInput);
      });

      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDoctor(this, selectedDoctorInput);
        }
      });
    });

    if (specializationFilter) {
      specializationFilter.addEventListener('change', function() {
        filterDoctors();
      });
    }

    if (availabilityFilter) {
      availabilityFilter.addEventListener('change', function() {
        filterDoctors();
      });
    }
  }

  function selectDoctor(card, input) {
    // Remove selection from all cards
    document.querySelectorAll('.doctor-card').forEach(function(c) {
      c.classList.remove('selected');
    });

    // Add selection to clicked card
    card.classList.add('selected');

    // Update the input field
    if (input) {
      const doctorName = card.querySelector('.doctor-name').textContent;
      input.value = doctorName;
    }
  }

  function filterDoctors() {
    const specializationFilter = document.getElementById('specialization');
    const availabilityFilter = document.getElementById('availability');
    const doctorCards = document.querySelectorAll('.doctor-card');

    const selectedSpecialization = specializationFilter ? specializationFilter.value.toLowerCase() : '';
    const selectedAvailability = availabilityFilter ? availabilityFilter.value : '';

    doctorCards.forEach(function(card) {
      const specialty = card.querySelector('.doctor-specialty').textContent.toLowerCase();
      const availabilityBadge = card.querySelector('.availability-badge');
      const isAvailable = availabilityBadge && availabilityBadge.classList.contains('available');

      let showCard = true;

      // Filter by specialization
      if (selectedSpecialization && !specialty.includes(selectedSpecialization)) {
        showCard = false;
      }

      // Filter by availability
      if (selectedAvailability === 'available' && !isAvailable) {
        showCard = false;
      }

      // Show or hide card
      card.style.display = showCard ? 'block' : 'none';
    });
  }

  // Initialize all features on page load
  document.addEventListener('DOMContentLoaded', function() {
    initAccessibilityToggles();
    loadSavedPreferences();
    initPatientTabs();
    initDoctorSelection();
  });

})();

