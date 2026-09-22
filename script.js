/**
 * DURAI - PORTFOLIO INTERACTIVITY & CONFIGURATION
 * 
 * ==========================================================================
 * 👤 EDITABLE PERSONAL CONTACT CONFIGURATION
 * ==========================================================================
 * To update your contact details, social profile links, or resume,
 * edit the values inside this portfolioData object.
 */
const portfolioData = {
    name: "Durai",
    email: "duraikarthick0512@gmail.com",
    phone: "+91 86108 69163",
    location: "Thoothukudi",
    github: "https://github.com/durai2006",
    linkedin: "https://linkedin.com/in/yourusername",
    resume: "#"
};

/**
 * 📬 FORM BACKEND ENDPOINT (OPTIONAL)
 * Add your form service URL here later (e.g. Formspree, EmailJS, Web3Forms, or custom API)
 */
const formEndpoint = "";

// Initialize Lucide Icons on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Populate Dynamic Contact Information
    initContactInfo();

    // Initialize 3D Particle Background
    initParticleBackground();

    // Initialize 3D Card Tilt Effect
    initTiltEffect();

    // Initialize Scroll Animations & Navigation Spy
    initNavigationAndScroll();

    // Initialize Contact Form
    initContactForm();

    // Set Copyright Year
    const yearElem = document.getElementById('current-year');
    if (yearElem) {
        yearElem.textContent = new Date().getFullYear();
    }
});

/**
 * Populate contact section and social elements with portfolioData
 */
function initContactInfo() {
    const emailElem = document.getElementById('contact-email');
    const phoneElem = document.getElementById('contact-phone');
    const locationElem = document.getElementById('contact-location');
    const githubElem = document.getElementById('contact-github');
    const linkedinElem = document.getElementById('contact-linkedin');
    const resumeElem = document.getElementById('contact-resume');

    if (emailElem) {
        emailElem.textContent = portfolioData.email;
        emailElem.href = `mailto:${portfolioData.email}`;
    }

    if (phoneElem) {
        phoneElem.textContent = portfolioData.phone;
        phoneElem.href = `tel:${portfolioData.phone.replace(/\s+/g, '')}`;
    }

    if (locationElem) {
        locationElem.textContent = portfolioData.location;
    }

    if (githubElem) {
        const displayGithub = portfolioData.github.replace('https://', '');
        githubElem.textContent = displayGithub;
        githubElem.href = portfolioData.github;
        handlePlaceholderLink(githubElem, 'GitHub', portfolioData.github);
    }

    if (linkedinElem) {
        const displayLinkedin = portfolioData.linkedin.replace('https://', '');
        linkedinElem.textContent = displayLinkedin;
        linkedinElem.href = portfolioData.linkedin;
        handlePlaceholderLink(linkedinElem, 'LinkedIn', portfolioData.linkedin);
    }

    if (resumeElem) {
        resumeElem.href = portfolioData.resume;
        if (portfolioData.resume === '#' || portfolioData.resume === '') {
            handlePlaceholderLink(resumeElem, 'Resume', portfolioData.resume);
        }
    }
}

/**
 * Handle placeholder links gracefully so users get a friendly notice
 */
function handlePlaceholderLink(element, linkName, url) {
    element.addEventListener('click', (e) => {
        if (url.includes('yourusername') || url === '#' || url === '') {
            e.preventDefault();
            showToast(`Note: Please update the ${linkName} link in script.js (portfolioData).`);
        }
    });
}

/**
 * Display toast notification window
 */
function showToast(message) {
    const toast = document.getElementById('toast-modal');
    const toastMsg = document.getElementById('toast-message');
    const toastClose = document.getElementById('toast-close');

    if (toast && toastMsg) {
        toastMsg.textContent = message;
        toast.classList.add('show');
        toast.setAttribute('aria-hidden', 'false');

        const hideToast = () => {
            toast.classList.remove('show');
            toast.setAttribute('aria-hidden', 'true');
        };

        if (toastClose) {
            toastClose.onclick = hideToast;
        }

        setTimeout(hideToast, 4000);
    }
}

/**
 * 🌌 Performance-Optimized 3D Particle Background using Three.js
 */
function initParticleBackground() {
    const container = document.getElementById('canvas-container');
    if (!container || typeof THREE === 'undefined') return;

    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    // Determine particle count based on screen size for optimal performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 120 : 350;

    // Scene Setup
    const scene = new THREE.Scene();

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera.position.z = 400;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobile });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create Particle Glow Texture programmatically
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(0, 243, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(0, 243, 255, 0.6)');
    gradient.addColorStop(0.6, 'rgba(157, 78, 221, 0.3)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);

    const texture = new THREE.CanvasTexture(canvas);

    // Particles Geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 800;
        positions[i + 1] = (Math.random() - 0.5) * 800;
        positions[i + 2] = (Math.random() - 0.5) * 800;
        scales[i / 3] = Math.random() * 4 + 2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
        size: 8,
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.05;
        mouseY = (event.clientY - windowHalfY) * 0.05;
    };

    if (!isMobile) {
        document.addEventListener('mousemove', onDocumentMouseMove);
    }

    // Resize Handler
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        particles.rotation.x += 0.0005;
        particles.rotation.y += 0.0008;

        particles.position.x = targetX;
        particles.position.y = -targetY;

        renderer.render(scene, camera);
    };

    animate();
}

/**
 * 🧊 Subtle 3D Card Tilt Effect on Hover
 */
function initTiltEffect() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) {
        return;
    }

    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach((card) => {
        const isAvatarCard = card.classList.contains('3d-avatar-card');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const maxTilt = isAvatarCard ? 12 : 6;
            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            if (isAvatarCard) {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            } else {
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/**
 * 🧭 Scroll Spy & Mobile Navigation Handler
 */
function initNavigationAndScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksMenu = document.getElementById('nav-links');
    const menuIcon = document.getElementById('menu-icon');

    // Scroll Spy via Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');

                navLinks.forEach((link) => {
                    const href = link.getAttribute('href').substring(1);
                    if (href === activeId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));

    // Mobile Menu Toggle
    if (mobileToggle && navLinksMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navLinksMenu.classList.toggle('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);

            if (menuIcon && typeof lucide !== 'undefined') {
                menuIcon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                lucide.createIcons();
            }
        });

        // Close menu on link click
        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('open');
                mobileToggle.setAttribute('aria-expanded', 'false');
                if (menuIcon && typeof lucide !== 'undefined') {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }
}

/**
 * 📬 Contact Form Validation & Handler
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    if (!form || !feedback) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('user_name');
        const emailInput = document.getElementById('user_email');
        const messageInput = document.getElementById('user_message');

        const name = nameInput ? nameInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const message = messageInput ? messageInput.value.trim() : '';

        // Simple Validation
        if (!name || !email || !message) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Please fill out all fields before sending.';
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Please enter a valid email address.';
            return;
        }

        // Check if a backend endpoint is configured
        if (!formEndpoint || formEndpoint === "") {
            // Frontend validation demo state
            feedback.className = 'form-feedback success';
            feedback.textContent = `Thank you, ${name}! Form validation succeeded. To send live emails, set formEndpoint in script.js.`;
            form.reset();
            return;
        }

        // Live submit if formEndpoint is configured
        try {
            feedback.className = 'form-feedback';
            feedback.textContent = 'Sending message...';

            const response = await fetch(formEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            if (response.ok) {
                feedback.className = 'form-feedback success';
                feedback.textContent = 'Your message has been sent successfully!';
                form.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (err) {
            feedback.className = 'form-feedback error';
            feedback.textContent = 'Failed to send message. Please try reaching out directly via email.';
        }
    });
}
