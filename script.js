// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navList.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-list a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navList.classList.remove('active');
            });
        });
    }
    
    // Initialize Swiper and load products
    initializeGearSection();
    
    // Add event listeners for customization buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('customize-button')) {
            handleCustomization(e.target);
        }
    });
});

// Smooth scrolling for anchor links
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

// Handle customization form submission with Shopify integration
async function handleCustomization(button) {
    const productId = button.dataset.productId;
    const productName = button.dataset.productName;
    const variantId = button.dataset.variantId;
    
    const nameInput = document.getElementById(`name-${productId}`);
    const weightSelect = document.getElementById(`weight-${productId}`);
    
    const name = nameInput.value.trim();
    const weightClass = weightSelect.value;
    
    // Validate inputs
    if (!name) {
        showMessage('Please enter your name', 'error');
        return;
    }
    
    if (!weightClass) {
        showMessage('Please select your weight class', 'error');
        return;
    }
    
    // Show loading state
    button.disabled = true;
    button.textContent = 'Creating checkout...';
    
    try {
        // Initialize Shopify API
        const shopify = new ShopifyAPI();
        
        // Create checkout with customizations for Ninjaprint
        const checkout = await shopify.createCheckout(variantId, {
            name: name,
            weightClass: weightClass
        });
        
        if (checkout && checkout.webUrl) {
            showMessage('Redirecting to checkout...', 'success');
            // Redirect to Shopify checkout
            window.open(checkout.webUrl, '_blank');
            
            // Clear form
            nameInput.value = '';
            weightSelect.value = '';
        } else {
            showMessage('Failed to create checkout. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Checkout creation error:', error);
        showMessage('Error creating checkout. Please try again.', 'error');
    } finally {
        // Reset button
        button.disabled = false;
        button.textContent = 'Apply Customization →';
    }
}

// Show message to user
function showMessage(message, type) {
    // Create message element if it doesn't exist
    let messageEl = document.getElementById('custom-message');
    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'custom-message';
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: bold;
            z-index: 10000;
            max-width: 300px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(messageEl);
    }
    
    // Set message and style
    messageEl.textContent = message;
    messageEl.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    messageEl.style.opacity = '1';
    
    // Hide after 3 seconds
    setTimeout(() => {
        messageEl.style.opacity = '0';
    }, 3000);
}

// Gear Section with Shopify Integration
async function initializeGearSection() {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const loadingMessage = document.querySelector('.loading-message');
    
    try {
        // Initialize Shopify API
        const shopify = new ShopifyAPI();
        
        // Fetch products from Shopify
        const products = await shopify.fetchProducts();
        
        if (products && products.length > 0) {
            // Format products for our display
            const formattedProducts = products.map(product => shopify.formatProduct(product));
            renderProducts(formattedProducts, swiperWrapper);
            initializeSwiper();
            loadingMessage.style.display = 'none';
        } else {
            showNoProductsMessage();
        }
    } catch (error) {
        console.error('Error loading products:', error);
        showNoProductsMessage();
    }
}

async function fetchShopifyProducts() {
    try {
        const shopify = new ShopifyAPI();
        const products = await shopify.fetchProducts();
        
        if (products) {
            return products.map(product => shopify.formatProduct(product));
        }
        return null;
    } catch (error) {
        console.error('Error fetching Shopify products:', error);
        return null;
    }
}

function renderProducts(products, swiperWrapper) {
    swiperWrapper.innerHTML = '';
    
    products.forEach(product => {
        const slide = createProductSlide(product);
        swiperWrapper.appendChild(slide);
    });
}

function createProductSlide(product) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    
    // Get the first variant's price and the main image
    const variant = product.variants && product.variants[0];
    const price = product.price || (variant ? `$${parseFloat(variant.price).toFixed(2)}` : 'Price TBD');
    const imageUrl = product.thumbnail_url || 'https://via.placeholder.com/300x200?text=Product+Image';
    const productName = product.name || 'Little Horns Gear';
    const variantId = variant ? variant.id : null;
    
    slide.innerHTML = `
        <div class="product-card">
            <img src="${imageUrl}" alt="${productName}" class="product-image" 
                 onerror="this.src='https://via.placeholder.com/300x200?text=Image+Not+Available'">
            <div class="product-info">
                <h3 class="product-name">${productName}</h3>
                <div class="product-price">${price}</div>
                
                <!-- Customization Section -->
                <div class="customization-section">
                    <h4 class="customization-title">Customize Back of Shirt</h4>
                    <div class="customization-form">
                        <div class="form-group">
                            <label for="name-${product.id}">Name:</label>
                            <input type="text" id="name-${product.id}" class="custom-input" placeholder="Enter your name" maxlength="20">
                        </div>
                        <div class="form-group">
                            <label for="weight-${product.id}">Weight Class:</label>
                            <select id="weight-${product.id}" class="custom-select">
                                <option value="">Select weight class</option>
                                <option value="106">106 lbs</option>
                                <option value="113">113 lbs</option>
                                <option value="120">120 lbs</option>
                                <option value="126">126 lbs</option>
                                <option value="132">132 lbs</option>
                                <option value="138">138 lbs</option>
                                <option value="144">144 lbs</option>
                                <option value="150">150 lbs</option>
                                <option value="157">157 lbs</option>
                                <option value="165">165 lbs</option>
                                <option value="175">175 lbs</option>
                                <option value="190">190 lbs</option>
                                <option value="215">215 lbs</option>
                                <option value="285">285 lbs</option>
                            </select>
                        </div>
                        <button class="customize-button" 
                                data-product-id="${product.id}" 
                                data-product-name="${productName}"
                                data-variant-id="${variantId}">
                            Apply Customization →
                        </button>
                    </div>
                </div>
                
                <div class="product-actions">
                    <a href="#" class="buy-button shopify-buy-btn" data-variant-id="${variantId}">
                        Buy on Shopify →
                    </a>
                </div>
            </div>
        </div>
    `;
    
    // Add click handler for direct buy button
    const buyBtn = slide.querySelector('.shopify-buy-btn');
    if (buyBtn && variantId) {
        buyBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            buyBtn.textContent = 'Creating checkout...';
            buyBtn.disabled = true;
            
            try {
                const shopify = new ShopifyAPI();
                const checkout = await shopify.createCheckout(variantId, {});
                
                if (checkout && checkout.webUrl) {
                    window.open(checkout.webUrl, '_blank');
                } else {
                    showMessage('Failed to create checkout', 'error');
                }
            } catch (error) {
                console.error('Checkout error:', error);
                showMessage('Error creating checkout', 'error');
            } finally {
                buyBtn.textContent = 'Buy on Shopify →';
                buyBtn.disabled = false;
            }
        });
    }
    
    return slide;
}

function initializeSwiper() {
    new Swiper('.gear-swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                centeredSlides: false,
            },
            768: {
                slidesPerView: 2,
                centeredSlides: false,
            },
            1024: {
                slidesPerView: 3,
                centeredSlides: false,
            }
        }
    });
}

function showNoProductsMessage() {
    const loadingMessage = document.querySelector('.loading-message');
    loadingMessage.innerHTML = 'Products coming soon! Check back later for fundraiser gear.<br><small>Make sure your Shopify store is configured with the correct credentials.</small>';
    loadingMessage.style.display = 'block';
    
    // Still initialize swiper with sample products for demo
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const sampleProducts = getSampleProducts();
    renderProducts(sampleProducts, swiperWrapper);
    initializeSwiper();
}

// Sample products for development/demo purposes
function getSampleProducts() {
    return [
        {
            id: 'sample1',
            name: 'Little Horns Hoodie',
            thumbnail_url: 'https://via.placeholder.com/300x200/4B0082/FFFFFF?text=Hoodie',
            price: '$29.99',
            variants: [
                {
                    id: 'gid://shopify/ProductVariant/1234567890',
                    price: '29.99',
                    available: true
                }
            ]
        },
        {
            id: 'sample2',
            name: 'Little Horns T-Shirt',
            thumbnail_url: 'https://via.placeholder.com/300x200/FFD700/000000?text=T-Shirt',
            price: '$19.99',
            variants: [
                {
                    id: 'gid://shopify/ProductVariant/1234567891',
                    price: '19.99',
                    available: true
                }
            ]
        },
        {
            id: 'sample3',
            name: 'Little Horns Hat',
            thumbnail_url: 'https://via.placeholder.com/300x200/000000/FFFFFF?text=Hat',
            price: '$15.99',
            variants: [
                {
                    id: 'gid://shopify/ProductVariant/1234567892',
                    price: '15.99',
                    available: true
                }
            ]
        }
    ];
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});
