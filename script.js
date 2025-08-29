// navbar
   window.addEventListener('scroll', function() {
            const navbar = document.getElementById('mynav');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let slideInterval;

function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });

    // Add prev class to current slide
    if (slides[currentSlide]) {
        slides[currentSlide].classList.add('prev');
    }

    // Update current slide index
    currentSlide = index;

    // Show new active slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Reset and restart the fill animation for active indicator
    const activeFill = indicators[currentSlide].querySelector('.indicator-fill');
    activeFill.style.animation = 'none';
    activeFill.offsetHeight; // Trigger reflow
    activeFill.style.animation = 'fillIndicator 2s linear';
}

function nextSlide() {
    const nextIndex = (currentSlide + 1) % totalSlides;
    showSlide(nextIndex);
}

function startSlideshow() {
    slideInterval = setInterval(nextSlide, 2000);
}

function stopSlideshow() {
    clearInterval(slideInterval);
}

// Initialize slideshow
showSlide(0);
startSlideshow();

// Add click events to indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        stopSlideshow();
        showSlide(index);
        startSlideshow();
    });
});
// Pause slideshow on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopSlideshow);
sliderContainer.addEventListener('mouseleave', startSlideshow);

function showContent(number) {
    // Remove active class from all menu items
    var menuItems = document.querySelectorAll('.menu-item');
    for (var i = 0; i < menuItems.length; i++) {
        menuItems[i].classList.remove('active');
    }

    // Add active class to clicked menu item
    event.target.classList.add('active');

    // Hide all content sections
    var contents = document.querySelectorAll('.description-section');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }

    // Hide all images
    var images = document.querySelectorAll('.food-image');
    for (var i = 0; i < images.length; i++) {
        images[i].classList.remove('active');
    }

    // Show selected content and image
    document.getElementById('content' + number).classList.add('active');
    document.getElementById('image' + number).classList.add('active');
}

// Add hover effects
var menuItems = document.querySelectorAll('.menu-item');
for (var i = 0; i < menuItems.length; i++) {
    menuItems[i].addEventListener('mouseenter', function () {
        if (!this.classList.contains('active')) {
            this.style.background = 'rgba(212, 175, 55, 0.1)';
            this.style.color = '#d4af37';
        }
    });

    menuItems[i].addEventListener('mouseleave', function () {
        if (!this.classList.contains('active')) {
            this.style.background = '';
            this.style.color = '#ccc';
        }
    });
}

function showMoreItems() {
    // Get all hidden menu items
    const hiddenItems = document.querySelectorAll('.menu-item.hidden');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');

    // Show hidden items with animation
    hiddenItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove('hidden');
            item.classList.add('show');
        }, index * 100); // Stagger the animation
    });

    // Hide the view more button and show the show less button
    setTimeout(() => {
        viewMoreBtn.classList.add('hidden');
        showLessBtn.classList.remove('hidden');
    }, 500);
}

function showLessItems() {
    // Get all menu items after the 8th one
    const allItems = document.querySelectorAll('.menu-item');
    const itemsToHide = Array.from(allItems).slice(8); // Items 9-20
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const showLessBtn = document.getElementById('showLessBtn');

    // Hide items with reverse animation
    itemsToHide.reverse().forEach((item, index) => {
        setTimeout(() => {
            item.classList.remove('show');
            item.classList.add('hidden');
        }, index * 50); // Faster reverse animation
    });

    // Show the view more button and hide the show less button
    setTimeout(() => {
        showLessBtn.classList.add('hidden');
        viewMoreBtn.classList.remove('hidden');
    }, itemsToHide.length * 50 + 200);

    // Scroll to top of menu smoothly
    setTimeout(() => {
        document.querySelector('.menu-grid').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}