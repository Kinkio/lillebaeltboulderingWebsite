// Form handler for Google Sheets integration
// Configuration is loaded from /assets/js/config.js

document.addEventListener('DOMContentLoaded', function() {
    // Get configuration (fallback if config not loaded)
    const GOOGLE_SCRIPT_URL = window.LillebaeltConfig?.GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_APPS_SCRIPT_URL';
    
    const form = document.getElementById('eventForm');
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const messageDiv = document.getElementById('formMessage');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';

        try {
            // Collect form data
            const formData = new FormData(form);
            const data = {};
            
            // Convert FormData to regular object
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Add timestamp
            data.timestamp = new Date().toLocaleString('da-DK');
            
            // Send to Google Sheets
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            // Since we're using no-cors, we can't read the response
            // But if we reach here without error, assume success
            showMessage('Tak! Din tilmelding er modtaget. Vi kontakter dig snart.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showMessage('Der opstod en fejl. Prøv igen eller kontakt os direkte.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    });

    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `form-message ${type}`;
        
        // Scroll to message
        messageDiv.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
});

// Form validation enhancements
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required], select[required]');
    
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
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
        }
    }
});
