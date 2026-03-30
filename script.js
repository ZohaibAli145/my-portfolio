// Check for system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Dark mode toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('mobile-theme-icon');
    const html = document.documentElement;
    
    // Check for saved theme preference, system preference, or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = detectSystemTheme();
    const currentTheme = savedTheme || systemTheme || 'light';
    
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                updateThemeIcon(newTheme);
            }
        });
    }
    
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            mobileThemeIcon.classList.remove('fa-sun');
            mobileThemeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            mobileThemeIcon.classList.remove('fa-moon');
            mobileThemeIcon.classList.add('fa-sun');
        }
    }
    
    function toggleTheme() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add a subtle animation effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
}

// Sample project data
const projects = [
    {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce website with shopping cart, payment integration, and admin dashboard. Built with modern web technologies for optimal performance and user experience.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600",
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
        githubLink: "https://github.com/yourusername/ecommerce-platform",
        liveLink: "https://your-ecommerce-app.com",
        featured: true
    },
    {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Helps teams organize and track their work efficiently.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=600",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS", "WebSockets"],
        githubLink: "https://github.com/yourusername/task-manager",
        liveLink: "https://task-manager-demo.com",
        featured: true
    },
    {
        title: "Weather Dashboard",
        description: "A beautiful weather application that provides real-time weather data, forecasts, and interactive maps. Features location-based weather updates and stunning visualizations.",
        image: "https://images.unsplash.com/photo-1592210454359-904324e74303?auto=format&fit=crop&w=600",
        technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
        githubLink: "https://github.com/yourusername/weather-dashboard",
        liveLink: "https://weather-app-demo.com",
        featured: false
    },
    {
        title: "Social Media Analytics",
        description: "A comprehensive analytics dashboard for social media management. Track engagement, analyze trends, and generate detailed reports for multiple social platforms.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600",
        technologies: ["React", "D3.js", "Express", "PostgreSQL"],
        githubLink: "https://github.com/yourusername/social-analytics",
        liveLink: "https://social-analytics-demo.com",
        featured: true
    },
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website with smooth animations, dark mode support, and optimized performance. Showcases projects and professional information elegantly.",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=600",
        technologies: ["HTML5", "Tailwind CSS", "JavaScript", "AOS"],
        githubLink: "https://github.com/yourusername/portfolio",
        liveLink: "https://your-portfolio.com",
        featured: false
    },
    {
        title: "Recipe Finder App",
        description: "A recipe discovery application with search functionality, meal planning, and nutritional information. Browse thousands of recipes and save your favorites.",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600",
        technologies: ["JavaScript", "Recipe API", "Local Storage", "Bootstrap"],
        githubLink: "https://github.com/yourusername/recipe-finder",
        liveLink: "https://recipe-app-demo.com",
        featured: false
    }
];

// Typing effect
const typingTexts = [
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver",
    "Creative Thinker"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentText = typingTexts[textIndex];
    const typingElement = document.getElementById('typing-text');
    
    if (!isDeleting) {
        typingElement.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at complete text
        } else {
            typingSpeed = 100;
        }
    } else {
        typingElement.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
            typingSpeed = 500; // Pause before next word
        }
    }
    
    setTimeout(typeText, typingSpeed);
}

// Render projects with enhanced professional design
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = `fade-in card-hover bg-white rounded-2xl shadow-xl overflow-hidden ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`;
        projectCard.style.animationDelay = `${index * 0.15}s`;
        
        projectCard.innerHTML = `
            <div class="relative h-56 overflow-hidden group">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                ${project.featured ? '<div class="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">Featured Project</div>' : ''}
                <div class="absolute bottom-4 left-4 right-4">
                    <h3 class="text-2xl font-bold text-white mb-2">${project.title}</h3>
                    <div class="flex gap-2">
                        ${project.technologies.slice(0, 3).map(tech => `
                            <span class="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs font-medium">
                                ${tech}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="p-8">
                <p class="text-gray-600 mb-6 leading-relaxed line-clamp-3">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${project.technologies.map(tech => `
                        <span class="project-tech-tag px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full text-sm font-semibold cursor-pointer border border-indigo-200">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
                <div class="flex gap-4">
                    <a href="${project.githubLink}" target="_blank" class="flex-1 group flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-semibold">
                        <i class="fab fa-github text-xl"></i>
                        <span>View Code</span>
                    </a>
                    <a href="${project.liveLink}" target="_blank" class="flex-1 group flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Live Demo</span>
                    </a>
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            document.getElementById('mobile-menu').classList.add('hidden');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate skill bars when skills section is visible
            if (entry.target.querySelector('.skill-bar')) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle
    initThemeToggle();
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // Initialize typing effect
    typeText();
    
    // Render projects
    renderProjects();
    
    // Initialize skill bars with 0 width
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
});

// Enhanced contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Show success message with better UX
    const button = this.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
    button.classList.add('bg-gradient-to-r', 'from-green-600', 'to-emerald-600');
    button.disabled = true;
    
    // Here you would normally send the data to a server
    setTimeout(() => {
        // Show success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-24 right-6 bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl z-50 flex items-center gap-4';
        notification.innerHTML = `
            <i class="fas fa-check-circle text-2xl"></i>
            <div>
                <p class="font-bold">Message Sent Successfully!</p>
                <p class="text-sm">Thank you ${name}, I'll get back to you soon.</p>
            </div>
        `;
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Reset form
        this.reset();
        button.innerHTML = originalText;
        button.classList.remove('from-green-600', 'to-emerald-600');
        button.disabled = false;
    }, 1000);
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.float-animation, .blob');
    
    parallaxElements.forEach((element, index) => {
        const speed = index % 2 === 0 ? 0.5 : 0.3;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
    
    // Add subtle header shadow on scroll
    const nav = document.querySelector('nav');
    if (scrolled > 50) {
        nav.classList.add('shadow-2xl');
    } else {
        nav.classList.remove('shadow-2xl');
    }
});

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-purple-600');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('text-purple-600');
        }
    });
});

// Add loading animation and page transitions
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Smooth page load animation
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add smooth transitions for all interactive elements
document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
});

// Add ripple effect to buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Enhanced 3D card hover effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.card-hover');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const angleX = (mouseY - cardCenterY) / 30;
        const angleY = (cardCenterX - mouseX) / 30;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - cardCenterX, 2) + Math.pow(mouseY - cardCenterY, 2)
        );
        
        if (distance < 300) {
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px) scale(1.02)`;
        } else {
            card.style.transform = '';
        }
    });
});

document.addEventListener('mouseleave', () => {
    const cards = document.querySelectorAll('.card-hover');
    cards.forEach(card => {
        card.style.transform = '';
    });
});
