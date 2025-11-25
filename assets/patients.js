// Patients Page JavaScript
(function() {
  'use strict';

  // Patient data (in real app, this would come from API)
  const patientsData = [
    {
      mrn: 'P-10234',
      name: 'Ana Dela Cruz',
      age: 34,
      gender: 'Female',
      phone: '+63 912 345 6789',
      email: 'ana.delacruz@email.com',
      address: '123 Main Street, Quezon City, Metro Manila',
      status: 'active',
      lastVisit: '2025-09-25',
      lastProvider: 'Dr. Juan Reyes',
      nextAppointment: '2025-11-15',
      balance: 1250.00,
      hasCriticalAlert: true,
      alert: 'Allergy: Penicillin (Critical)',
      avatarBg: 'linear-gradient(135deg, #0D9488, #14B8A6)'
    },
    {
      mrn: 'P-10677',
      name: 'Mark Santos',
      age: 28,
      gender: 'Male',
      phone: '+63 923 456 7890',
      email: 'mark.santos@email.com',
      address: '456 Oak Avenue, Makati City',
      status: 'active',
      lastVisit: '2025-10-15',
      lastProvider: 'Dr. Maria Santos',
      nextAppointment: null,
      balance: 0,
      hasCriticalAlert: false,
      avatarBg: 'linear-gradient(135deg, #0891B2, #06B6D4)'
    },
    {
      mrn: 'P-11001',
      name: 'Liza Tan',
      age: 42,
      gender: 'Female',
      phone: '+63 934 567 8901',
      email: 'liza.tan@email.com',
      address: '789 Pine Road, Taguig City',
      status: 'active',
      lastVisit: '2025-10-20',
      lastProvider: 'Dr. Robert Lim',
      nextAppointment: '2025-11-20',
      balance: 0,
      hasCriticalAlert: false,
      avatarBg: 'linear-gradient(135deg, #10B981, #34D399)'
    },
    {
      mrn: 'P-11234',
      name: 'John Reyes',
      age: 55,
      gender: 'Male',
      phone: '+63 945 678 9012',
      email: 'john.reyes@email.com',
      address: '321 Elm Street, Pasig City',
      status: 'in-queue',
      lastVisit: '2025-10-25',
      lastProvider: null,
      nextAppointment: null,
      balance: 0,
      hasCriticalAlert: false,
      waitingTime: 15,
      avatarBg: 'linear-gradient(135deg, #F59E0B, #FBBF24)'
    },
    {
      mrn: 'P-11567',
      name: 'Maria Garcia',
      age: 67,
      gender: 'Female',
      phone: '+63 956 789 0123',
      email: 'maria.garcia@email.com',
      address: '654 Maple Drive, Mandaluyong City',
      status: 'admitted',
      lastVisit: '2025-10-22',
      lastProvider: 'Dr. Ana Cruz',
      nextAppointment: null,
      balance: 0,
      hasCriticalAlert: false,
      room: '204',
      admittedDate: '2025-10-22',
      avatarBg: 'linear-gradient(135deg, #EF4444, #F87171)'
    },
    {
      mrn: 'P-11890',
      name: 'Robert Lim',
      age: 39,
      gender: 'Male',
      phone: '+63 956 789 0123',
      email: 'robert.lim@email.com',
      address: '987 Cedar Lane, San Juan City',
      status: 'active',
      lastVisit: '2025-10-18',
      lastProvider: 'Dr. Liza Tan',
      nextAppointment: '2025-12-01',
      balance: 0,
      hasCriticalAlert: false,
      avatarBg: 'linear-gradient(135deg, #8B5CF6, #A78BFA)'
    }
  ];

  let currentPatients = [...patientsData];
  let selectedPatient = null;

  // Initialize search and filters
  function initPatientSearch() {
    const searchInput = document.getElementById('patient-search');
    const statusFilter = document.getElementById('status-filter');
    const ageFilter = document.getElementById('age-filter');
    const sortBy = document.getElementById('sort-by');
    const resetBtn = document.querySelector('.btn-filter-reset');
    const searchClear = document.querySelector('.search-clear');

    // Search functionality
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        const hasValue = this.value.length > 0;
        if (searchClear) {
          searchClear.style.display = hasValue ? 'flex' : 'none';
        }
        filterPatients();
      });
    }

    // Clear search
    if (searchClear) {
      searchClear.addEventListener('click', function() {
        if (searchInput) {
          searchInput.value = '';
          this.style.display = 'none';
          filterPatients();
        }
      });
    }

    // Filter changes
    [statusFilter, ageFilter, sortBy].forEach(function(filter) {
      if (filter) {
        filter.addEventListener('change', filterPatients);
      }
    });

    // Reset filters
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        if (statusFilter) statusFilter.value = 'all';
        if (ageFilter) ageFilter.value = 'all';
        if (sortBy) sortBy.value = 'name';
        if (searchClear) searchClear.style.display = 'none';
        filterPatients();
      });
    }
  }

  // Filter and sort patients
  function filterPatients() {
    const searchInput = document.getElementById('patient-search');
    const statusFilter = document.getElementById('status-filter');
    const ageFilter = document.getElementById('age-filter');
    const sortBy = document.getElementById('sort-by');

    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const statusValue = statusFilter ? statusFilter.value : 'all';
    const ageValue = ageFilter ? ageFilter.value : 'all';
    const sortValue = sortBy ? sortBy.value : 'name';

    // Filter patients
    let filtered = patientsData.filter(function(patient) {
      // Search filter
      const matchesSearch = !searchTerm || 
        patient.name.toLowerCase().includes(searchTerm) ||
        patient.mrn.toLowerCase().includes(searchTerm) ||
        patient.phone.includes(searchTerm) ||
        (patient.email && patient.email.toLowerCase().includes(searchTerm));

      // Status filter
      const matchesStatus = statusValue === 'all' || patient.status === statusValue;

      // Age filter
      let matchesAge = true;
      if (ageValue === 'pediatric') {
        matchesAge = patient.age < 18;
      } else if (ageValue === 'adult') {
        matchesAge = patient.age >= 18 && patient.age < 65;
      } else if (ageValue === 'senior') {
        matchesAge = patient.age >= 65;
      }

      return matchesSearch && matchesStatus && matchesAge;
    });

    // Sort patients
    filtered.sort(function(a, b) {
      if (sortValue === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortValue === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortValue === 'recent') {
        return new Date(b.lastVisit) - new Date(a.lastVisit);
      } else if (sortValue === 'mrn') {
        return a.mrn.localeCompare(b.mrn);
      }
      return 0;
    });

    currentPatients = filtered;
    renderPatients();
  }

  // Render patient cards
  function renderPatients() {
    const grid = document.getElementById('patients-grid');
    const emptyState = document.getElementById('patients-empty-state');

    if (!grid) return;

    if (currentPatients.length === 0) {
      grid.style.display = 'none';
      if (emptyState) emptyState.style.display = 'flex';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    grid.style.display = 'grid';

    // Clear existing cards (keep the template structure)
    const existingCards = grid.querySelectorAll('.patient-card');
    existingCards.forEach(function(card) {
      const mrn = card.getAttribute('data-mrn');
      if (!currentPatients.find(function(p) { return p.mrn === mrn; })) {
        card.style.display = 'none';
      } else {
        card.style.display = 'block';
      }
    });

    // Show/hide cards based on filtered results
    currentPatients.forEach(function(patient) {
      const card = grid.querySelector('[data-mrn="' + patient.mrn + '"]');
      if (card) {
        card.style.display = 'block';
      }
    });
  }

  // Patient card click handlers
  function initPatientCards() {
    const grid = document.getElementById('patients-grid');
    if (!grid) return;

    grid.addEventListener('click', function(e) {
      const card = e.target.closest('.patient-card');
      if (!card) return;

      const actionBtn = e.target.closest('.btn-patient-action');
      if (actionBtn) {
        const action = actionBtn.getAttribute('data-action');
        const mrn = card.getAttribute('data-mrn');
        const patient = patientsData.find(function(p) { return p.mrn === mrn; });

        if (action === 'view' && patient) {
          showPatientProfile(patient);
        } else if (action === 'edit' && patient) {
          // Handle edit action
          console.log('Edit patient:', patient);
        } else if (action === 'more' && patient) {
          // Handle more options
          console.log('More options for:', patient);
        }
      } else {
        // Click on card itself - show profile
        const mrn = card.getAttribute('data-mrn');
        const patient = patientsData.find(function(p) { return p.mrn === mrn; });
        if (patient) {
          showPatientProfile(patient);
        }
      }
    });
  }

  // Show patient profile in modal
  function showPatientProfile(patient) {
    selectedPatient = patient;
    const modalOverlay = document.getElementById('patient-modal-overlay');
    const modal = document.getElementById('patient-modal');
    if (!modalOverlay || !modal) return;

    // Update modal header
    const avatar = document.getElementById('modal-avatar-initials');
    const name = document.getElementById('modal-patient-name');
    const mrn = document.getElementById('modal-mrn');
    const age = document.getElementById('modal-age');
    const gender = document.getElementById('modal-gender');
    const badges = document.getElementById('modal-badges');
    const alert = document.getElementById('modal-alert');
    const alertText = document.getElementById('modal-alert-text');

    if (avatar) {
      const initials = patient.name.split(' ').map(function(n) { return n[0]; }).join('');
      avatar.textContent = initials;
      document.getElementById('modal-avatar').style.background = patient.avatarBg;
    }
    if (name) name.textContent = patient.name;
    if (mrn) mrn.textContent = 'MRN: ' + patient.mrn;
    if (age) age.textContent = patient.age + ' years old';
    if (gender) gender.textContent = patient.gender;
    if (badges) {
      badges.innerHTML = '<span class="patient-badge status-' + patient.status + '">' + 
        (patient.status === 'active' ? 'Active' : 
         patient.status === 'in-queue' ? 'In Queue' : 
         patient.status === 'admitted' ? 'Admitted' : 'Discharged') + 
        '</span>' +
        (patient.hasCriticalAlert ? '<span class="patient-badge alert-critical">Critical Alert</span>' : '');
    }

    // Show/hide alert banner
    if (alert && alertText) {
      if (patient.hasCriticalAlert) {
        alert.style.display = 'flex';
        alertText.innerHTML = '<strong>Critical Allergy Alert:</strong> ' + (patient.alert || 'Critical medical alert');
      } else {
        alert.style.display = 'none';
      }
    }

    // Update modal content
    updateModalOverviewTab(patient);

    // Show modal
    modalOverlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    modalOverlay.setAttribute('aria-hidden', 'false');

    // Focus management
    setTimeout(function() {
      modal.focus();
    }, 100);
  }

  // Close modal
  function closePatientModal() {
    const modalOverlay = document.getElementById('patient-modal-overlay');
    if (!modalOverlay) return;

    modalOverlay.style.display = 'none';
    document.body.style.overflow = '';
    modalOverlay.setAttribute('aria-hidden', 'true');
    selectedPatient = null;
  }

  // Update modal overview tab with patient data
  function updateModalOverviewTab(patient) {
    const personalInfo = document.getElementById('modal-personal-info');
    const activityInfo = document.getElementById('modal-activity-info');

    if (personalInfo) {
      const infoItems = personalInfo.querySelectorAll('.info-item .value');
      if (infoItems.length >= 8) {
        infoItems[0].textContent = patient.mrn;
        infoItems[1].textContent = patient.name;
        // Calculate DOB from age
        const currentYear = new Date().getFullYear();
        const birthYear = currentYear - patient.age;
        infoItems[2].textContent = 'March 14, ' + birthYear; // Simplified
        infoItems[3].textContent = patient.age + ' years old';
        infoItems[4].textContent = patient.gender;
        infoItems[5].textContent = patient.phone;
        infoItems[6].textContent = patient.email || 'N/A';
        infoItems[7].textContent = patient.address || 'N/A';
      }
    }

    if (activityInfo) {
      const activityItems = activityInfo.querySelectorAll('.info-item .value');
      if (activityItems.length >= 4) {
        activityItems[0].textContent = 'OPD Consultation • ' + formatDate(patient.lastVisit);
        activityItems[1].textContent = patient.lastProvider || 'N/A';
        activityItems[2].textContent = patient.nextAppointment ? formatDate(patient.nextAppointment) : 'None scheduled';
        const balanceEl = activityItems[3];
        balanceEl.textContent = '₱ ' + patient.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        if (patient.balance > 0) {
          balanceEl.classList.add('warning-text');
        } else {
          balanceEl.classList.remove('warning-text');
        }
      }
    }
  }

  // Format date helper
  function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  // Initialize modal interactions
  function initModal() {
    const modalOverlay = document.getElementById('patient-modal-overlay');
    const closeBtn = document.getElementById('btn-modal-close');
    const exportBtn = document.getElementById('btn-export-pdf');

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', closePatientModal);
    }

    // Close on overlay click
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
          closePatientModal();
        }
      });
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.style.display === 'flex') {
        closePatientModal();
      }
    });

    // Tab switching in modal
    const modalTabs = document.querySelectorAll('.modal-tab');
    modalTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        const targetPanel = this.getAttribute('aria-controls');
        const allPanels = document.querySelectorAll('.modal-panel');
        const allTabs = document.querySelectorAll('.modal-tab');

        // Remove active class from all tabs and panels
        allTabs.forEach(function(t) {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        allPanels.forEach(function(p) {
          p.classList.remove('active');
          p.hidden = true;
        });

        // Add active class to clicked tab and corresponding panel
        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');
        const panel = document.getElementById(targetPanel);
        if (panel) {
          panel.classList.add('active');
          panel.hidden = false;
        }
      });
    });

    // PDF Export
    if (exportBtn) {
      exportBtn.addEventListener('click', function() {
        if (selectedPatient) {
          exportPatientToPDF(selectedPatient);
        }
      });
    }
  }

  // Export patient profile to PDF - Professional Implementation
  function exportPatientToPDF(patient) {
    if (!window.jspdf) {
      alert('PDF export library not loaded. Please refresh the page.');
      return;
    }

    const { jsPDF } = window.jspdf;

    // Show loading state
    const exportBtn = document.getElementById('btn-export-pdf');
    const originalText = exportBtn ? exportBtn.querySelector('span').textContent : '';
    if (exportBtn) {
      exportBtn.disabled = true;
      exportBtn.querySelector('span').textContent = 'Generating PDF...';
    }

    try {
      // Create PDF document
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pdfWidth - (margin * 2);
      let yPosition = margin;

      // Helper function to add new page if needed
      function checkPageBreak(requiredHeight) {
        if (yPosition + requiredHeight > pdfHeight - margin) {
          pdf.addPage();
          yPosition = margin;
          return true;
        }
        return false;
      }

      // Helper function to draw a line
      function drawLine(y) {
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.5);
        pdf.line(margin, y, pdfWidth - margin, y);
      }

      // Helper function to add section header
      function addSectionHeader(title, y) {
        pdf.setFillColor(13, 148, 136); // Primary teal
        pdf.roundedRect(margin, y - 6, contentWidth, 8, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cleanText(title), margin + 3, y);
        pdf.setTextColor(0, 0, 0);
        yPosition = y + 8;
        return yPosition;
      }

      // Helper function to decode HTML entities and clean text
      function cleanText(text) {
        if (!text) return '';
        
        // Convert to string if not already
        let cleaned = String(text);
        
        // If it's already a clean string (no HTML entities), return as is
        // Check if it looks like it has HTML entities
        const hasEntities = /&[#\w]+;/.test(cleaned) || /<[^>]*>/.test(cleaned);
        
        if (hasEntities) {
          // Remove any HTML tags first
          cleaned = cleaned.replace(/<[^>]*>/g, '');
          
          // Decode HTML entities - handle common cases
          cleaned = cleaned.replace(/&amp;/g, '&');
          cleaned = cleaned.replace(/&lt;/g, '<');
          cleaned = cleaned.replace(/&gt;/g, '>');
          cleaned = cleaned.replace(/&quot;/g, '"');
          cleaned = cleaned.replace(/&#39;/g, "'");
          cleaned = cleaned.replace(/&nbsp;/g, ' ');
          cleaned = cleaned.replace(/&#160;/g, ' '); // Non-breaking space
          
          // Decode numeric HTML entities
          cleaned = cleaned.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(parseInt(dec, 10));
          });
          
          // Decode hex HTML entities
          cleaned = cleaned.replace(/&#x([a-f\d]+);/gi, function(match, hex) {
            return String.fromCharCode(parseInt(hex, 16));
          });
          
          // If text still looks like it has entities, try DOM method as fallback
          if (cleaned.includes('&') && document) {
            try {
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = cleaned;
              cleaned = tempDiv.textContent || tempDiv.innerText || cleaned;
            } catch (e) {
              // If DOM method fails, continue with cleaned string
            }
          }
        }
        
        // Remove any control characters that might cause issues (but preserve spaces, newlines in formatted numbers)
        cleaned = cleaned.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, '');
        
        // Remove any stray ampersands that might be causing issues
        // But keep legitimate ampersands in text
        cleaned = cleaned.replace(/\s*&\s*&/g, '&'); // Remove double ampersands with spaces
        
        return cleaned.trim();
      }

      // Helper function to add key-value pair
      function addKeyValue(key, value, x, y, keyWidth, valueWidth) {
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(100, 100, 100);
        pdf.text(cleanText(key) + ':', x, y);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(0, 0, 0);
        const cleanValue = cleanText(value || 'N/A');
        const lines = pdf.splitTextToSize(cleanValue, valueWidth);
        pdf.text(lines, x + keyWidth, y);
        return y + (lines.length * 5);
      }

      // ========== HEADER SECTION ==========
      // Hospital Header
      pdf.setFillColor(13, 148, 136);
      pdf.roundedRect(margin, yPosition, contentWidth, 20, 2, 2, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('HOSPITAL INFORMATION SYSTEM', pdfWidth / 2, yPosition + 8, { align: 'center' });
      pdf.setFontSize(11);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Patient Profile Report', pdfWidth / 2, yPosition + 14, { align: 'center' });
      pdf.setTextColor(0, 0, 0);
      yPosition += 25;

      // Report metadata
      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text('Generated: ' + new Date().toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }), pdfWidth - margin, yPosition, { align: 'right' });
      yPosition += 8;

      drawLine(yPosition);
      yPosition += 5;

      // ========== PATIENT IDENTIFICATION ==========
      yPosition = addSectionHeader('PATIENT IDENTIFICATION', yPosition);
      
      // Patient name and MRN (prominent)
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(13, 148, 136);
      pdf.text(cleanText(patient.name), margin + 3, yPosition);
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('MRN: ' + cleanText(patient.mrn), margin + 3, yPosition + 6);
      yPosition += 12;

      // Patient details in two columns
      const col1X = margin + 3;
      const col2X = margin + (contentWidth / 2) + 5;
      const keyWidth = 35;
      const valueWidth = (contentWidth / 2) - keyWidth - 10;
      let col1Y = yPosition;
      let col2Y = yPosition;

      col1Y = addKeyValue('Age', cleanText(patient.age) + ' years old', col1X, col1Y, keyWidth, valueWidth);
      col1Y = addKeyValue('Gender', cleanText(patient.gender), col1X, col1Y, keyWidth, valueWidth);
      col1Y = addKeyValue('Date of Birth', 'March 14, 1991', col1X, col1Y, keyWidth, valueWidth);
      col1Y = addKeyValue('Status', cleanText(patient.status.charAt(0).toUpperCase() + patient.status.slice(1)), col1X, col1Y, keyWidth, valueWidth);

      col2Y = addKeyValue('Contact', cleanText(patient.phone), col2X, col2Y, keyWidth, valueWidth);
      col2Y = addKeyValue('Email', cleanText(patient.email || 'N/A'), col2X, col2Y, keyWidth, valueWidth);
      col2Y = addKeyValue('Address', cleanText(patient.address || 'N/A'), col2X, col2Y, keyWidth, valueWidth);

      yPosition = Math.max(col1Y, col2Y) + 5;

      // Critical Alert Banner
      if (patient.hasCriticalAlert) {
        checkPageBreak(12);
        pdf.setFillColor(239, 68, 68);
        pdf.roundedRect(margin, yPosition, contentWidth, 10, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'bold');
        const alertText = cleanText(patient.alert || 'Critical medical alert');
        pdf.text('CRITICAL ALERT: ' + alertText, margin + 3, yPosition + 7);
        pdf.setTextColor(0, 0, 0);
        yPosition += 15;
      }

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== RECENT ACTIVITY ==========
      checkPageBreak(30);
      yPosition = addSectionHeader('RECENT ACTIVITY', yPosition);

      // Helper function to format currency safely
      function formatCurrency(amount) {
        if (typeof amount !== 'number') return '0.00';
        return amount.toLocaleString('en-US', { 
          minimumFractionDigits: 2, 
          maximumFractionDigits: 2 
        });
      }

      const activityData = [
        ['Last Encounter', 'OPD Consultation • ' + formatDate(patient.lastVisit)],
        ['Last Provider', cleanText(patient.lastProvider || 'N/A')],
        ['Next Appointment', patient.nextAppointment ? formatDate(patient.nextAppointment) : 'None scheduled'],
        ['Outstanding Balance', 'PHP ' + formatCurrency(patient.balance)]
      ];

      activityData.forEach(function(item) {
        checkPageBreak(8);
        yPosition = addKeyValue(item[0], cleanText(item[1]), margin + 3, yPosition, keyWidth, contentWidth - keyWidth - 6);
      });

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== MEDICAL HISTORY ==========
      checkPageBreak(50);
      yPosition = addSectionHeader('MEDICAL HISTORY', yPosition);

      const medicalData = [
        ['Blood Type', 'O+'],
        ['Height', '165 cm'],
        ['Weight', '58 kg'],
        ['BMI', '21.3 (Normal)']
      ];

      medicalData.forEach(function(item) {
        checkPageBreak(8);
        yPosition = addKeyValue(item[0], item[1], margin + 3, yPosition, keyWidth, contentWidth - keyWidth - 6);
      });

      yPosition += 5;
      checkPageBreak(15);

      // Chronic Conditions Table
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Chronic Conditions', margin + 3, yPosition);
      yPosition += 6;

      const conditions = [
        ['Hypertension', '2019-03-15', 'Controlled'],
        ['Type 2 Diabetes', '2020-07-22', 'Managed']
      ];

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 3, yPosition - 4, contentWidth - 6, 6, 1, 1, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(0, 0, 0);
      pdf.text('Condition', margin + 5, yPosition);
      pdf.text('Diagnosed', margin + 70, yPosition);
      pdf.text('Status', margin + 110, yPosition);
      yPosition += 6;

      // Table rows
      conditions.forEach(function(row) {
        checkPageBreak(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(cleanText(row[0]), margin + 5, yPosition);
        pdf.text(cleanText(row[1]), margin + 70, yPosition);
        pdf.text(cleanText(row[2]), margin + 110, yPosition);
        drawLine(yPosition + 2);
        yPosition += 6;
      });

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== ALLERGIES ==========
      checkPageBreak(50);
      yPosition = addSectionHeader('ALLERGIES', yPosition);

      const allergies = [
        {
          name: 'Penicillin',
          severity: 'Critical',
          reaction: 'Anaphylaxis, severe hives, difficulty breathing',
          documented: '2018-05-12',
          verified: 'Dr. Maria Santos'
        },
        {
          name: 'Sulfa Drugs',
          severity: 'Moderate',
          reaction: 'Skin rash, itching',
          documented: '2020-11-03',
          verified: 'Dr. Juan Reyes'
        },
        {
          name: 'Shellfish',
          severity: 'Mild',
          reaction: 'Mild digestive discomfort',
          documented: '2015-08-20',
          verified: 'Patient self-reported'
        }
      ];

      allergies.forEach(function(allergy) {
        checkPageBreak(20);
        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'bold');
        pdf.text(cleanText(allergy.name), margin + 3, yPosition);
        
        // Severity badge
        const severityColors = {
          'Critical': [239, 68, 68],
          'Moderate': [245, 158, 11],
          'Mild': [8, 145, 178]
        };
        pdf.setFillColor.apply(pdf, severityColors[allergy.severity] || [100, 100, 100]);
        pdf.roundedRect(margin + 50, yPosition - 4, 20, 5, 1, 1, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7);
        pdf.text(cleanText(allergy.severity.toUpperCase()), margin + 60, yPosition - 1, { align: 'center' });
        pdf.setTextColor(0, 0, 0);
        
        yPosition += 6;
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        yPosition = addKeyValue('Reaction', cleanText(allergy.reaction), margin + 3, yPosition, 20, contentWidth - 25);
        yPosition = addKeyValue('Documented', cleanText(allergy.documented), margin + 3, yPosition, 20, contentWidth - 25);
        yPosition = addKeyValue('Verified by', cleanText(allergy.verified), margin + 3, yPosition, 20, contentWidth - 25);
        yPosition += 3;
        drawLine(yPosition);
        yPosition += 5;
      });

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== CURRENT MEDICATIONS ==========
      checkPageBreak(40);
      yPosition = addSectionHeader('CURRENT MEDICATIONS', yPosition);

      const medications = [
        ['Losartan', '50mg', 'Once daily', '2019-03-15', 'Dr. Santos'],
        ['Metformin', '500mg', 'Twice daily', '2020-07-22', 'Dr. Reyes']
      ];

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 3, yPosition - 4, contentWidth - 6, 6, 1, 1, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Medication', margin + 5, yPosition);
      pdf.text('Dosage', margin + 50, yPosition);
      pdf.text('Frequency', margin + 75, yPosition);
      pdf.text('Started', margin + 110, yPosition);
      pdf.text('Prescribed By', margin + 140, yPosition);
      yPosition += 6;

      medications.forEach(function(med) {
        checkPageBreak(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(cleanText(med[0]), margin + 5, yPosition);
        pdf.text(cleanText(med[1]), margin + 50, yPosition);
        pdf.text(cleanText(med[2]), margin + 75, yPosition);
        pdf.text(cleanText(med[3]), margin + 110, yPosition);
        pdf.text(cleanText(med[4]), margin + 140, yPosition);
        drawLine(yPosition + 2);
        yPosition += 6;
      });

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== RECENT ENCOUNTERS ==========
      checkPageBreak(30);
      yPosition = addSectionHeader('RECENT ENCOUNTERS', yPosition);

      const encounters = [
        ['2025-09-25', 'OPD', 'Dr. Reyes', 'Routine checkup'],
        ['2025-06-14', 'OPD', 'Dr. Santos', 'Hypertension follow-up']
      ];

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 3, yPosition - 4, contentWidth - 6, 6, 1, 1, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Date', margin + 5, yPosition);
      pdf.text('Type', margin + 40, yPosition);
      pdf.text('Provider', margin + 60, yPosition);
      pdf.text('Diagnosis', margin + 100, yPosition);
      yPosition += 6;

      encounters.forEach(function(enc) {
        checkPageBreak(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(cleanText(enc[0]), margin + 5, yPosition);
        pdf.text(cleanText(enc[1]), margin + 40, yPosition);
        pdf.text(cleanText(enc[2]), margin + 60, yPosition);
        pdf.text(cleanText(enc[3]), margin + 100, yPosition);
        drawLine(yPosition + 2);
        yPosition += 6;
      });

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== LAB RESULTS ==========
      checkPageBreak(30);
      yPosition = addSectionHeader('LAB RESULTS', yPosition);

      const labs = [
        ['2025-10-20', 'Complete Blood Count', 'Normal', 'Finalized'],
        ['2025-09-15', 'HbA1c', '6.5%', 'Finalized']
      ];

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 3, yPosition - 4, contentWidth - 6, 6, 1, 1, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Date', margin + 5, yPosition);
      pdf.text('Test', margin + 40, yPosition);
      pdf.text('Result', margin + 100, yPosition);
      pdf.text('Status', margin + 140, yPosition);
      yPosition += 6;

      labs.forEach(function(lab) {
        checkPageBreak(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(cleanText(lab[0]), margin + 5, yPosition);
        pdf.text(cleanText(lab[1]), margin + 40, yPosition);
        pdf.text(cleanText(lab[2]), margin + 100, yPosition);
        pdf.text(cleanText(lab[3]), margin + 140, yPosition);
        drawLine(yPosition + 2);
        yPosition += 6;
      });

      yPosition += 5;
      drawLine(yPosition);
      yPosition += 8;

      // ========== BILLING INFORMATION ==========
      checkPageBreak(40);
      yPosition = addSectionHeader('BILLING INFORMATION', yPosition);

      // Calculate billing amounts
      const totalBilled = 45680.00;
      const paid = 44430.00;
      const outstanding = patient.balance || 1250.00;

      const billingData = [
        ['Total Billed', 'PHP ' + formatCurrency(totalBilled)],
        ['Paid', 'PHP ' + formatCurrency(paid)],
        ['Outstanding Balance', 'PHP ' + formatCurrency(outstanding)]
      ];

      billingData.forEach(function(item) {
        checkPageBreak(8);
        yPosition = addKeyValue(item[0], cleanText(item[1]), margin + 3, yPosition, keyWidth, contentWidth - keyWidth - 6);
      });

      yPosition += 5;
      checkPageBreak(20);

      // Recent Transactions Table
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Recent Transactions', margin + 3, yPosition);
      yPosition += 6;

      const transactions = [
        ['2025-09-25', 'OPD Consultation', 'PHP ' + formatCurrency(1250.00), 'Unpaid'],
        ['2025-09-15', 'Lab Tests', 'PHP ' + formatCurrency(2500.00), 'Paid']
      ];

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.roundedRect(margin + 3, yPosition - 4, contentWidth - 6, 6, 1, 1, 'F');
      pdf.setFontSize(8);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Date', margin + 5, yPosition);
      pdf.text('Description', margin + 40, yPosition);
      pdf.text('Amount', margin + 110, yPosition);
      pdf.text('Status', margin + 140, yPosition);
      yPosition += 6;

      transactions.forEach(function(trans) {
        checkPageBreak(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(cleanText(trans[0]), margin + 5, yPosition);
        pdf.text(cleanText(trans[1]), margin + 40, yPosition);
        pdf.text(cleanText(trans[2]), margin + 110, yPosition);
        pdf.text(cleanText(trans[3]), margin + 140, yPosition);
        drawLine(yPosition + 2);
        yPosition += 6;
      });

      // ========== FOOTER ==========
      const totalPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text('Page ' + i + ' of ' + totalPages, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
        pdf.text('Confidential Medical Document', pdfWidth / 2, pdfHeight - 5, { align: 'center' });
      }

      // Save PDF
      pdf.save('Patient_Profile_' + patient.mrn + '_' + new Date().toISOString().split('T')[0] + '.pdf');

      // Reset button
      if (exportBtn) {
        exportBtn.disabled = false;
        exportBtn.querySelector('span').textContent = originalText;
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
      if (exportBtn) {
        exportBtn.disabled = false;
        exportBtn.querySelector('span').textContent = originalText;
      }
    }
  }

  // Initialize everything
  function initPatientsPage() {
    initPatientSearch();
    initPatientCards();
    initModal();
    filterPatients();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPatientsPage);
  } else {
    initPatientsPage();
  }

  // Make filterPatients available globally for onclick handlers
  window.filterPatients = filterPatients;
})();

