// lightbox.js for Template 5: The Magazine-Style Editorial

document.addEventListener('DOMContentLoaded', () => {
    // Select all potential gallery items with the correct class
    const galleryItems = document.querySelectorAll('.magazine-grid .grid-item');
    const body = document.body;

    // --- Lightbox Element Creation (Standard, can be reused) ---
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    body.appendChild(lightbox);

    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    lightbox.appendChild(lightboxContent);

    const lightboxImg = document.createElement('img');
    lightboxContent.appendChild(lightboxImg);

    const lightboxCaption = document.createElement('div');
    lightboxCaption.classList.add('lightbox-caption');
    lightboxContent.appendChild(lightboxCaption);

    const lightboxClose = document.createElement('button');
    lightboxClose.classList.add('lightbox-close');
    lightboxClose.innerHTML = '&times;';
    lightbox.appendChild(lightboxClose);

    const lightboxNav = document.createElement('div');
    lightboxNav.classList.add('lightbox-nav');
    lightbox.appendChild(lightboxNav);

    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    lightboxNav.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    lightboxNav.appendChild(nextButton);

    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('lightbox-loading');
    loadingIndicator.textContent = 'Loading...';
    lightboxContent.appendChild(loadingIndicator);
    // --- End Lightbox Element Creation ---

    let currentImageIndex;
    let allImages = [];

    // Populate allImages array and add click listeners
    galleryItems.forEach((item, index) => {
        const src = item.getAttribute('data-src') || item.querySelector('img').src; // Use data-src if available, else img src
        const alt = item.getAttribute('data-alt') || item.querySelector('img').alt || '';
        allImages.push({ src, alt });

        item.addEventListener('click', () => {
            currentImageIndex = index;
            openLightbox(src, alt);
        });
    });

    function openLightbox(src, alt) {
        lightbox.classList.add('active');
        body.classList.add('no-scroll');

        lightboxImg.src = '';
        lightboxCaption.textContent = '';
        loadingIndicator.style.display = 'block';

        const imgToLoad = new Image();
        imgToLoad.src = src;
        imgToLoad.onload = () => {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            loadingIndicator.style.display = 'none';
            lightboxCaption.textContent = alt;
        };
        imgToLoad.onerror = () => {
            loadingIndicator.style.display = 'none';
            lightboxCaption.textContent = 'Image failed to load.';
            console.error('Failed to load lightbox image:', src);
        };
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.classList.remove('no-scroll');
    }

    function navigateLightbox(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = allImages.length - 1;
        } else if (currentImageIndex >= allImages.length) {
            currentImageIndex = 0;
        }
        const newImage = allImages[currentImageIndex];
        openLightbox(newImage.src, newImage.alt);
    }

    // Event Listeners for Lightbox Controls
    lightboxClose.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(-1);
    });
    nextButton.addEventListener('click', (e) => {
        e.stopPropagation();
        navigateLightbox(1);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                navigateLightbox(-1);
            } else if (e.key === 'ArrowRight') {
                navigateLightbox(1);
            }
        }
    });

    // Mobile Navigation Toggle (Integrated into lightbox.js for simplicity)
    const burger = document.querySelector('.burger-editorial'); // Correct selector for this template
    const navLinks = document.querySelector('.header-editorial .nav-links'); // Correct selector
    const navItems = document.querySelectorAll('.header-editorial .nav-links li'); // Correct selector

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
            body.classList.toggle('no-scroll');

            navItems.forEach((link, index) => {
                if (navLinks.classList.contains('nav-active')) {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                } else {
                    link.style.animation = '';
                }
            });
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('nav-active')) {
                    navLinks.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    body.classList.remove('no-scroll');
                    navItems.forEach(item => {
                        item.style.animation = '';
                    });
                }
            });
        });
    }

});