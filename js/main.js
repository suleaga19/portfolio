$(document).ready(function() {
    // Add subtle reveal animations using Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animation classes to elements
    $('.hero-text-container').addClass('fade-in-left');
    $('.hero-image-container').addClass('fade-in-right');
    $('.services-subtitle').addClass('fade-in-up');
    $('.service-card').addClass('fade-in-up');
    
    // Add staggered delay to service cards
    $('.service-card').each(function(index) {
        $(this).css('transition-delay', (index * 0.1) + 's');
    });

    // Trigger initial animations
    setTimeout(() => {
        $('.hero-text-container, .hero-image-container').addClass('visible');
    }, 100);

    // Observe elements for scroll reveal
    const elementsToObserve = [
        document.querySelector('.services-subtitle'),
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.project-card-wrapper')
    ].filter(Boolean);

    elementsToObserve.forEach(el => observer.observe(el));
    
    // Smooth scrolling for navigation links
    $('a.nav-link-custom[href^="#"], a.btn[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // Update active nav link on scroll
    $(window).on('scroll', function() {
        var scrollDistance = $(window).scrollTop();
        
        $('section').each(function(i) {
            if ($(this).position().top - 100 <= scrollDistance) {
                $('.navbar-nav a.active').removeClass('active');
                $('.navbar-nav a').eq(i).addClass('active');
            }
        });
    }).scroll();
});
