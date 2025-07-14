// Form validation and enhancement
        class ContactForm {
            constructor() {
                this.form = document.getElementById('contactForm');
                this.submitBtn = document.getElementById('submitBtn');
                this.messageDiv = document.getElementById('formMessage');
                this.progressDiv = document.getElementById('formProgress');
                this.fileUpload = document.getElementById('fileUpload');
                this.fileLabel = document.getElementById('fileLabel');
                
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.setupFileUpload();
            }

            setupEventListeners() {
                this.form.addEventListener('submit', (e) => this.handleSubmit(e));
                
                // Real-time validation
                const inputs = this.form.querySelectorAll('.form-input');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => this.validateField(input));
                    input.addEventListener('input', () => this.clearFieldError(input));
                });

                // Project type change handler
                document.getElementById('projectType').addEventListener('change', (e) => {
                    this.handleProjectTypeChange(e.target.value);
                });
            }

            setupFileUpload() {
                const fileInput = document.getElementById('attachments');
                
                fileInput.addEventListener('change', (e) => {
                    this.handleFileSelection(e.target.files);
                });

                // Drag and drop functionality
                this.fileUpload.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    this.fileUpload.classList.add('drag-over');
                });

                this.fileUpload.addEventListener('dragleave', () => {
                    this.fileUpload.classList.remove('drag-over');
                });

                this.fileUpload.addEventListener('drop', (e) => {
                    e.preventDefault();
                    this.fileUpload.classList.remove('drag-over');
                    fileInput.files = e.dataTransfer.files;
                    this.handleFileSelection(e.dataTransfer.files);
                });
            }

            handleFileSelection(files) {
                if (files.length > 0) {
                    this.fileUpload.classList.add('has-file');
                    const fileNames = Array.from(files).map(file => file.name).join(', ');
                    this.fileLabel.textContent = `Wybrano: ${fileNames}`;
                } else {
                    this.fileUpload.classList.remove('has-file');
                    this.fileLabel.textContent = 'Przeciągnij pliki lub kliknij, aby wybrać';
                }
            }

            handleProjectTypeChange(projectType) {
                const quantityField = document.getElementById('quantity');
                const deadlineField = document.getElementById('deadline');
                
                if (projectType === 'ready-product') {
                    quantityField.required = true;
                    quantityField.parentElement.querySelector('label').classList.add('required');
                } else {
                    quantityField.required = false;
                    quantityField.parentElement.querySelector('label').classList.remove('required');
                }
            }

            validateField(field) {
                const value = field.value.trim();
                let isValid = true;
                let errorMessage = '';

                // Remove existing error styling
                field.classList.remove('error', 'success');

                // Validation rules
                if (field.required && !value) {
                    isValid = false;
                    errorMessage = 'To pole jest wymagane';
                } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'Podaj poprawny adres email';
                } else if (field.type === 'tel' && value && !this.isValidPhone(value)) {
                    isValid = false;
                    errorMessage = 'Podaj poprawny numer telefonu';
                } else if (field.type === 'number' && value && parseInt(value) < 1) {
                    isValid = false;
                    errorMessage = 'Liczba musi być większa od 0';
                }

                // Apply styling
                if (isValid && value) {
                    field.classList.add('success');
                } else if (!isValid) {
                    field.classList.add('error');
                    this.showFieldError(field, errorMessage);
                }
            }

            clearFieldError(field) {
                field.classList.remove('error');
                const errorElement = field.parentElement.querySelector('.field-error');
                if (errorElement) {
                    errorElement.remove();
                }
            }

            showFieldError(field, message) {
                this.clearFieldError(field);
                const errorElement = document.createElement('div');
                errorElement.className = 'field-error';
                errorElement.style.color = '#dc3545';
                errorElement.style.fontSize = '0.8rem';
                errorElement.style.marginTop = '0.25rem';
                errorElement.textContent = message;
                field.parentElement.appendChild(errorElement);
            }

            isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            isValidPhone(phone) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
                return phoneRegex.test(phone);
            }

            validateForm() {
                const requiredFields = this.form.querySelectorAll('[required]');
                let isValid = true;

                requiredFields.forEach(field => {
                    this.validateField(field);
                    if (field.classList.contains('error')) {
                        isValid = false;
                    }
                });

                return isValid;
            }

            showMessage(message, type) {
                this.messageDiv.textContent = message;
                this.messageDiv.className = `form-message ${type}`;
                this.messageDiv.style.display = 'block';
                
                if (type === 'success') {
                    setTimeout(() => {
                        this.messageDiv.style.display = 'none';
                    }, 5000);
                }
            }

            setLoading(loading) {
                this.submitBtn.disabled = loading;
                this.progressDiv.style.display = loading ? 'flex' : 'none';
                
                if (loading) {
                    this.submitBtn.textContent = 'Wysyłanie...';
                } else {
                    this.submitBtn.textContent = 'Wyślij zapytanie';
                }
            }

            async handleSubmit(e) {
                e.preventDefault();

                if (!this.validateForm()) {
                    this.showMessage('Proszę poprawić błędy w formularzu.', 'error');
                    return;
                }

                this.setLoading(true);

                try {
                    const formData = new FormData(this.form);
                    
                    // Simulate form submission (replace with actual endpoint)
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    this.showMessage('Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się z Tobą w ciągu 24 godzin.', 'success');
                    this.form.reset();
                    this.fileUpload.classList.remove('has-file');
                    this.fileLabel.textContent = 'Przeciągnij pliki lub kliknij, aby wybrać';
                    
                } catch (error) {
                    this.showMessage('Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie lub skontaktuj się telefonicznie.', 'error');
                } finally {
                    this.setLoading(false);
                }
            }
        }

        // Initialize form when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ContactForm();
        });