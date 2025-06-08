// Initialize products from localStorage or default data
let products = [];

// Initialize default products if not exists in localStorage
function initializeProducts() {
    if (!localStorage.getItem('products')) {
        const defaultProducts = [
            // Men's Clothing
            {
                id: 1,
                name: "Classic Cotton T-Shirt",
                category: "mens",
                subcategory: "topwear",
                price: 799,
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
                rating: 4.2,
                description: "Premium quality cotton t-shirt for everyday comfort.",
                sizes: ["S", "M", "L", "XL", "XXL"],
                colors: ["White", "Black", "Navy", "Grey"]
            },
            {
                id: 2,
                name: "Denim Jeans",
                category: "mens",
                subcategory: "bottomwear",
                price: 1999,
                image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
                rating: 4.5,
                description: "Stylish blue denim jeans with perfect fit.",
                sizes: ["28", "30", "32", "34", "36"],
                colors: ["Blue", "Black", "Light Blue"]
            },
            {
                id: 3,
                name: "Formal Shirt",
                category: "mens",
                subcategory: "topwear",
                price: 1299,
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop",
                rating: 4.3,
                description: "Professional formal shirt for office wear.",
                sizes: ["S", "M", "L", "XL"],
                colors: ["White", "Blue", "Pink", "Grey"]
            },
            {
                id: 4,
                name: "Chinos",
                category: "mens",
                subcategory: "bottomwear",
                price: 1599,
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
                rating: 4.1,
                description: "Comfortable chinos for casual and semi-formal occasions.",
                sizes: ["28", "30", "32", "34", "36"],
                colors: ["Khaki", "Navy", "Black", "Olive"]
            },

            // Women's Clothing
            {
                id: 5,
                name: "Floral Dress",
                category: "womens",
                subcategory: "topwear",
                price: 2199,
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop",
                rating: 4.6,
                description: "Beautiful floral dress perfect for summer occasions.",
                sizes: ["XS", "S", "M", "L", "XL"],
                colors: ["Pink", "Blue", "Yellow", "White"]
            },
            {
                id: 6,
                name: "High-Waist Jeans",
                category: "womens",
                subcategory: "bottomwear",
                price: 1899,
                image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=500&fit=crop",
                rating: 4.4,
                description: "Trendy high-waist jeans with a flattering fit.",
                sizes: ["26", "28", "30", "32", "34"],
                colors: ["Blue", "Black", "Light Blue"]
            },
            {
                id: 7,
                name: "Silk Blouse",
                category: "womens",
                subcategory: "topwear",
                price: 1699,
                image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400&h=500&fit=crop",
                rating: 4.5,
                description: "Elegant silk blouse for professional and casual wear.",
                sizes: ["XS", "S", "M", "L", "XL"],
                colors: ["White", "Black", "Cream", "Pink"]
            },
            {
                id: 8,
                name: "Palazzo Pants",
                category: "womens",
                subcategory: "bottomwear",
                price: 1299,
                image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
                rating: 4.2,
                description: "Comfortable palazzo pants for relaxed styling.",
                sizes: ["XS", "S", "M", "L", "XL"],
                colors: ["Black", "Navy", "Maroon", "Grey"]
            },

            // Kids Clothing
            {
                id: 9,
                name: "Kids Cartoon T-Shirt",
                category: "kids",
                subcategory: "topwear",
                price: 599,
                image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop",
                rating: 4.3,
                description: "Fun cartoon t-shirt for kids with vibrant colors.",
                sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
                colors: ["Red", "Blue", "Yellow", "Green"]
            },
            {
                id: 10,
                name: "Kids Denim Shorts",
                category: "kids",
                subcategory: "bottomwear",
                price: 799,
                image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5ce?w=400&h=500&fit=crop",
                rating: 4.1,
                description: "Comfortable denim shorts perfect for playtime.",
                sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
                colors: ["Blue", "Light Blue", "Black"]
            },
            {
                id: 11,
                name: "Kids Summer Dress",
                category: "kids",
                subcategory: "topwear",
                price: 999,
                image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf8?w=400&h=500&fit=crop",
                rating: 4.4,
                description: "Adorable summer dress for little girls.",
                sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
                colors: ["Pink", "Purple", "Yellow", "White"]
            },
            {
                id: 12,
                name: "Kids Track Pants",
                category: "kids",
                subcategory: "bottomwear",
                price: 699,
                image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5ce?w=400&h=500&fit=crop",
                rating: 4.0,
                description: "Comfortable track pants for active kids.",
                sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-11Y"],
                colors: ["Black", "Navy", "Grey", "Red"]
            }
        ];

        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }

    products = JSON.parse(localStorage.getItem('products'));
}

// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentProducts = [...products];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let currentCategory = 'all';
let currentSubcategory = null;

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    displayProducts(currentProducts);
    updateCartCount();
    updateUserInterface();
    updateBreadcrumb();
});

// User management
function showAuthModal() {
    document.getElementById('authModal').style.display = 'block';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab-content');
    const tabBtns = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => tab.style.display = 'none');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabName + 'Tab').style.display = 'block';
    event.target.classList.add('active');
}

function register(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const phone = form.querySelector('input[type="tel"]').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(user => user.email === email)) {
        alert('User already exists with this email!');
        return;
    }

    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        phone,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! You can now login.');
    showTab('login');
}

function login(event) {
    event.preventDefault();
    const form = event.target;

    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateUserInterface();
        closeAuthModal();
        alert('Login successful!');
    } else {
        alert('Invalid email or password!');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateUserInterface();
    alert('Logged out successfully!');
}

function goToAdmin() {
    window.location.href = 'admin.html';
}

function updateUserInterface() {
    const loginBtn = document.querySelector('.login-btn');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    const adminBtn = document.getElementById('adminBtn');
    const ordersBtn = document.getElementById('ordersBtn');

    if (currentUser) {
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        userName.textContent = currentUser.name;
        ordersBtn.style.display = 'block';
        
        // Only show admin button for admin@shopnest.com
        if (currentUser.email === 'admin@shopnest.com') {
            adminBtn.style.display = 'block';
        } else {
            adminBtn.style.display = 'none';
        }
    } else {
        loginBtn.style.display = 'block';
        userInfo.style.display = 'none';
        adminBtn.style.display = 'none';
        if (ordersBtn) ordersBtn.style.display = 'none';
    }
}

// Navigation and categorization
function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    let breadcrumbHTML = '<a href="#" onclick="showCategory(\'all\')">Home</a>';

    if (currentCategory !== 'all') {
        breadcrumbHTML += ` > <a href="#" onclick="showCategory('${currentCategory}')">${capitalize(currentCategory)}</a>`;

        if (currentSubcategory) {
            breadcrumbHTML += ` > <span>${capitalize(currentSubcategory)}</span>`;
        }
    }

    breadcrumb.innerHTML = breadcrumbHTML;
}

function showCategory(category) {
    const sectionTitle = document.getElementById('sectionTitle');
    currentCategory = category;
    currentSubcategory = null;

    if (category === 'all') {
        currentProducts = [...products];
        sectionTitle.textContent = 'All Products';
    } else {
        currentProducts = products.filter(product => product.category === category);
        sectionTitle.textContent = capitalize(category) + "'s Clothing";
    }

    displayProducts(currentProducts);
    updateBreadcrumb();
}

function showSubcategory(category, subcategory) {
    const sectionTitle = document.getElementById('sectionTitle');
    currentCategory = category;
    currentSubcategory = subcategory;

    currentProducts = products.filter(product => 
        product.category === category && product.subcategory === subcategory
    );

    sectionTitle.textContent = `${capitalize(category)}'s ${capitalize(subcategory)}`;
    displayProducts(currentProducts);
    updateBreadcrumb();
}

// Display products
function displayProducts(productsToShow) {
    const productsGrid = document.getElementById('productsGrid');

    if (productsToShow.length === 0) {
        productsGrid.innerHTML = '<div class="empty-state">No products found matching your criteria.</div>';
        return;
    }

    productsGrid.innerHTML = productsToShow.map(product => `
        <div class="product-card" onclick="showProductDetails(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${capitalize(product.category)} - ${capitalize(product.subcategory)}</p>
                <div class="product-price">₹${product.price.toLocaleString()}</div>
                <div class="product-rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span>(${product.rating})</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(event, ${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Generate star rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return '★'.repeat(fullStars) + (halfStar ? '☆' : '') + '☆'.repeat(emptyStars);
}

// Capitalize first letter
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Search functionality
function searchProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();

    if (searchTerm.trim() === '') {
        displayProducts(currentProducts);
        return;
    }

    const filteredProducts = currentProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.subcategory.toLowerCase().includes(searchTerm)
    );

    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortBy = document.getElementById('sortFilter').value;
    let sortedProducts = [...currentProducts];

    switch(sortBy) {
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
    }

    displayProducts(sortedProducts);
}

// Filter by price
function filterByPrice() {
    const priceRange = document.getElementById('priceFilter').value;
    let filteredProducts = [...products];

    // Apply category filter first
    if (currentCategory !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === currentCategory);
    }

    if (currentSubcategory) {
        filteredProducts = filteredProducts.filter(product => product.subcategory === currentSubcategory);
    }

    // Then apply price filter
    if (priceRange !== 'all') {
        if (priceRange === '0-500') {
            filteredProducts = filteredProducts.filter(product => product.price <= 500);
        } else if (priceRange === '500-1000') {
            filteredProducts = filteredProducts.filter(product => product.price > 500 && product.price <= 1000);
        } else if (priceRange === '1000-2000') {
            filteredProducts = filteredProducts.filter(product => product.price > 1000 && product.price <= 2000);
        } else if (priceRange === '2000+') {
            filteredProducts = filteredProducts.filter(product => product.price > 2000);
        }
    }

    currentProducts = filteredProducts;
    displayProducts(currentProducts);
}

// Add to cart
function addToCart(event, productId) {
    event.stopPropagation();

    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize: product.sizes[0],
            selectedColor: product.colors[0]
        });
    }

    updateCartCount();
    saveCart();

    // Show feedback
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#4caf50';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '#ff6b6b';
    }, 1000);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');

    if (cartSidebar.classList.contains('open')) {
        displayCartItems();
    }
}

// Display cart items
function displayCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartTotal.textContent = 'Total: ₹0';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-details">
                    <div>Size: ${item.selectedSize} | Color: ${item.selectedColor}</div>
                </div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="quantity-btn remove-btn" onclick="removeFromCart(${item.id})">×</button>
                </div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ₹${total.toLocaleString()}`;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        item.quantity += change;

        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCount();
            displayCartItems();
            saveCart();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    displayCartItems();
    saveCart();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show product details modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-product">
            <img src="${product.image}" alt="${product.name}" class="modal-product-image">
            <div class="modal-product-info">
                <h2>${product.name}</h2>
                <p class="category">${capitalize(product.category)} - ${capitalize(product.subcategory)}</p>
                <div class="price">₹${product.price.toLocaleString()}</div>
                <div class="rating">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span>(${product.rating} stars)</span>
                </div>
                <p class="description">${product.description}</p>

                <div class="product-options">
                    <div class="size-selector">
                        <label>Size:</label>
                        <select id="sizeSelect">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    <div class="color-selector">
                        <label>Color:</label>
                        <select id="colorSelect">
                            ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <button class="add-to-cart" onclick="addToCartWithOptions(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

function addToCartWithOptions(productId) {
    const product = products.find(p => p.id === productId);
    const selectedSize = document.getElementById('sizeSelect').value;
    const selectedColor = document.getElementById('colorSelect').value;

    const existingItem = cart.find(item => 
        item.id === productId && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
            selectedSize,
            selectedColor
        });
    }

    updateCartCount();
    displayCartItems();
    saveCart();
    closeModal();

    alert('Product added to cart!');
}

// Close modal
function closeModal() {
    const modal = document.getElementById('productModal');
    modal.style.display = 'none';
}

// Checkout functionality
function proceedToCheckout() {
    if (!currentUser) {
        alert('Please login to proceed with checkout.');
        showAuthModal();
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    document.getElementById('checkoutModal').style.display = 'block';
    updateOrderSummary();
}

function closeCheckoutModal() {
    document.getElementById('checkoutModal').style.display = 'none';
}

function nextStep() {
    const form = document.getElementById('shippingForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'block';
}

function updateOrderSummary() {
    const orderSummary = document.getElementById('orderSummary');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 1000 ? 0 : 100;
    const total = subtotal + shipping;

    orderSummary.innerHTML = `
        <div class="order-summary-content">
            <h4>Order Summary</h4>
            <div class="summary-line">
                <span>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span>₹${subtotal.toLocaleString()}</span>
            </div>
            <div class="summary-line">
                <span>Shipping:</span>
                <span>${shipping === 0 ? 'FREE' : '₹' + shipping}</span>
            </div>
            <div class="summary-line total">
                <span>Total:</span>
                <span>₹${total.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function placeOrder() {
    const shippingForm = document.getElementById('shippingForm');
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    const order = {
        id: Date.now(),
        userId: currentUser.id,
        items: [...cart],
        shipping: {
            name: shippingForm.querySelector('input[type="text"]').value,
            address1: shippingForm.querySelectorAll('input[type="text"]')[1].value,
            address2: shippingForm.querySelectorAll('input[type="text"]')[2].value,
            city: shippingForm.querySelectorAll('input[type="text"]')[3].value,
            state: shippingForm.querySelectorAll('input[type="text"]')[4].value,
            pincode: shippingForm.querySelectorAll('input[type="text"]')[5].value,
            phone: shippingForm.querySelector('input[type="tel"]').value
        },
        payment: paymentMethod,
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) + (cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) > 1000 ? 0 : 100),
        status: 'Confirmed',
        orderDate: new Date().toISOString()
    };

    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    updateCartCount();
    saveCart();

    closeCheckoutModal();
    toggleCart();

    alert(`Order placed successfully! \nOrder ID: ${order.id}\nTotal: ₹${order.total.toLocaleString()}\n\nYou will receive a confirmation email shortly.`);
}

// Show user orders
function showUserOrders() {
    if (!currentUser) {
        alert('Please login to view your orders.');
        return;
    }

    const userOrders = orders.filter(order => order.userId === currentUser.id);
    const userOrdersList = document.getElementById('userOrdersList');

    if (userOrders.length === 0) {
        userOrdersList.innerHTML = '<div class="empty-state">You have no orders yet.</div>';
    } else {
        userOrdersList.innerHTML = userOrders.map(order => `
            <div class="user-order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-status">
                        <span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span>
                    </div>
                </div>
                <div class="order-details">
                    <div class="order-date">Ordered on: ${new Date(order.orderDate).toLocaleDateString()}</div>
                    <div class="order-total">Total: ₹${order.total.toLocaleString()}</div>
                    <div class="order-items">
                        <strong>Items (${order.items.length}):</strong>
                        ${order.items.map(item => `
                            <div class="order-item">
                                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                                <div class="order-item-info">
                                    <div class="order-item-name">${item.name}</div>
                                    <div class="order-item-details">Size: ${item.selectedSize} | Color: ${item.selectedColor} | Qty: ${item.quantity}</div>
                                    <div class="order-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="shipping-info">
                        <strong>Shipping Address:</strong><br>
                        ${order.shipping.name}<br>
                        ${order.shipping.address1}<br>
                        ${order.shipping.address2 ? order.shipping.address2 + '<br>' : ''}
                        ${order.shipping.city}, ${order.shipping.state} - ${order.shipping.pincode}<br>
                        Phone: ${order.shipping.phone}
                    </div>
                </div>
            </div>
        `).join('');
    }

    document.getElementById('userOrdersModal').style.display = 'block';
}

function closeUserOrdersModal() {
    document.getElementById('userOrdersModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const productModal = document.getElementById('productModal');
    const authModal = document.getElementById('authModal');
    const checkoutModal = document.getElementById('checkoutModal');
    const userOrdersModal = document.getElementById('userOrdersModal');

    if (event.target === productModal) {
        closeModal();
    }
    if (event.target === authModal) {
        closeAuthModal();
    }
    if (event.target === checkoutModal) {
        closeCheckoutModal();
    }
    if (event.target === userOrdersModal) {
        closeUserOrdersModal();
    }
}

// Search on Enter key
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchProducts();
    }
});