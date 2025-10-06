// Waiver form handler for Google Sheets integration
// Configuration is loaded from /assets/js/config.js

document.addEventListener('DOMContentLoaded', function() {
    // Get configuration (fallback if config not loaded)
    let WAIVER_SCRIPT_URL = window.LillebaeltConfig?.WAIVER_SCRIPT_URL || '';
    
    // Debug logging
    console.log('LillebaeltConfig:', window.LillebaeltConfig);
    console.log('WAIVER_SCRIPT_URL:', WAIVER_SCRIPT_URL);
    console.log('WAIVER_SCRIPT_URL length:', WAIVER_SCRIPT_URL?.length);
    console.log('Config debug:', window.LillebaeltConfig?.DEBUG_INFO);
    
    // For testing: if we're on GitHub Pages and no URL, provide a test message
    if (window.location.hostname === 'kinkio.github.io' && (!WAIVER_SCRIPT_URL || WAIVER_SCRIPT_URL.trim() === '')) {
        console.log('GitHub Pages detected but no script URL configured');
    }
    
    const form = document.getElementById('waiverForm');
    if (!form) {
        console.error('Waiver form not found');
        return;
    }
    
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');
    const messageDiv = document.getElementById('waiverMessage');
    const fullNameInput = document.getElementById('fullName');
    const birthDateInput = document.getElementById('birthDate');
    
    // Age verification
    if (birthDateInput) {
        birthDateInput.addEventListener('change', function() {
            const birthDate = new Date(this.value);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            if (age < 18) {
                showMessage('Deltagere under 18 år skal have forældres samtykke. Kontakt os for særlig procedure.', 'warning');
            }
        });
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Check if all required fields are filled
        const requiredFields = form.querySelectorAll('input[required], textarea[required]');
        let allFieldsFilled = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFieldsFilled = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!allFieldsFilled) {
            showMessage('Udfyld venligst alle påkrævede felter.', 'error');
            return;
        }
        
        // Show loading state
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            if (btnText) btnText.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'inline';
        }
        
        if (messageDiv) {
            messageDiv.textContent = '';
            messageDiv.className = 'form-message';
        }

        try {
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Add additional metadata
            data.timestamp = new Date().toLocaleString('da-DK');
            data.formType = 'Ansvarsfraskrivelse';
            
            console.log('WAIVER_SCRIPT_URL:', WAIVER_SCRIPT_URL);
            console.log('WAIVER_SCRIPT_URL length:', WAIVER_SCRIPT_URL?.length);
            console.log('Config debug:', window.LillebaeltConfig?.DEBUG_INFO);
            console.log('Submitting form data:', data);
            
            // If no URL is configured, simulate success for testing
            if (!WAIVER_SCRIPT_URL || WAIVER_SCRIPT_URL.trim() === '' || WAIVER_SCRIPT_URL === 'YOUR_WAIVER_GOOGLE_APPS_SCRIPT_URL') {
                console.log('Test mode: No Google Apps Script URL configured');
                console.log('URL value:', JSON.stringify(WAIVER_SCRIPT_URL));
                showMessage('TEST MODE: Oplysninger blev ikke sendt (ingen Google Apps Script URL konfigureret). URL: ' + (WAIVER_SCRIPT_URL || 'undefined'), 'warning');
                form.reset();
                return;
            }
            
            // Get IP address (but don't block submission if it fails)
            try {
                data.ipAddress = await getClientIP();
            } catch (ipError) {
                console.log('Could not get IP address:', ipError);
                data.ipAddress = 'Unavailable';
            }
            
            // Send to Google Sheets
            const response = await fetch(WAIVER_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            showMessage('Tak! Dine oplysninger er modtaget og gemt.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // More specific error messages
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                showMessage('Kunne ikke oprette forbindelse til serveren. Tjek din internetforbindelse.', 'error');
            } else if (error.message.includes('WAIVER_SCRIPT_URL')) {
                showMessage('Konfigurationsfejl: Google Apps Script URL mangler.', 'error');
            } else {
                showMessage('Der opstod en fejl ved indsendelse. Prøv igen eller kontakt os direkte.', 'error');
            }
        } finally {
            // Reset button state
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
            }
        }
    });

    function showMessage(text, type) {
        if (messageDiv) {
            messageDiv.textContent = text;
            messageDiv.className = `form-message ${type}`;
            
            // Scroll to message
            messageDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        } else {
            // Fallback to alert if no message div
            alert(text);
        }
    }
    
    // Get client IP for audit trail
    async function getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'Unavailable';
        }
    }
});

// Enhanced form validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const isValid = field.checkValidity() && value !== '';
        
        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                field.setCustomValidity('Indtast en gyldig email adresse');
            } else {
                field.setCustomValidity('');
            }
        }
        
        if (field.type === 'tel') {
            const phoneRegex = /^[0-9\s\+\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                field.setCustomValidity('Indtast et gyldigt telefonnummer');
            } else {
                field.setCustomValidity('');
            }
        }
        
        if (isValid && field.checkValidity()) {
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
        }
    }
});

// Warning before leaving page if form is partially filled
window.addEventListener('beforeunload', function(e) {
    const form = document.getElementById('waiverForm');
    const formData = new FormData(form);
    let hasData = false;
    
    for (let [key, value] of formData.entries()) {
        if (value.trim() !== '') {
            hasData = true;
            break;
        }
    }
    
    if (hasData) {
        e.preventDefault();
        '';
        return 'Du har udfyldte data i formularen. Er du sikker på, at du vil forlade siden?';
    }
});
