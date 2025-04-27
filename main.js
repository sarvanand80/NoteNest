document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('nav-link')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Intersection Observer for Counter Animation
    const statsSection = document.querySelector('.hero-stats');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(statsSection);

    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    let currentIndex = 0;
    const cardCount = testimonialCards.length;
    
    // Create dots
    for (let i = 0; i < cardCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function updateSlider() {
        testimonialTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cardCount;
        updateSlider();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cardCount) % cardCount;
        updateSlider();
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000);
    
    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    nextBtn.addEventListener('click', resetInterval);
    prevBtn.addEventListener('click', resetInterval);
    dots.forEach(dot => dot.addEventListener('click', resetInterval));

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
            
            // Close other open answers
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.classList.remove('show');
                }
            });
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log({ name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.module-card, .feature-card, .faq-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state
    document.querySelectorAll('.module-card, .feature-card, .faq-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
// Hero Preview Image Switcher
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.preview-thumbnails .thumbnail');
    const previewImages = document.querySelectorAll('.preview-box img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all
            thumbnails.forEach(t => t.classList.remove('active'));
            previewImages.forEach(img => img.classList.remove('active'));
            
            // Add active class to clicked
            this.classList.add('active');
            const targetIndex = this.getAttribute('data-target');
            previewImages[targetIndex].classList.add('active');
        });
    });
    
    // Auto-rotate previews
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % thumbnails.length;
        thumbnails[currentIndex].click();
    }, 4000);
});
// Hero Preview Slider
const previewBox = document.querySelector('.preview-box');
const thumbnails = document.querySelectorAll('.thumbnail');
let currentIndex = 0;

thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        const direction = index > currentIndex ? 'slide-right' : 'slide-left';
        currentIndex = index;
        
        // Remove all active classes
        document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        
        // Add animation class
        previewBox.classList.add(direction);
        
        // Move the preview box
        previewBox.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Remove animation class after animation completes
        setTimeout(() => {
            previewBox.classList.remove(direction);
        }, 800);
    });
});

// Auto slide (optional)
let slideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % thumbnails.length;
    const direction = 'slide-right'; // or determine direction if you want
    
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnails[currentIndex].classList.add('active');
    
    previewBox.classList.add(direction);
    previewBox.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    setTimeout(() => {
        previewBox.classList.remove(direction);
    }, 800);
}, 5000); // Change slide every 5 seconds
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const subject = this.dataset.subject;
            
            // Remove active class from all tabs and content
            document.querySelectorAll('.tab-link').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.product-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.querySelector(`.product-content[data-subject="${subject}"]`).classList.add('active');
        });
    });
    
    // Initialize the first tab as active
    document.querySelector('.tab-link.active').click();
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all sliders
    initializeAllSliders();
    
    // Tab switching functionality
    setupTabs();
});

function initializeAllSliders() {
    const subjects = ['physics', 'chemistry', 'maths'];
    
    subjects.forEach(subject => {
        const container = document.querySelector(`.product-content[data-subject="${subject}"]`);
        if (!container) return;
        
        const previewBox = container.querySelector('.preview-box');
        const thumbnails = container.querySelectorAll('.thumbnail');
        
        // Set initial position
        previewBox.style.width = `${thumbnails.length * 100}%`;
        
        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Calculate translateX value
                const translateX = -(index * (100 / thumbnails.length));
                previewBox.style.transform = `translateX(${translateX}%)`;
            });
        });
    });
}

function setupTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            const subject = this.dataset.subject;
            
            // Update active tab
            tabLinks.forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            document.querySelectorAll('.product-content').forEach(content => {
                content.classList.remove('active');
            });
            document.querySelector(`.product-content[data-subject="${subject}"]`).classList.add('active');
            
            // Reinitialize slider for the active tab
            initializeAllSliders();
        });
    });
    
    // Initialize first tab
    document.querySelector('.tab-link.active').click();
}// Add this to your main.js file or within <script> tags
function openSubject(subject) {
    // Hide all product contents
    const contents = document.querySelectorAll('.product-content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    // Show the selected content
    document.getElementById(subject).style.display = 'block';

    // Update active tab
    const tabs = document.querySelectorAll('.tab-link');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}// Add to your existing JavaScript
function scrollPreview(direction, subject) {
    const previewBox = document.querySelector(`#${subject} .preview-box`);
    const images = previewBox.querySelectorAll('img');
    const thumbnails = document.querySelectorAll(`#${subject} .thumbnail`);
    let currentIndex = 0;
    
    // Find current active image
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    
    // Handle boundaries
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    // Update active image
    images[currentIndex].classList.remove('active');
    images[newIndex].classList.add('active');
    
    // Update active thumbnail
    thumbnails[currentIndex].classList.remove('active');
    thumbnails[newIndex].classList.add('active');
}// Image preview functionality
function scrollPreview(direction) {
    const previewBox = document.querySelector('.preview-box');
    const images = previewBox.querySelectorAll('img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    let currentIndex = 0;
    
    // Find current active image
    images.forEach((img, index) => {
        if (img.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    
    // Handle boundaries
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    // Update active image
    images[currentIndex].classList.remove('active');
    images[newIndex].classList.add('active');
    
    // Update active thumbnail
    thumbnails[currentIndex].classList.remove('active');
    thumbnails[newIndex].classList.add('active');
}

function changePreview(index) {
    const previewBox = document.querySelector('.preview-box');
    const images = previewBox.querySelectorAll('img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Remove active class from all
    images.forEach(img => img.classList.remove('active'));
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    
    // Add active class to selected
    images[index].classList.add('active');
    thumbnails[index].classList.add('active');
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        scrollPreview(-1);
    } else if (e.key === 'ArrowRight') {
        scrollPreview(1);
    }
});

const modal = document.getElementById('zoom-modal');
const modalImg = document.getElementById('modal-img');
const closeModal = document.getElementById('close-modal');
const images = document.querySelectorAll('.gallery img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentImgIndex = 0;

// Open modal and show clicked image
images.forEach((img, index) => {
  img.addEventListener('click', function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    currentImgIndex = index;
  });
});

// Close modal
closeModal.onclick = function() {
  modal.style.display = "none";
};

// Close if click outside image
modal.onclick = function(e) {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

// Show Previous Image
prevBtn.onclick = function(e) {
  e.stopPropagation();
  currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentImgIndex].src;
};

// Show Next Image
nextBtn.onclick = function(e) {
  e.stopPropagation();
  currentImgIndex = (currentImgIndex + 1) % images.length;
  modalImg.src = images[currentImgIndex].src;
};

const end = new Date();
end.setDate(end.getDate() + 2); // 2 days countdown

function updateTimer() {
  const now = new Date();
  const diff = end - now;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  document.getElementById('timer').innerText = `${hours}h ${mins}m`;
}