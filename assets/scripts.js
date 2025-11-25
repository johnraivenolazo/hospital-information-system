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
    if (action === 'toggle-dark-mode') {
      const isDark = document.body.classList.contains('dark-mode');
      toggleDarkMode(!isDark);
      savePreference('darkMode', !isDark);
      updateDarkModeIcon(button, !isDark);
    }
  }

  function toggleDarkMode(enable) {
    if (enable) {
      document.documentElement.classList.add('dark-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
      document.body.classList.remove('dark-mode');
    }
  }

  function updateDarkModeIcon(button, isDark) {
    const icon = button.querySelector('.dark-mode-icon');
    if (icon) {
      if (isDark) {
        // Sun icon for light mode (when dark mode is on, show sun to switch back)
        icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>';
        button.setAttribute('aria-label', 'Switch to light mode');
      } else {
        // Moon icon for dark mode
        icon.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
        button.setAttribute('aria-label', 'Switch to dark mode');
      }
    }
  }

  function savePreference(key, value) {
    try {
      // Convert boolean to string explicitly for consistency
      const stringValue = typeof value === 'boolean' ? String(value) : value;
      localStorage.setItem(key, stringValue);
    } catch (e) {
      // Handle quota exceeded error
      if (e.name === 'QuotaExceededError') {
        try {
          // Clear and retry
          localStorage.clear();
          localStorage.setItem(key, typeof value === 'boolean' ? String(value) : value);
        } catch (retryError) {
          // Silently fail
        }
      }
    }
  }

  function getPreference(key, defaultValue) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) {
        return defaultValue;
      }
      // Convert string 'true'/'false' back to boolean if needed
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    } catch (e) {
      return defaultValue;
    }
  }

  function loadSavedPreferences() {
    try {
      // Load dark mode preference
      const darkMode = getPreference('darkMode', false);
      if (darkMode) {
        toggleDarkMode(true);
        const button = document.querySelector('[data-action="toggle-dark-mode"]');
        if (button) {
          button.setAttribute('aria-pressed', 'true');
          updateDarkModeIcon(button, true);
        }
      }
    } catch (e) {
      console.warn('Could not load preferences:', e);
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

  // Sidebar Toggle Functionality
  function initSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    // Desktop toggle (collapse/expand)
    if (sidebarToggle) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        body.classList.toggle('sidebar-collapsed');
        
        const newState = sidebar.classList.contains('collapsed');
        
        // Update data attribute for immediate CSS application
        if (newState) {
          document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
        } else {
          document.documentElement.removeAttribute('data-sidebar-collapsed');
        }
        
        savePreference('sidebarCollapsed', newState);
      });
    }

    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        const isOpen = sidebar.classList.contains('mobile-open');
        if (isOpen) {
          sidebar.classList.remove('mobile-open');
          if (sidebarOverlay) {
            sidebarOverlay.classList.remove('active');
          }
          body.style.overflow = '';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        } else {
          sidebar.classList.add('mobile-open');
          if (sidebarOverlay) {
            sidebarOverlay.classList.add('active');
          }
          body.style.overflow = 'hidden';
          mobileMenuBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }

    // Close sidebar on overlay click (mobile)
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', function() {
        sidebar.classList.remove('mobile-open');
        sidebarOverlay.classList.remove('active');
        body.style.overflow = '';
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    }

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('active');
        }
        body.style.overflow = '';
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });

    // Close mobile sidebar when clicking a nav item (mobile only)
    function closeMobileSidebar() {
      if (window.innerWidth <= 1024) {
        sidebar.classList.remove('mobile-open');
        if (sidebarOverlay) {
          sidebarOverlay.classList.remove('active');
        }
        body.style.overflow = '';
        if (mobileMenuBtn) {
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    }

    const navItems = sidebar.querySelectorAll('.nav-item');
    navItems.forEach(function(item) {
      item.addEventListener('click', closeMobileSidebar);
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 1024) {
          closeMobileSidebar();
        }
      }, 250);
    });

    // Load saved sidebar state IMMEDIATELY to prevent flicker
    function loadSidebarState() {
      try {
        const sidebarCollapsed = getPreference('sidebarCollapsed', false);
        
    if (sidebarCollapsed && sidebar) {
      sidebar.classList.add('collapsed');
      body.classList.add('sidebar-collapsed');
          document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
        }
      } catch (e) {
        // Silently fail
      }
    }

    // Load state immediately (before DOMContentLoaded if possible)
    loadSidebarState();
  }

  // Top Navbar Dropdowns
  function initTopNavbar() {
    const notificationsBtn = document.querySelector('.notifications-btn');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    const userProfile = document.querySelector('.user-profile');
    const userDropdown = document.querySelector('.user-dropdown');
    
    // Function to calculate dropdown position dynamically
    function updateDropdownPosition(dropdown, trigger) {
      if (!dropdown || !trigger) return;
      
      const rect = trigger.getBoundingClientRect();
      const spacing = 8; // 8px spacing from trigger
      
      // Set position relative to viewport
      const top = rect.bottom + spacing;
      const right = window.innerWidth - rect.right;
      
      dropdown.style.top = top + 'px';
      dropdown.style.right = right + 'px';
      dropdown.style.left = 'auto';
    }

    // Notifications dropdown
    if (notificationsBtn && notificationsDropdown) {
      notificationsBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = notificationsDropdown.classList.contains('active');
        
        // Close user dropdown if open
        if (userDropdown && userDropdown.classList.contains('active')) {
          userDropdown.classList.remove('active');
          if (userProfile) userProfile.classList.remove('active');
        }
        
        // Update position before showing
        if (!isActive) {
          updateDropdownPosition(notificationsDropdown, notificationsBtn);
          // Force z-index to ensure it's on top
          notificationsDropdown.style.zIndex = '99999';
        }
        
        // Toggle notifications dropdown
        if (isActive) {
          notificationsDropdown.classList.remove('active');
        } else {
          notificationsDropdown.classList.add('active');
        }
      });
      
      // Update position on window resize
      window.addEventListener('resize', function() {
        if (notificationsDropdown.classList.contains('active')) {
          updateDropdownPosition(notificationsDropdown, notificationsBtn);
        }
      });
    }
    
    // User profile dropdown
    if (userProfile && userDropdown) {
      userProfile.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = userDropdown.classList.contains('active');
        
        // Close notifications dropdown if open
        if (notificationsDropdown && notificationsDropdown.classList.contains('active')) {
          notificationsDropdown.classList.remove('active');
        }
        
        // Update position before showing
        if (!isActive) {
          updateDropdownPosition(userDropdown, userProfile);
          // Force z-index to ensure it's on top
          userDropdown.style.zIndex = '99999';
        }
        
        // Toggle user dropdown
        if (isActive) {
          userDropdown.classList.remove('active');
          userProfile.classList.remove('active');
        } else {
          userDropdown.classList.add('active');
          userProfile.classList.add('active');
        }
      });
      
      // Update position on window resize
      window.addEventListener('resize', function() {
        if (userDropdown.classList.contains('active')) {
          updateDropdownPosition(userDropdown, userProfile);
        }
      });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      // Get wrapper elements
      const notificationsWrapper = notificationsBtn ? notificationsBtn.closest('.notifications-wrapper') : null;
      const userProfileWrapper = userProfile ? userProfile.closest('.user-profile-wrapper') : null;
      
      if (notificationsWrapper && notificationsDropdown) {
        const isClickInside = notificationsWrapper.contains(e.target);
        if (!isClickInside && notificationsDropdown.classList.contains('active')) {
          notificationsDropdown.classList.remove('active');
        }
      }
      
      if (userProfileWrapper && userDropdown) {
        const isClickInside = userProfileWrapper.contains(e.target);
        if (!isClickInside && userDropdown.classList.contains('active')) {
          userDropdown.classList.remove('active');
          userProfile.classList.remove('active');
        }
      }
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        if (notificationsDropdown && notificationsDropdown.classList.contains('active')) {
          notificationsDropdown.classList.remove('active');
        }
        if (userDropdown && userDropdown.classList.contains('active')) {
          userDropdown.classList.remove('active');
          if (userProfile) userProfile.classList.remove('active');
        }
      }
    });

    // Mark all notifications as read
    const markAllReadBtn = document.querySelector('.mark-all-read');
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const unreadItems = document.querySelectorAll('.notification-dropdown-item.unread');
        unreadItems.forEach(function(item) {
          item.classList.remove('unread');
        });
        
        // Hide notification badge
        const notificationBadge = document.querySelector('.notification-badge, .notification-count');
        if (notificationBadge) {
          notificationBadge.style.display = 'none';
        }
      });
    }
  }

  // Initialize sidebar and dark mode state FIRST to prevent flicker
  function initStateEarly() {
    try {
      // Sidebar state
      const sidebarCollapsed = getPreference('sidebarCollapsed', false);
      if (sidebarCollapsed) {
        document.documentElement.setAttribute('data-sidebar-collapsed', 'true');
      }
      
      // Dark mode state (if not already applied by inline script)
      const darkMode = getPreference('darkMode', false);
      if (darkMode && !document.body.classList.contains('dark-mode')) {
        document.documentElement.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
      }
    } catch (e) {
      // Silently fail
    }
  }

  // Run immediately (before DOM is ready)
  initStateEarly();

  // Initialize all features on page load
  document.addEventListener('DOMContentLoaded', function() {
    // Apply sidebar state IMMEDIATELY before other initializations (synchronously, no delays)
    const sidebar = document.querySelector('.sidebar');
    const body = document.body;
    const sidebarCollapsed = document.documentElement.getAttribute('data-sidebar-collapsed') === 'true';
    
    // Apply classes immediately and synchronously - no async operations
    // But only if they haven't been applied already by the inline script
    if (sidebarCollapsed && sidebar) {
      const alreadyCollapsed = sidebar.classList.contains('collapsed');
      const bodyAlreadyCollapsed = body.classList.contains('sidebar-collapsed');
      
      // Only apply if not already applied (to prevent flash from re-applying)
      if (!alreadyCollapsed || !bodyAlreadyCollapsed) {
        // Disable transitions temporarily to prevent flash
        const originalSidebarTransition = sidebar.style.transition;
        const originalBodyTransition = body.style.transition;
        sidebar.style.transition = 'none';
        body.style.transition = 'none';
        
        // Also disable transitions on main and top-navbar to prevent layout shift
        const main = document.querySelector('main');
        const topNavbar = document.querySelector('.top-navbar');
        const originalMainTransition = main ? main.style.transition : null;
        const originalNavbarTransition = topNavbar ? topNavbar.style.transition : null;
        if (main) main.style.transition = 'none';
        if (topNavbar) topNavbar.style.transition = 'none';
        
        sidebar.classList.add('collapsed');
        body.classList.add('sidebar-collapsed');
        
        // Force a reflow to ensure styles are applied immediately
        void sidebar.offsetWidth;
        if (main) void main.offsetWidth;
        if (topNavbar) void topNavbar.offsetWidth;
        
        // Remove the no-transition style tag if it exists (added by inline script)
        const noTransitionStyle = document.getElementById('sidebar-no-transition');
        if (noTransitionStyle) {
          noTransitionStyle.remove();
        }
        
        // Re-enable transitions after styles are applied (use double RAF for better timing)
        requestAnimationFrame(function() {
          requestAnimationFrame(function() {
            sidebar.style.transition = originalSidebarTransition || '';
            body.style.transition = originalBodyTransition || '';
            if (main) main.style.transition = originalMainTransition || '';
            if (topNavbar) topNavbar.style.transition = originalNavbarTransition || '';
          });
        });
      }
    }

    // Ensure dark mode is applied (backup in case inline script didn't run)
    const darkMode = getPreference('darkMode', false);
    if (darkMode && !body.classList.contains('dark-mode')) {
      toggleDarkMode(true);
      const button = document.querySelector('[data-action="toggle-dark-mode"]');
      if (button) {
        button.setAttribute('aria-pressed', 'true');
        updateDarkModeIcon(button, true);
      }
    }

    initAccessibilityToggles();
    loadSavedPreferences();
    initPatientTabs();
    initDoctorSelection();
    initSidebar();
    initTopNavbar();
  });

})();

