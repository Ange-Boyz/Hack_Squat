// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });
});


    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Hamburger menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // FAQ accordion
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const item = q.parentElement;
            item.classList.toggle('open');
            const icon = q.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
        });
    });

    // Progress circle animation
    document.querySelectorAll('.progress-circle .circle-fill').forEach(circle => {
        const percent = parseInt(circle.getAttribute('data-percentage'), 10) || 0;
        circle.style.background = `conic-gradient(#4f8cff ${percent * 3.6}deg, #e0e7ef 0deg)`;
    });

    // Chart.js example for analytics (optional, if Chart.js is included)
    if (window.Chart) {
        const skillChart = document.getElementById('skillChart');
        if (skillChart) {
            new Chart(skillChart, {
                type: 'doughnut',
                data: {
                    labels: ['Frontend', 'Backend', 'Soft Skills'],
                    datasets: [{
                        data: [60, 25, 15],
                        backgroundColor: ['#4f8cff', '#34d399', '#fbbf24'],
                    }]
                },
                options: { cutout: '70%', plugins: { legend: { display: false } } }
            });
        }
        const opportunityChart = document.getElementById('opportunityChart');
        if (opportunityChart) {
            new Chart(opportunityChart, {
                type: 'bar',
                data: {
                    labels: ['Buea', 'Douala', 'Yaounde'],
                    datasets: [{
                        data: [120, 80, 50],
                        backgroundColor: ['#4f8cff', '#34d399', '#fbbf24'],
                    }]
                },
                options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
            });
        }
    }
