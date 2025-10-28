// Universal Design Accessibility Features
(function() {
  'use strict';

  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    initAccessibilityToggles();
    loadSavedPreferences();
  });

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
})();

