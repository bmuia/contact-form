document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const firstName = document.querySelector('.input-first-name');
    const lastName = document.querySelector('.input-last-name');
    const email = document.querySelector('.input-email');
    const radios = document.querySelectorAll('input[name="queryType"]');
    const message = document.querySelector('.input-message');
    const consent = document.querySelector('.input-consent');
    const errorMessages = document.querySelectorAll('.error-message');
    const errorEmail = document.querySelector('.error-email');
    const successMessage = document.createElement('div');
    successMessage.style.textAlign = 'center';
    successMessage.style.marginTop = '15px';
    successMessage.style.padding = '10px';
    successMessage.style.borderRadius = '0.5em';

    // Function to show an error
    function showError(input, errorMessageElement) {
        input.style.focus = '2px solid hsl(0, 66%, 54%)'; // Red border
        errorMessageElement.style.display = 'block';
    }

    // Function to hide an error
    function hideError(input, errorMessageElement) {
        input.style.border = '1px solid hsl(186, 15%, 59%)'; // Default border
        errorMessageElement.style.display = 'none';
    }

    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Check for validation errors
    function validateForm() {
        let isValid = true;

        // Reset success message
        if (successMessage.parentNode) {
            successMessage.remove();
        }

        // Validate first name
        if (firstName.value.trim() === '') {
            showError(firstName, firstName.nextElementSibling);
            isValid = false;
        } else {
            hideError(firstName, firstName.nextElementSibling);
        }

        // Validate last name
        if (lastName.value.trim() === '') {
            showError(lastName, lastName.nextElementSibling);
            isValid = false;
        } else {
            hideError(lastName, lastName.nextElementSibling);
        }

        // Validate email
        if (email.value.trim() === '' || !isValidEmail(email.value.trim())) {
            showError(email, errorEmail);
            isValid = false;
        } else {
            hideError(email, errorEmail);
        }

        // Validate query type (radio buttons)
        const isRadioChecked = Array.from(radios).some(radio => radio.checked);
        if (!isRadioChecked) {
            const queryError = document.querySelector('.query-type .error-message');
            queryError.style.display = 'block';
            isValid = false;
        } else {
            const queryError = document.querySelector('.query-type .error-message');
            queryError.style.display = 'none';
        }

        // Validate message
        if (message.value.trim() === '') {
            showError(message, message.nextElementSibling);
            isValid = false;
        } else {
            hideError(message, message.nextElementSibling);
        }

        // Validate consent checkbox
        if (!consent.checked) {
            const consentError = document.querySelector('.error-consent .error-message');
            consentError.style.display = 'block';
            isValid = false;
        } else {
            const consentError = document.querySelector('.error-consent .error-message');
            consentError.style.display = 'none';
        }

        return isValid;
    }

    // Submit form
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateForm()) {
            // If form is valid, display success message
            successMessage.textContent = 'Form submitted successfully!';
            successMessage.style.color = 'hsl(148, 38%, 50%)';
            successMessage.style.backgroundColor = 'hsl(148, 38%, 91%)';
            successMessage.style.border = '1px solid hsl(148, 38%, 50%)';
            form.parentElement.parentElement.insertBefore(successMessage, form.parentElement);
            form.reset();
            errorMessages.forEach(error => (error.style.display = 'none'));
            Array.from(form.elements).forEach(el => {
                if (el.type === 'text' || el.type === 'email' || el.type === 'textarea') {
                    el.style.border = '1px solid hsl(186, 15%, 59%)';
                }
            });
        }
    });
});
