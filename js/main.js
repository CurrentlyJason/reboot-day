/**
 * Reboot Day Website JavaScript
 * Handles interactive elements, form validation, and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navList.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navList.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (no target)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('.header').offsetHeight;
                
                // Scroll to element with offset for fixed header
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form validation and submission
    const waitlistForm = document.getElementById('waitlist-form');
    const formSuccess = document.getElementById('form-success');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            
            // Simple validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                markInvalid(nameInput, 'Please enter your name');
                isValid = false;
            } else {
                markValid(nameInput);
            }
            
            if (!emailInput.value.trim()) {
                markInvalid(emailInput, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) {
                markInvalid(emailInput, 'Please enter a valid email address');
                isValid = false;
            } else {
                markValid(emailInput);
            }
            
            // If form is valid, show success message
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For now, we'll just simulate a successful submission
                
                // Hide the form and show success message
                waitlistForm.style.display = 'none';
                formSuccess.classList.remove('hidden');
                
                // Reset form for future use
                waitlistForm.reset();
                
                // Log the submission (would be sent to server in production)
                console.log('Form submitted with:', {
                    name: nameInput.value,
                    email: emailInput.value
                });
            }
        });
    }
    
    // Helper functions for form validation
    function markInvalid(input, message) {
        input.style.borderColor = '#ff3860';
        
        // Create or update error message
        let errorMessage = input.parentNode.querySelector('.error-message');
        
        if (!errorMessage) {
            errorMessage = document.createElement('p');
            errorMessage.className = 'error-message';
            errorMessage.style.color = '#ff3860';
            errorMessage.style.fontSize = '0.8rem';
            errorMessage.style.marginTop = '0.25rem';
            input.parentNode.appendChild(errorMessage);
        }
        
        errorMessage.textContent = message;
    }
    
    function markValid(input) {
        input.style.borderColor = '#4CAF50';
        
        // Remove error message if exists
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Scroll animations for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .feature-card, .step, .highlight');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animated elements
    document.querySelectorAll('.benefit-card, .feature-card, .step, .highlight').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
});
