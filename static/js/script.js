// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // SAP Style News Slider Functionality
    const newsItems = document.querySelectorAll('.news-item');
    const prevBtn = document.getElementById('newsPrev');
    const nextBtn = document.getElementById('newsNext');
    let currentIndex = 0;
    let newsInterval;

    // Initialize news slider if it exists on the page
    if (newsItems.length > 0) {
        // Show first news item
        showNewsItem(0);
        
        // Start auto rotation
        startNewsRotation();
        
        // Add button event listeners
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                stopNewsRotation();
                showPreviousNews();
                startNewsRotation();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                stopNewsRotation();
                showNextNews();
                startNewsRotation();
            });
        }
        
        // Pause rotation on hover
        const newsSlider = document.querySelector('.news-slider');
        if (newsSlider) {
            newsSlider.addEventListener('mouseenter', stopNewsRotation);
            newsSlider.addEventListener('mouseleave', startNewsRotation);
        }
    }
    
    function showNewsItem(index) {
        // Hide all news items
        newsItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Show selected news item
        newsItems[index].classList.add('active');
        currentIndex = index;
    }
    
    function showNextNews() {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= newsItems.length) {
            nextIndex = 0;
        }
        showNewsItem(nextIndex);
    }
    
    function showPreviousNews() {
        let prevIndex = currentIndex - 1;
        if (prevIndex < 0) {
            prevIndex = newsItems.length - 1;
        }
        showNewsItem(prevIndex);
    }
    
    function startNewsRotation() {
        stopNewsRotation(); // Clear any existing interval
        newsInterval = setInterval(showNextNews, 5000); // Rotate every 5 seconds
    }
    
    function stopNewsRotation() {
        clearInterval(newsInterval);
    }

    // Add a small delay for categories to get different colors based on content
    setTimeout(function() {
        document.querySelectorAll('.ai-news-category').forEach(category => {
            const text = category.textContent.trim().toLowerCase();
            if (text.includes('研究')) {
                category.classList.add('research');
            } else if (text.includes('技術')) {
                category.classList.add('innovation');
            } else if (text.includes('市場')) {
                category.classList.add('market');
            } else if (text.includes('規制')) {
                category.classList.add('regulation');
            }
        });
    }, 100);
    
    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add active class to nav links based on current page
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.wp-nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Toggle mobile menu
    const mobileMenuToggle = document.querySelector('.wp-mobile-menu-toggle');
    const navLinksContainer = document.querySelector('.wp-nav-links');
    
    if (mobileMenuToggle && navLinksContainer) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('show');
            
            // Toggle menu icon
            const menuIcon = this.querySelector('i');
            if (menuIcon) {
                if (menuIcon.classList.contains('fa-bars')) {
                    menuIcon.classList.remove('fa-bars');
                    menuIcon.classList.add('fa-times');
                } else {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navLinksContainer.contains(event.target) && !mobileMenuToggle.contains(event.target)) {
                navLinksContainer.classList.remove('show');
                const menuIcon = mobileMenuToggle.querySelector('i');
                if (menuIcon && menuIcon.classList.contains('fa-times')) {
                    menuIcon.classList.remove('fa-times');
                    menuIcon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // Example of simple animation for feature cards on homepage
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        // Add a small delay for each card to create a staggered animation
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });
    }
    
    // Animate founder cards on scroll
    const founderCards = document.querySelectorAll('.founder-card');
    const teamMemberCards = document.querySelectorAll('.team-member-card');
    const allCards = [...founderCards, ...teamMemberCards];
    
    if (allCards.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Add animation class when scrolled into view
        function animateOnScroll() {
            allCards.forEach(card => {
                if (isInViewport(card)) {
                    card.classList.add('wp-animate-in');
                }
            });
        }
        
        // Run on scroll and initial page load
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll();
    }
}); 