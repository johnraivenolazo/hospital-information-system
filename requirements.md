# Hospital Information System Requirements

## Project Overview
This project is about designing user interfaces for a Hospital Information System called HOSPITAL MANAGEMENT. It's an integrated system that covers all major areas of multi-specialty hospitals. The goal is to improve patient care, safety, confidentiality, efficiency, reduce costs, and provide better management info. It gives easy access to critical info for timely decisions.

The system handles details from every department, including doctors, staffs, specialists, and patients. This includes salaries, attendance, doctor's appointments, and billing. Doctor and staff records help maintain personnel info, attendance tracks presence, salary calculations, and billing handles patient bills efficiently.

## Modules
1. **Registration (Inpatient/Outpatient)** - Weeks 1-4
2. **Doctor Consultation and Diagnosis (Payroll/Personnel Details/Attendance)** - Weeks 5-8
3. **Treatment** - Weeks 10-13
4. **Billing (Inpatient/Outpatient)**

## Functional Requirements

### General Requirements for All Modules
- **User Authentication**: Secure login for doctors, staff, and admins.
- **Role-based Access**: Different permissions based on user type (e.g., doctor can view patient records, admin can manage staff).
- **Data Security**: Ensure patient confidentiality with encryption and access controls.
- **Reporting**: Generate reports on patient stats, billing, attendance, etc.
- **Backup and Recovery**: Regular data backups to prevent loss.

### Module-Specific Requirements

#### 1. Registration Module
- Register new patients (inpatient or outpatient).
- Collect patient info: name, age, gender, contact, address, medical history.
- Assign unique patient ID.
- Update patient info if needed.
- Search for existing patients.

#### 2. Doctor Consultation and Diagnosis Module
- Schedule appointments for patients.
- Record consultation details: symptoms, diagnosis, prescribed treatments.
- Link to doctor profiles: specialization, schedule, contact.
- Manage payroll: calculate salaries based on attendance and hours.
- Track personnel details: staff info, roles, departments.
- Attendance tracking: log in/out times for staff and doctors.

#### 3. Treatment Module
- Record treatment plans for patients.
- Track medication administration.
- Update treatment progress.
- Integrate with diagnosis from consultation module.
- Notify staff of upcoming treatments.

#### 4. Billing Module
- Generate bills for inpatient and outpatient services.
- Calculate costs: consultations, treatments, medications, room charges.
- Handle payments: cash, insurance, etc.
- Provide bill history and receipts.
- Integrate with patient records for accurate billing.

## Additional Requirements (Per Module)

### Registration Module - Patient Medical History
- **Patient Information Display**: Show patient information with indicator if there is no medical history.
- **Diagnostic Imaging Records**: Maintain traceable records of X-rays, MRI, CT scans, and other diagnostic imaging.
- **Allergy List**: Comprehensive list of allergies that a patient has, including severity and reaction details.
- **Previous Medicine Intakes**: Track and display previous medicine intakes of the patient with dosage, duration, and dates.

### Doctor Consultation and Diagnosis Module - Appointments
- **Sampling of Doctors**: Display and filter available doctors according to the appointment requirements (specialization, availability, schedule).

## Non-Functional Requirements
- **Usability**: Easy-to-use interfaces for all user types.
- **Performance**: System should handle multiple users without slowdown.
- **Scalability**: Able to add more hospitals or departments.
- **Reliability**: 99% uptime.
- **Compatibility**: Work on different devices (desktop, mobile).

## Development Timeline
- **Week 1**: Study and identify requirements (this doc).
- **Week 2**: Develop analysis diagrams (Flowcharts, ERD, Storyboarding).
- **Week 3**: Develop design diagrams (UI designs, colors, controls, forms, buttons).
- **Week 4**: Project report and final presentation.

## Entities for ERD
Based on the requirements, key entities might include:
- Patient
- Doctor
- Staff
- Appointment
- Treatment
- Bill
- Department
- Attendance
- Payroll