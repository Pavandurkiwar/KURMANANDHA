document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('toggle');
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // 2. Active Page Highlighting
    const currentLocation = location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    let isRoot = currentLocation === '' || currentLocation === '/';

    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (isRoot && href === 'index.html') {
            link.classList.add('active');
        } else if (!isRoot && href === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Fade-in Animation on Scroll
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    fadeElements.forEach(element => {
        element.style.opacity = '0';
        fadeInObserver.observe(element);
    });

    // 5. Form Validation (Contact Page)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const name = document.getElementById('name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else { removeError(name); }

            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phone.value.replace(/[\s-]/g, ''))) {
                showError(phone, 'Please enter a valid 10-digit phone number');
                isValid = false;
            } else { removeError(phone); }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() !== '' && !emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else { removeError(email); }

            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else { removeError(message); }

            if (isValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerText = 'Sending...';
                submitBtn.style.opacity = '0.7';

                const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                    ? 'http://localhost:5000/api/contact'
                    : '/api/contact';

                fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name.value.trim(),
                        phone: phone.value.replace(/[\s-]/g, ''),
                        email: email.value.trim(),
                        message: message.value.trim()
                    })
                })
                .then(response => response.json().then(data => ({ status: response.status, body: data })))
                .then(res => {
                    if (res.status >= 200 && res.status < 300) {
                        showStatusMessage('Thank you! Your message has been sent successfully.', 'success');
                        contactForm.reset();
                    } else {
                        showStatusMessage(res.body.message || 'Something went wrong. Please try again.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error submitting contact form:', error);
                    showStatusMessage('Unable to connect to the server. Please check if the backend is running.', 'error');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                    submitBtn.style.opacity = '1';
                });
            }
        });

        function showStatusMessage(message, type) {
            const existingMsg = contactForm.querySelector('.form-status-message');
            if (existingMsg) existingMsg.remove();

            const msgDiv = document.createElement('div');
            msgDiv.className = `form-status-message form-status-${type}`;
            msgDiv.innerText = message;
            
            msgDiv.style.padding = '12px 16px';
            msgDiv.style.borderRadius = '6px';
            msgDiv.style.marginTop = '15px';
            msgDiv.style.fontSize = '14px';
            msgDiv.style.fontWeight = '500';
            msgDiv.style.textAlign = 'center';
            msgDiv.style.transition = 'opacity 0.3s ease';
            
            if (type === 'success') {
                msgDiv.style.backgroundColor = '#d1e7dd';
                msgDiv.style.color = '#0f5132';
                msgDiv.style.border = '1px solid #badbcc';
            } else {
                msgDiv.style.backgroundColor = '#f8d7da';
                msgDiv.style.color = '#842029';
                msgDiv.style.border = '1px solid #f5c2c7';
            }

            contactForm.appendChild(msgDiv);
            
            if (type === 'success') {
                setTimeout(() => {
                    msgDiv.style.opacity = '0';
                    setTimeout(() => msgDiv.remove(), 300);
                }, 5000);
            }
        }

        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            errorElement.className = 'error-message';
            errorElement.innerText = message;
            errorElement.style.display = 'block';
            if (!formGroup.querySelector('.error-message')) formGroup.appendChild(errorElement);
            input.style.borderColor = '#e53e3e';
        }

        function removeError(input) {
            const formGroup = input.parentElement;
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) errorElement.style.display = 'none';
            input.style.borderColor = 'var(--border-color)';
        }
    }

    // 6. PRODUCT MODAL - View Details Popup
    // Attach click handlers to all "View Details" buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.product-card');
            if (card) openProductModal(card);
        });
    });

    // Also make the whole card clickable
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            openProductModal(this);
        });
    });

    function openProductModal(card) {
        const data = card.dataset;

        // Build product details HTML
        let usesHtml = '';
        if (data.uses) {
            const uses = data.uses.split(',');
            usesHtml = uses.map(u => `<span class="modal-tag">${u.trim()}</span>`).join('');
        }

        let benefitsHtml = '';
        if (data.benefits) {
            const benefits = data.benefits.split('|');
            benefitsHtml = benefits.map(b => `<li>✓ ${b.trim()}</li>`).join('');
        }

        let packagingHtml = '';
        if (data.packaging) {
            const sizes = data.packaging.split('|');
            packagingHtml = sizes.map(s => `<div class="modal-pack-item">📦 ${s.trim()}</div>`).join('');
        }

        let nutritionHtml = '';
        if (data.nutrition) {
            const items = data.nutrition.split('|');
            nutritionHtml = items.map(n => {
                const parts = n.split(':');
                return `<div class="modal-nutri-item"><strong>${parts[0].trim()}</strong><span>${parts[1]?.trim() || ''}</span></div>`;
            }).join('');
        }

        // Get the image source from the card
        const imgSrc = card.querySelector('.card-img-wrapper img')?.src || '';

        // Build the modal HTML
        const modalHtml = `
            <div class="modal-overlay" id="productModal">
                <div class="modal-content">
                    <button class="modal-close" onclick="closeProductModal()">&times;</button>
                    <div class="modal-inner">
                        <div class="modal-image-section">
                            <img src="${imgSrc}" alt="${data.name || ''}" class="modal-image">
                            ${data.rating ? `<div class="modal-rating-badge">⭐ ${data.rating}</div>` : ''}
                        </div>
                        <div class="modal-details-section">
                            <span class="modal-badge">${data.grainType ? '🌾 ' + data.grainType : (data.origin ? '📍 ' + data.origin : '✨ Product')}</span>
                            <h2 class="modal-title">${data.name || ''}</h2>
                            ${data.price ? `<div class="modal-price">${data.price}</div>` : ''}
                            
                            ${data.origin ? `<p class="modal-meta"><strong>📍 Origin:</strong> ${data.origin}</p>` : ''}
                            ${data.aroma ? `<p class="modal-meta"><strong>🌸 Aroma:</strong> ${data.aroma}</p>` : ''}
                            ${data.cookingTime ? `<p class="modal-meta"><strong>⏱ Cooking Time:</strong> ${data.cookingTime}</p>` : ''}

                            ${data.description ? `<p class="modal-desc">${data.description}</p>` : ''}

                            ${usesHtml ? `
                                <div class="modal-section">
                                    <h4 class="modal-section-title">🍽️ Popular Uses</h4>
                                    <div class="modal-tags">${usesHtml}</div>
                                </div>
                            ` : ''}

                            ${benefitsHtml ? `
                                <div class="modal-section">
                                    <h4 class="modal-section-title">✨ Key Benefits</h4>
                                    <ul class="modal-benefits">${benefitsHtml}</ul>
                                </div>
                            ` : ''}

                            ${nutritionHtml ? `
                                <div class="modal-section">
                                    <h4 class="modal-section-title">📊 Nutritional Values (per 100g)</h4>
                                    <div class="modal-nutrition">${nutritionHtml}</div>
                                </div>
                            ` : ''}

                            ${packagingHtml ? `
                                <div class="modal-section">
                                    <h4 class="modal-section-title">📦 Available Packaging</h4>
                                    <div class="modal-packaging">${packagingHtml}</div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove any existing modal
        const existingModal = document.getElementById('productModal');
        if (existingModal) existingModal.remove();

        // Add modal to the page
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Close modal on overlay click
        document.getElementById('productModal').addEventListener('click', function(e) {
            if (e.target === this) closeProductModal();
        });

        // Close modal on Escape key
        document.addEventListener('keydown', modalKeyHandler);

        // Prevent body scrolling
        document.body.style.overflow = 'hidden';

        // Trigger animation
        requestAnimationFrame(() => {
            document.getElementById('productModal').classList.add('active');
        });
    }

    function closeProductModal() {
        const modal = document.getElementById('productModal');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
        document.removeEventListener('keydown', modalKeyHandler);
        document.body.style.overflow = '';
    }

    function modalKeyHandler(e) {
        if (e.key === 'Escape') closeProductModal();
    }

    // Make functions globally accessible for onclick attributes
    window.closeProductModal = closeProductModal;
});
