document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked (for single-page navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(item => {
                    item.style.animation = ''; // Reset animation to allow re-animation on next open
                });
            }
        });
    });
    document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });


    // Optional: Smooth scroll for internal links (if not using scroll-behavior: smooth in CSS)
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();

    //         document.querySelector(this.getAttribute('href')).scrollIntoView({
    //             behavior: 'smooth'
    //         });
    //     });
    // });

    // Optional: Add a "scroll-to-top" button if needed (not included in this HTML/CSS)
    // window.onscroll = function() {
    //     scrollFunction();
    // };

    // function scrollFunction() {
    //     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //         // show button
    //     } else {
    //         // hide button
    //     }
    // }

    // Optional: Implement a simple image lightbox (requires more HTML structure or a library)
    // For a basic example, you might add event listeners to gallery items
    // document.querySelectorAll('.gallery-item img').forEach(img => {
    //     img.addEventListener('click', () => {
    //         // Logic to open a modal/lightbox with the clicked image
    //         console.log('Image clicked:', img.src);
    //     });
    // });
});