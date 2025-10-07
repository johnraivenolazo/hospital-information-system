# hospital-information-system

## Requirements
See the [Requirements](requirements.md) document for detailed project requirements.

## PPT LINK

[Canva PPT Draft](https://www.canva.com/design/DAGzJ-UbrsQ/xGtrDrkrYuBdWSox3zw4eA/edit?utm_content=DAGzJ-UbrsQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)

## Members

- Duque, Boris Gamaliel
- Olazo, John Raiven

## Changes
### 🎨 Design System (design-system.html)
- Color & Contrast:
✅ Updated to WCAG AA compliant color palette
✅ Enhanced contrast ratios for text and UI elements
✅ Added high contrast mode support via CSS media queries
- Accessibility Features:
✅ Added skip-to-content links for keyboard users
✅ Implemented comprehensive focus indicators (3px outline with offset)
✅ Added prefers-reduced-motion support
✅ Increased minimum font sizes (14px minimum)
✅ Improved line-height for better readability (1.5)
✅ Enhanced touch targets (minimum 44x44px per WCAG 2.5.5)
- Universal Design Components:
✅ Status badges with icons AND color (not color-dependent)
✅ Loading indicators with animation
✅ Alert components with proper ARIA roles
✅ Screen reader utility classes
✅ Form validation with visible error states
✅ Disabled state styling
### 🖥️ All UI Pages Enhanced
1. Dashboard (index.html)
✅ Skip navigation link
✅ Proper ARIA landmarks (banner, main, navigation)
✅ Live regions for dynamic content (aria-live="polite")
✅ Semantic HTML with proper heading hierarchy
✅ Status indicators with visual icons + color
✅ Keyboard-accessible navigation
✅ Responsive mobile design (18px base font)
2. Login (login.html)
✅ Real-time form validation with error messages
✅ ARIA attributes (aria-required, aria-invalid, aria-describedby)
✅ Loading state with screen reader announcement
✅ Autocomplete attributes for password managers
✅ Helper text for each field
✅ Error focus management
✅ Full keyboard accessibility
3. Patients (patients.html)
✅ Accessible tabs implementation with WCAG ARIA pattern
✅ Arrow key navigation (Left/Right, Home/End)
✅ Proper tab roles and states (aria-selected, aria-controls)
✅ Critical allergy alert with proper semantics
✅ Search with proper labels
✅ Screen reader friendly tab panels
4. Appointments (appointments.html)
✅ Accessible calendar grid with role="grid"
✅ Arrow key navigation (Up/Down/Left/Right/Home/End)
✅ Each day cell has descriptive ARIA labels
✅ Visual indication of current day
✅ Appointment badges as interactive buttons
✅ Form validation with proper labels
✅ Empty state messaging
5. Labs (labs.html)
✅ Accessible data tables with proper scope attributes
✅ Status indicators NOT relying on color alone (icons + borders + text)
✅ High/Low/Normal values with ⚠/✓ symbols
✅ Table captions for screen readers
✅ Form validation with error handling
✅ Proper <th scope="row"> for row headers
✅ Focus management within tables
6. Admin (admin.html)
✅ Complex tables with proper structure
✅ Time elements with datetime attributes
✅ Disabled button states with aria-disabled
✅ Role assignment form with validation
✅ Export functionality with screen reader announcements
✅ Status badges with animation for "generating" state
✅ Audit log messaging
🌟 Universal Design Principles Applied
Principle	Implementation
Equitable Use	Works for all users regardless of ability
Flexibility in Use	Supports keyboard, mouse, touch, and screen readers
Simple & Intuitive	Clear navigation, consistent patterns
Perceptible Information	Multiple cues (color, icons, text, borders)
Tolerance for Error	Form validation, confirmation dialogs, undo capability
Low Physical Effort	44px touch targets, keyboard shortcuts
Size & Space	Responsive design, adequate spacing
♿ WCAG Compliance Features
Level A & AA Compliance:
✅ 1.1.1 All images have alt text
✅ 1.3.1 Semantic HTML structure
✅ 1.4.3 Color contrast ratios meet AA standards
✅ 2.1.1 Full keyboard functionality
✅ 2.1.2 No keyboard traps
✅ 2.4.1 Skip links to main content
✅ 2.4.3 Logical focus order
✅ 2.4.7 Visible focus indicators
✅ 2.5.5 Minimum 44×44px touch targets
✅ 3.2.4 Consistent navigation
✅ 3.3.1 Error identification
✅ 3.3.2 Labels and instructions
✅ 4.1.2 Name, Role, Value (ARIA)
✅ 4.1.3 Status messages
Additional AAA Features:
✅ Enhanced contrast in some areas
✅ Reduced motion support
✅ Enhanced focus indicators
✅ Multiple navigation methods
🎯 Key HCI Improvements
Feedback: Every action provides clear feedback (visual + screen reader)
Error Prevention: Validation before submission, clear required fields
Recognition vs Recall: Labels visible, no hidden info
Consistency: Same patterns across all pages
Aesthetic & Minimal: Clean, uncluttered interface
Help & Documentation: Helper text, placeholders, aria-descriptions
📱 Responsive & Mobile-Ready
✅ Fluid layouts that work on all screen sizes
✅ Mobile-first font sizing (18px on mobile)
✅ Touch-friendly buttons and controls
✅ Single-column layouts on mobile
✅ Horizontal scroll prevention
All files are now production-ready with comprehensive accessibility and Universal Design compliance! 🎉
