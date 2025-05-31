// EmpowerU Registration Form Script
class EmpowerURegistration {
    constructor() {
        this.currentStep = 1;
        this.selectedRole = '';
        this.currentTab = 'signin';
        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgressIndicator();
    }

    bindEvents() {
        // Role selection
        const roleSelect = document.getElementById('roleSelect');
        roleSelect.addEventListener('change', (e) => this.handleRoleSelection(e));

        // Continue button from role selection
        const continueBtn = document.getElementById('continueRoleBtn');
        continueBtn.addEventListener('click', () => this.nextStep());

        // Back button
        const backBtn = document.getElementById('backBtn');
        backBtn.addEventListener('click', () => this.previousStep());

        // Tab switching
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Password toggles
        const passwordToggles = document.querySelectorAll('.password-toggle');
        passwordToggles.forEach(toggle => {
            toggle.addEventListener('click', (e) => this.togglePassword(e));
        });

        // Form submissions
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        
        loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        registerForm.addEventListener('submit', (e) => this.handleRegister(e));

        // Social login buttons
        const socialBtns = document.querySelectorAll('.social-btn');
        socialBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleSocialLogin(e));
        });

        // Password confirmation validation
        const confirmPassword = document.getElementById('confirmPassword');
        const password = document.getElementById('password');
        
        confirmPassword.addEventListener('input', () => this.validatePasswordMatch());
        password.addEventListener('input', () => this.validatePasswordMatch());
    }

    handleRoleSelection(event) {
        const selectedValue = event.target.value;
        const continueBtn = document.getElementById('continueRoleBtn');
        const roleDescription = document.getElementById('roleDescription');

        if (selectedValue) {
            this.selectedRole = selectedValue;
            continueBtn.disabled = false;
            this.showRoleDescription(selectedValue);
            this.updateLeftPanelContent(selectedValue);
        } else {
            this.selectedRole = '';
            continueBtn.disabled = true;
            roleDescription.classList.remove('visible');
        }
    }

    showRoleDescription(role) {
        const roleDescription = document.getElementById('roleDescription');
        
        const descriptions = {
            mentee: {
                icon: 'ri-user-heart-line',
                title: 'Perfect Choice for Growth Seekers!',
                content: 'As a mentee, you\'ll connect with experienced professionals in your field, access exclusive job opportunities, receive personalized career guidance, and join skill-building workshops tailored to the Cameroonian market.'
            },
            mentor: {
                icon: 'ri-user-star-line',
                title: 'Lead the Next Generation!',
                content: 'As a mentor, you\'ll guide emerging talent, expand your professional network, gain leadership experience, and contribute to building Cameroon\'s future workforce while earning recognition in your industry.'
            }
        };

        const desc = descriptions[role];
        if (desc) {
            roleDescription.innerHTML = `
                <h3><i class="${desc.icon}"></i> ${desc.title}</h3>
                <p>${desc.content}</p>
            `;
            
            setTimeout(() => {
                roleDescription.classList.add('visible');
            }, 100);
        }
    }

    updateLeftPanelContent(role) {
        const leftTitle = document.getElementById('leftTitle');
        const leftSubtitle = document.getElementById('leftSubtitle');
        const leftDescription = document.getElementById('leftDescription');
        const featuresList = document.getElementById('featuresList');

        const content = {
            mentee: {
                title: 'Accelerate Your Career Growth',
                subtitle: 'Connect with mentors who understand your journey',
                description: 'Join ambitious professionals across Cameroon building meaningful careers. Get matched with experienced mentors, discover hidden opportunities, and develop skills that matter in today\'s market.',
                features: [
                    { icon: 'ri-parent-line', text: 'Personal mentor matching' },
                    { icon: 'ri-search-line', text: 'Curated job opportunities' },
                    { icon: 'ri-graduation-cap-line', text: 'Skill development programs' },
                    { icon: 'ri-money-dollar-circle-line', text: 'Affordable at 500 FCFA/year' }
                ]
            },
            mentor: {
                title: 'Shape the Future of Work',
                subtitle: 'Guide the next generation of professionals',
                description: 'Use your expertise to mentor emerging talent across Cameroon. Build your legacy while expanding your network and gaining recognition as an industry leader.',
                features: [
                    { icon: 'ri-team-line', text: 'Mentor emerging professionals' },
                    { icon: 'ri-trophy-line', text: 'Industry recognition' },
                    { icon: 'ri-network-line', text: 'Expand your network' },
                    { icon: 'ri-heart-line', text: 'Make lasting impact' }
                ]
            }
        };

        const roleContent = content[role];
        if (roleContent) {
            // Animate out current content
            leftTitle.style.opacity = '0';
            leftSubtitle.style.opacity = '0';
            leftDescription.style.opacity = '0';
            featuresList.style.opacity = '0';

            setTimeout(() => {
                leftTitle.textContent = roleContent.title;
                leftSubtitle.textContent = roleContent.subtitle;
                leftDescription.textContent = roleContent.description;
                
                featuresList.innerHTML = roleContent.features.map(feature => `
                    <div class="feature-item">
                        <i class="${feature.icon}"></i>
                        <span>${feature.text}</span>
                    </div>
                `).join('');

                // Animate in new content
                leftTitle.style.opacity = '1';
                leftSubtitle.style.opacity = '1';
                leftDescription.style.opacity = '1';
                featuresList.style.opacity = '1';
            }, 300);
        }
    }

    nextStep() {
        if (this.currentStep < 2) {
            // Hide current step
            const currentStepEl = document.querySelector('.form-step.active');
            currentStepEl.style.animation = 'slideOut 0.3s ease-out forwards';
            
            setTimeout(() => {
                currentStepEl.classList.remove('active');
                this.currentStep++;
                
                // Show next step
                const nextStepEl = document.getElementById('authStep');
                nextStepEl.classList.add('active');
                nextStepEl.style.animation = 'slideIn 0.3s ease-out forwards';
                
                this.updateProgressIndicator();
                this.updateAuthHeader();
                this.generateDynamicFields();
            }, 300);
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            // Hide current step
            const currentStepEl = document.querySelector('.form-step.active');
            currentStepEl.style.animation = 'slideOut 0.3s ease-out forwards';
            
            setTimeout(() => {
                currentStepEl.classList.remove('active');
                this.currentStep--;
                
                // Show previous step
                const prevStepEl = document.getElementById('roleSelectionStep');
                prevStepEl.classList.add('active');
                prevStepEl.style.animation = 'slideIn 0.3s ease-out forwards';
                
                this.updateProgressIndicator();
            }, 300);
        }
    }

    updateProgressIndicator() {
        const steps = document.querySelectorAll('.progress-step');
        
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed', 'inactive');
            
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.add('inactive');
            }
        });
    }

    updateAuthHeader() {
        const authTitle = document.getElementById('authTitle');
        const authSubtitle = document.getElementById('authSubtitle');
        
        const roleTitles = {
            mentee: {
                title: 'Ready to Grow?',
                subtitle: 'Start your mentorship journey today'
            },
            mentor: {
                title: 'Ready to Lead?',
                subtitle: 'Begin inspiring the next generation'
            }
        };

        const content = roleTitles[this.selectedRole] || {
            title: 'Welcome',
            subtitle: 'Join our community'
        };

        authTitle.textContent = content.title;
        authSubtitle.textContent = content.subtitle;
    }

    generateDynamicFields() {
        const dynamicFieldsContainer = document.getElementById('dynamicFields');
        
        const menteeFields = `
            <div class="form-group">
                <label for="currentStatus">Current Status</label>
                <div class="input-wrapper">
                    <select id="currentStatus" required>
                        <option value="">Select your current status...</option>
                        <option value="student">Student</option>
                        <option value="recent_graduate">Recent Graduate</option>
                        <option value="job_seeker">Job Seeker</option>
                        <option value="career_changer">Career Changer</option>
                        <option value="employed_seeking_growth">Employed (Seeking Growth)</option>
                    </select>
                    <i class="ri-briefcase-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="interestedField">Field of Interest</label>
                <div class="input-wrapper">
                    <select id="interestedField" required>
                        <option value="">Select field of interest...</option>
                        <option value="technology">Technology & IT</option>
                        <option value="business">Business & Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="engineering">Engineering</option>
                        <option value="creative">Creative & Design</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="other">Other</option>
                    </select>
                    <i class="ri-focus-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="location">Location (City)</label>
                <div class="input-wrapper">
                    <input type="text" id="location" placeholder="e.g., Douala, Yaoundé, Bamenda" required>
                    <i class="ri-map-pin-line input-icon"></i>
                </div>
            </div>
        `;

        const mentorFields = `
            <div class="form-group">
                <label for="profession">Current Profession</label>
                <div class="input-wrapper">
                    <input type="text" id="profession" placeholder="e.g., Software Engineer, Marketing Manager" required>
                    <i class="ri-briefcase-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="experience">Years of Experience</label>
                <div class="input-wrapper">
                    <select id="experience" required>
                        <option value="">Select experience level...</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10-15">10-15 years</option>
                        <option value="15+">15+ years</option>
                    </select>
                    <i class="ri-time-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="expertise">Area of Expertise</label>
                <div class="input-wrapper">
                    <select id="expertise" required>
                        <option value="">Select area of expertise...</option>
                        <option value="technology">Technology & IT</option>
                        <option value="business">Business & Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="engineering">Engineering</option>
                        <option value="creative">Creative & Design</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="other">Other</option>
                    </select>
                    <i class="ri-star-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="company">Current Company/Organization</label>
                <div class="input-wrapper">
                    <input type="text" id="company" placeholder="Enter your current workplace" required>
                    <i class="ri-building-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="mentorLocation">Location (City)</label>
                <div class="input-wrapper">
                    <input type="text" id="mentorLocation" placeholder="e.g., Douala, Yaoundé, Bamenda" required>
                    <i class="ri-map-pin-line input-icon"></i>
                </div>
            </div>
        `;

        dynamicFieldsContainer.innerHTML = this.selectedRole === 'mentee' ? menteeFields : mentorFields;
    }

    nextStep() {
        if (this.currentStep < 2) {
            // Hide current step
            const currentStepEl = document.querySelector('.form-step.active');
            currentStepEl.style.animation = 'slideOut 0.3s ease-out forwards';
            
            setTimeout(() => {
                currentStepEl.classList.remove('active');
                this.currentStep++;
                
                // Show next step
                const nextStepEl = document.getElementById('authStep');
                nextStepEl.classList.add('active');
                nextStepEl.style.animation = 'slideIn 0.3s ease-out forwards';
                
                this.updateProgressIndicator();
                this.updateAuthHeader();
                this.generateDynamicFields();
            }, 300);
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            // Hide current step
            const currentStepEl = document.querySelector('.form-step.active');
            currentStepEl.style.animation = 'slideOut 0.3s ease-out forwards';
            
            setTimeout(() => {
                currentStepEl.classList.remove('active');
                this.currentStep--;
                
                // Show previous step
                const prevStepEl = document.getElementById('roleSelectionStep');
                prevStepEl.classList.add('active');
                prevStepEl.style.animation = 'slideIn 0.3s ease-out forwards';
                
                this.updateProgressIndicator();
            }, 300);
        }
    }

    updateProgressIndicator() {
        const steps = document.querySelectorAll('.progress-step');
        
        steps.forEach((step, index) => {
            step.classList.remove('active', 'completed', 'inactive');
            
            if (index + 1 < this.currentStep) {
                step.classList.add('completed');
            } else if (index + 1 === this.currentStep) {
                step.classList.add('active');
            } else {
                step.classList.add('inactive');
            }
        });
    }

    updateAuthHeader() {
        const authTitle = document.getElementById('authTitle');
        const authSubtitle = document.getElementById('authSubtitle');
        
        const roleTitles = {
            mentee: {
                title: 'Ready to Grow?',
                subtitle: 'Start your mentorship journey today'
            },
            mentor: {
                title: 'Ready to Lead?',
                subtitle: 'Begin inspiring the next generation'
            }
        };

        const content = roleTitles[this.selectedRole] || {
            title: 'Welcome',
            subtitle: 'Join our community'
        };

        authTitle.textContent = content.title;
        authSubtitle.textContent = content.subtitle;
    }

    generateDynamicFields() {
        const dynamicFieldsContainer = document.getElementById('dynamicFields');
        
        const menteeFields = `
            <div class="form-group">
                <label for="currentStatus">Current Status</label>
                <div class="input-wrapper">
                    <select id="currentStatus" required>
                        <option value="">Select your current status...</option>
                        <option value="student">Student</option>
                        <option value="recent_graduate">Recent Graduate</option>
                        <option value="job_seeker">Job Seeker</option>
                        <option value="career_changer">Career Changer</option>
                        <option value="employed_seeking_growth">Employed (Seeking Growth)</option>
                    </select>
                    <i class="ri-briefcase-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="interestedField">Field of Interest</label>
                <div class="input-wrapper">
                    <select id="interestedField" required>
                        <option value="">Select field of interest...</option>
                        <option value="technology">Technology & IT</option>
                        <option value="business">Business & Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="engineering">Engineering</option>
                        <option value="creative">Creative & Design</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="other">Other</option>
                    </select>
                    <i class="ri-focus-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="location">Location (City)</label>
                <div class="input-wrapper">
                    <input type="text" id="location" placeholder="e.g., Douala, Yaoundé, Bamenda" required>
                    <i class="ri-map-pin-line input-icon"></i>
                </div>
            </div>
        `;

        const mentorFields = `
            <div class="form-group">
                <label for="profession">Current Profession</label>
                <div class="input-wrapper">
                    <input type="text" id="profession" placeholder="e.g., Software Engineer, Marketing Manager" required>
                    <i class="ri-briefcase-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="experience">Years of Experience</label>
                <div class="input-wrapper">
                    <select id="experience" required>
                        <option value="">Select experience level...</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10-15">10-15 years</option>
                        <option value="15+">15+ years</option>
                    </select>
                    <i class="ri-time-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="expertise">Area of Expertise</label>
                <div class="input-wrapper">
                    <select id="expertise" required>
                        <option value="">Select area of expertise...</option>
                        <option value="technology">Technology & IT</option>
                        <option value="business">Business & Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="engineering">Engineering</option>
                        <option value="creative">Creative & Design</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="other">Other</option>
                    </select>
                    <i class="ri-star-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="company">Current Company/Organization</label>
                <div class="input-wrapper">
                    <input type="text" id="company" placeholder="Enter your current workplace" required>
                    <i class="ri-building-line input-icon"></i>
                </div>
            </div>

            <div class="form-group">
                <label for="mentorLocation">Location (City)</label>
                <div class="input-wrapper">
                    <input type="text" id="mentorLocation" placeholder="e.g., Douala, Yaoundé, Bamenda" required>
                    <i class="ri-map-pin-line input-icon"></i>
                </div>
            </div>
        `;

        dynamicFieldsContainer.innerHTML = this.selectedRole === 'mentee' ? menteeFields : mentorFields;
    }

    switchTab(tabName) {
        // Update tab buttons
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // Update tab content
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => {
            if (content.id === tabName + 'Form') {
                content.style.display = 'block';
                content.style.animation = 'fadeInUp 0.3s ease-out';
            } else {
                content.style.display = 'none';
            }
        });

        this.currentTab = tabName;
    }

    togglePassword(event) {
        const targetId = event.target.dataset.target;
        const passwordInput = document.getElementById(targetId);
        const toggleIcon = event.target;

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('ri-eye-line');
            toggleIcon.classList.add('ri-eye-off-line');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('ri-eye-off-line');
            toggleIcon.classList.add('ri-eye-line');
        }
    }

    validatePasswordMatch() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (confirmPassword.value && password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
            confirmPassword.style.borderColor = '#ef4444';
        } else {
            confirmPassword.setCustomValidity('');
            confirmPassword.style.borderColor = '';
        }
    }

    handleLogin(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const loginData = {
            email: formData.get('loginEmail') || document.getElementById('loginEmail').value,
            password: formData.get('loginPassword') || document.getElementById('loginPassword').value,
            role: this.selectedRole
        };

        // Add loading state
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing In...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Login attempt:', loginData);
            
            // Simulate successful login
            this.showSuccessMessage('Welcome back! Redirecting to your dashboard...');
            
            setTimeout(() => {
                // In a real app, redirect to dashboard
                window.location.href = '/dashboard';
            }, 2000);
        }, 1500);
    }

    handleRegister(event) {
        event.preventDefault();

        const formElements = event.target.elements;

        // Validation pour le nom (lettres, espaces, tirets, apostrophes)
        const fullName = formElements.fullName.value.trim();
        if (!/^[A-Za-zÀ-ÿ\s\-']{2,50}$/.test(fullName)) {
            this.showErrorMessage('Le nom complet ne doit contenir que des lettres et doit faire entre 2 et 50 caractères.');
            formElements.fullName.focus();
            return;
        }

        // Validation pour l'email
        const email = formElements.email.value.trim();
        if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email)) {
            this.showErrorMessage('Veuillez entrer une adresse email valide.');
            formElements.email.focus();
            return;
        }

        // Validation pour le téléphone (7 à 15 chiffres)
        const phone = formElements.phone.value.trim();
        if (!/^[0-9]{7,15}$/.test(phone)) {
            this.showErrorMessage('Le numéro de téléphone doit contenir uniquement des chiffres (7 à 15 chiffres).');
            formElements.phone.focus();
            return;
        }

        // Validation pour le mot de passe (au moins 6 caractères)
        const password = formElements.password.value;
        if (password.length < 6) {
            this.showErrorMessage('Le mot de passe doit contenir au moins 6 caractères.');
            formElements.password.focus();
            return;
        }

        // Validation confirmation mot de passe
        if (formElements.password.value !== formElements.confirmPassword.value) {
            this.showErrorMessage('Les mots de passe ne correspondent pas !');
            formElements.confirmPassword.focus();
            return;
        }

        // Ajoute ici d'autres validations spécifiques si besoin (ex : champs dynamiques)

        const registrationData = {
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
            role: this.selectedRole
        };

        // Add role-specific data
        if (this.selectedRole === 'mentee') {
            registrationData.currentStatus = formElements.currentStatus?.value;
            registrationData.interestedField = formElements.interestedField?.value;
            registrationData.location = formElements.location?.value;
        } else if (this.selectedRole === 'mentor') {
            registrationData.profession = formElements.profession?.value;
            registrationData.experience = formElements.experience?.value;
            registrationData.expertise = formElements.expertise?.value;
            registrationData.company = formElements.company?.value;
            registrationData.location = formElements.mentorLocation?.value;
        }

        // Validate password match
        if (formElements.password.value !== formElements.confirmPassword.value) {
            this.showErrorMessage('Passwords do not match!');
            return;
        }

        // Add loading state
        const submitBtn = event.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Creating Account...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Registration attempt:', registrationData);
            
            // Simulate successful registration
            this.showSuccessMessage('Account created successfully! Please check your email to verify your account.');
            
            // Reset form and switch to login
            event.target.reset();
            this.switchTab('signin');
            
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    handleSocialLogin(event) {
        const platform = event.currentTarget.classList.contains('google') ? 'Google' : 
                        event.currentTarget.classList.contains('facebook') ? 'Facebook' : 'LinkedIn';
        
        // Add loading animation
        const originalIcon = event.currentTarget.innerHTML;
        event.currentTarget.innerHTML = '<i class="ri-loader-4-line" style="animation: spin 1s linear infinite;"></i>';
        
        setTimeout(() => {
            console.log(`${platform} login for role:`, this.selectedRole);
            this.showSuccessMessage(`${platform} authentication successful! Setting up your profile...`);
            
            setTimeout(() => {
                // In a real app, handle OAuth flow
                window.location.href = '/dashboard';
            }, 2000);
        }, 1500);
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 12px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;
        
        if (type === 'success') {
            messageEl.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            messageEl.innerHTML = `<i class="ri-check-line" style="margin-right: 8px;"></i>${message}`;
        } else {
            messageEl.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
            messageEl.innerHTML = `<i class="ri-error-warning-line" style="margin-right: 8px;"></i>${message}`;
        }
        
        document.body.appendChild(messageEl);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// Add spin animation for loading icons
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EmpowerURegistration();
});
  

//Add email verification