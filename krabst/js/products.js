// ===== PRODUCTS PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            productItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter || 
                    (filter === 'premium' && item.classList.contains('featured'))) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add hover effects for product images
    productItems.forEach(item => {
        const image = item.querySelector('.product-image-container img');
        const overlay = item.querySelector('.product-overlay');
        
        if (image && overlay) {
            item.addEventListener('mouseenter', function() {
                image.style.transform = 'scale(1.05)';
                overlay.style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', function() {
                image.style.transform = 'scale(1)';
                overlay.style.opacity = '0';
            });
        }
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// Product modal functionality (placeholder for future implementation)
function openProductModal(productId) {
    // This function can be expanded to show detailed product information
    // For now, it will redirect to contact form with product information
    const productNames = {
        'kasetka-okragla': 'Kasetka Okrągła Premium',
        'kasetka-standard': 'Kasetka Standard',
        'pudelko-podluzne': 'Pudełko Podłużne',
        'kasetka-okragla-deluxe': 'Kasetka Okrągła Deluxe',
        'pudelko-krzyze': 'Pudełko z Krzyżami',
        'kasetka-kwadratowa-mala': 'Kasetka Kwadratowa Mała',
        'pudelko-czerwone': 'Pudełko Czerwone Kwadratowe',
        'kasetka-kwadratowo-okragla': 'Kasetka Kwadratowo-Okrągła',
        'pudelko-podluzne-czarne': 'Pudełko Podłużne Czarne'
    };

    const productName = productNames[productId] || 'Produkt';
    const subject = `Zapytanie o ${productName}`;
    const body = `Dzień dobry,\n\nInteresuję się produktem: ${productName}\n\nProszę o przesłanie szczegółowej oferty.\n\nPozdrawiam`;
    
    const mailtoLink = `mailto:kontakt@euroframe.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
}

// Add smooth animations for page load
window.addEventListener('load', function() {
    const productItems = document.querySelectorAll('.product-item');
    
    productItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.custom-content, .cta-section');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
}); 