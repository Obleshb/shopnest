
// Admin functionality
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let orders = JSON.parse(localStorage.getItem('orders')) || [];
let products = JSON.parse(localStorage.getItem('products')) || [];
let allOrders = [...orders];
let allProducts = [...products];

// Admin users (in real app, this would be in backend)
const adminUsers = ['admin@shopnest.com', 'manager@shopnest.com'];

// Initialize admin portal
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
    if (isAdmin()) {
        loadDashboard();
        loadOrders();
        loadProducts();
        loadUsers();
        updateUserInterface();
    }
});

// Check if user has admin access
function checkAdminAccess() {
    if (!currentUser || !isAdmin()) {
        document.getElementById('accessDenied').style.display = 'block';
        document.getElementById('adminContent').style.display = 'none';
        return false;
    }
    
    document.getElementById('accessDenied').style.display = 'none';
    document.getElementById('adminContent').style.display = 'block';
    return true;
}

// Check if current user is admin
function isAdmin() {
    return currentUser && currentUser.email === 'admin@shopnest.com';
}

// Update user interface
function updateUserInterface() {
    const userName = document.getElementById('userName');
    if (currentUser) {
        userName.textContent = currentUser.name + ' (Admin)';
    }
}

// Go to login page
function goToLogin() {
    window.location.href = 'index.html';
}

// Logout function
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Show admin section
function showSection(sectionName) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Remove active class from all nav buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => btn.classList.remove('active'));
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Refresh data when showing sections
    if (sectionName === 'orders') {
        loadOrders();
    } else if (sectionName === 'products') {
        loadProducts();
    } else if (sectionName === 'users') {
        loadUsers();
    } else if (sectionName === 'dashboard') {
        loadDashboard();
    }
}

// Load dashboard statistics
function loadDashboard() {
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = orders.filter(order => order.status === 'Confirmed').length;
    
    document.getElementById('totalOrders').textContent = totalOrders;
    document.getElementById('totalProducts').textContent = totalProducts;
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toLocaleString();
    document.getElementById('pendingOrders').textContent = pendingOrders;
}

// Load orders table
function loadOrders() {
    const ordersTableBody = document.getElementById('ordersTableBody');
    
    if (orders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No orders found</td></tr>';
        return;
    }
    
    ordersTableBody.innerHTML = orders.map(order => {
        const customer = getUserById(order.userId);
        const customerName = customer ? customer.name : 'Unknown Customer';
        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        
        return `
            <tr>
                <td>#${order.id}</td>
                <td>${customerName}</td>
                <td>${itemCount} items</td>
                <td>₹${order.total.toLocaleString()}</td>
                <td><span class="status-badge status-${order.status.toLowerCase()}">${order.status}</span></td>
                <td>${new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                    <select onchange="updateOrderStatus(${order.id}, this.value)">
                        <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
                        <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                    <button class="btn-secondary" onclick="viewOrderDetails(${order.id})">View</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Get user by ID
function getUserById(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.id === userId);
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
        orders[orderIndex].status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
        loadDashboard();
        alert('Order status updated successfully!');
    }
}

// View order details
function viewOrderDetails(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const customer = getUserById(order.userId);
    const customerName = customer ? customer.name : 'Unknown Customer';
    
    let orderDetails = `Order ID: #${order.id}\n`;
    orderDetails += `Customer: ${customerName}\n`;
    orderDetails += `Status: ${order.status}\n`;
    orderDetails += `Total: ₹${order.total.toLocaleString()}\n`;
    orderDetails += `Order Date: ${new Date(order.orderDate).toLocaleDateString()}\n\n`;
    orderDetails += `Items:\n`;
    
    order.items.forEach(item => {
        orderDetails += `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}\n`;
    });
    
    orderDetails += `\nShipping Address:\n`;
    orderDetails += `${order.shipping.name}\n`;
    orderDetails += `${order.shipping.address1}\n`;
    if (order.shipping.address2) orderDetails += `${order.shipping.address2}\n`;
    orderDetails += `${order.shipping.city}, ${order.shipping.state} - ${order.shipping.pincode}\n`;
    orderDetails += `Phone: ${order.shipping.phone}`;
    
    alert(orderDetails);
}

// Filter orders
function filterOrders() {
    const searchTerm = document.getElementById('orderSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    let filteredOrders = [...allOrders];
    
    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order => {
            const customer = getUserById(order.userId);
            const customerName = customer ? customer.name.toLowerCase() : '';
            return order.id.toString().includes(searchTerm) || customerName.includes(searchTerm);
        });
    }
    
    if (statusFilter) {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    orders = filteredOrders;
    loadOrders();
}

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center;">No products found</div>';
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="admin-product-card">
            <img src="${product.image}" alt="${product.name}" class="admin-product-image">
            <div class="admin-product-info">
                <h4>${product.name}</h4>
                <p>${capitalize(product.category)} - ${capitalize(product.subcategory)}</p>
                <p><strong>₹${product.price.toLocaleString()}</strong></p>
                <p>Rating: ${product.rating} ⭐</p>
                <div class="admin-product-actions">
                    <button class="btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    const searchTerm = document.getElementById('productSearch').value.toLowerCase();
    const categoryFilter = document.getElementById('categoryFilter').value;
    
    let filteredProducts = [...allProducts];
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.subcategory.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
    }
    
    products = filteredProducts;
    loadProducts();
}

// Toggle image input method
function toggleImageInput() {
    const imageSource = document.querySelector('input[name="imageSource"]:checked').value;
    const fileInput = document.getElementById('productImageFile');
    const urlInput = document.getElementById('productImage');
    const preview = document.getElementById('imagePreview');
    
    if (imageSource === 'upload') {
        fileInput.style.display = 'block';
        urlInput.style.display = 'none';
        urlInput.removeAttribute('required');
    } else {
        fileInput.style.display = 'none';
        urlInput.style.display = 'block';
        urlInput.setAttribute('required', 'required');
        preview.style.display = 'none';
    }
}

// Toggle edit image input method
function toggleEditImageInput() {
    const imageSource = document.querySelector('input[name="editImageSource"]:checked').value;
    const fileInput = document.getElementById('editProductImageFile');
    const urlInput = document.getElementById('editProductImageUrl');
    const currentImageDiv = document.getElementById('currentImageDiv');
    const preview = document.getElementById('editImagePreview');
    
    // Hide all inputs first
    fileInput.style.display = 'none';
    urlInput.style.display = 'none';
    preview.style.display = 'none';
    
    if (imageSource === 'upload') {
        fileInput.style.display = 'block';
        currentImageDiv.style.display = 'none';
    } else if (imageSource === 'url') {
        urlInput.style.display = 'block';
        currentImageDiv.style.display = 'none';
    } else {
        currentImageDiv.style.display = 'block';
    }
}

// Handle file upload and preview
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('productImageFile');
    if (fileInput) {
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('imagePreview');
                    const previewImg = document.getElementById('previewImg');
                    previewImg.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Handle edit image file upload
    const editFileInput = document.getElementById('editProductImageFile');
    if (editFileInput) {
        editFileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const preview = document.getElementById('editImagePreview');
                    const previewImg = document.getElementById('editPreviewImg');
                    previewImg.src = e.target.result;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// Add new product
function addProduct(event) {
    event.preventDefault();
    
    const imageSource = document.querySelector('input[name="imageSource"]:checked').value;
    let imageUrl = '';
    
    if (imageSource === 'upload') {
        const fileInput = document.getElementById('productImageFile');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newProduct = {
                    id: Date.now(),
                    name: document.getElementById('productName').value,
                    category: document.getElementById('productCategory').value,
                    subcategory: document.getElementById('productSubcategory').value,
                    price: parseInt(document.getElementById('productPrice').value),
                    image: e.target.result, // Base64 encoded image
                    rating: parseFloat(document.getElementById('productRating').value),
                    description: document.getElementById('productDescription').value,
                    sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim()),
                    colors: document.getElementById('productColors').value.split(',').map(c => c.trim())
                };
                
                // Get existing products and add new one
                const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
                existingProducts.push(newProduct);
                localStorage.setItem('products', JSON.stringify(existingProducts));
                
                // Update global products array
                allProducts = existingProducts;
                products = existingProducts;
                
                // Reset form
                document.getElementById('productForm').reset();
                document.getElementById('imagePreview').style.display = 'none';
                toggleImageInput(); // Reset to default state
                
                // Refresh displays
                loadProducts();
                loadDashboard();
                
                alert('Product added successfully!');
            };
            reader.readAsDataURL(fileInput.files[0]);
            return; // Exit here to wait for file reading
        } else {
            alert('Please select an image file.');
            return;
        }
    } else {
        imageUrl = document.getElementById('productImage').value;
        if (!imageUrl) {
            alert('Please enter an image URL.');
            return;
        }
    }
    
    // For URL method
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        category: document.getElementById('productCategory').value,
        subcategory: document.getElementById('productSubcategory').value,
        price: parseInt(document.getElementById('productPrice').value),
        image: imageUrl,
        rating: parseFloat(document.getElementById('productRating').value),
        description: document.getElementById('productDescription').value,
        sizes: document.getElementById('productSizes').value.split(',').map(s => s.trim()),
        colors: document.getElementById('productColors').value.split(',').map(c => c.trim())
    };
    
    // Get existing products and add new one
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    existingProducts.push(newProduct);
    localStorage.setItem('products', JSON.stringify(existingProducts));
    
    // Update global products array
    allProducts = existingProducts;
    products = existingProducts;
    
    // Reset form
    document.getElementById('productForm').reset();
    toggleImageInput(); // Reset to default state
    
    // Refresh displays
    loadProducts();
    loadDashboard();
    
    alert('Product added successfully!');
}

// Edit product
function editProduct(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('editProductId').value = product.id;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductSubcategory').value = product.subcategory;
    document.getElementById('editProductDescription').value = product.description;
    
    // Set current image
    document.getElementById('currentImage').src = product.image;
    
    // Reset image options
    document.querySelector('input[name="editImageSource"][value="keep"]').checked = true;
    toggleEditImageInput();
    
    document.getElementById('editProductModal').style.display = 'block';
}

// Update product
function updateProduct(event) {
    event.preventDefault();
    
    const productId = parseInt(document.getElementById('editProductId').value);
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const productIndex = existingProducts.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
        const imageSource = document.querySelector('input[name="editImageSource"]:checked').value;
        let imageUrl = existingProducts[productIndex].image; // Keep current image by default
        
        if (imageSource === 'upload') {
            const fileInput = document.getElementById('editProductImageFile');
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    existingProducts[productIndex] = {
                        ...existingProducts[productIndex],
                        name: document.getElementById('editProductName').value,
                        price: parseInt(document.getElementById('editProductPrice').value),
                        category: document.getElementById('editProductCategory').value,
                        subcategory: document.getElementById('editProductSubcategory').value,
                        description: document.getElementById('editProductDescription').value,
                        image: e.target.result
                    };
                    
                    localStorage.setItem('products', JSON.stringify(existingProducts));
                    
                    // Update global arrays
                    allProducts = existingProducts;
                    products = existingProducts;
                    
                    closeEditModal();
                    loadProducts();
                    
                    alert('Product updated successfully!');
                };
                reader.readAsDataURL(fileInput.files[0]);
                return; // Exit here to wait for file reading
            }
        } else if (imageSource === 'url') {
            const newImageUrl = document.getElementById('editProductImageUrl').value;
            if (newImageUrl) {
                imageUrl = newImageUrl;
            }
        }
        
        // For keep current or URL method
        existingProducts[productIndex] = {
            ...existingProducts[productIndex],
            name: document.getElementById('editProductName').value,
            price: parseInt(document.getElementById('editProductPrice').value),
            category: document.getElementById('editProductCategory').value,
            subcategory: document.getElementById('editProductSubcategory').value,
            description: document.getElementById('editProductDescription').value,
            image: imageUrl
        };
        
        localStorage.setItem('products', JSON.stringify(existingProducts));
        
        // Update global arrays
        allProducts = existingProducts;
        products = existingProducts;
        
        closeEditModal();
        loadProducts();
        
        alert('Product updated successfully!');
    }
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
        const filteredProducts = existingProducts.filter(p => p.id !== productId);
        
        localStorage.setItem('products', JSON.stringify(filteredProducts));
        
        // Update global arrays
        allProducts = filteredProducts;
        products = filteredProducts;
        
        loadProducts();
        loadDashboard();
        
        alert('Product deleted successfully!');
    }
}

// Close edit modal
function closeEditModal() {
    document.getElementById('editProductModal').style.display = 'none';
}

// Capitalize helper function
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize products if not exists
if (!localStorage.getItem('products')) {
    // Copy products from main script to localStorage
    const defaultProducts = [
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
    allProducts = defaultProducts;
    products = defaultProducts;
}

// Load users table
function loadUsers() {
    const usersTableBody = document.getElementById('usersTableBody');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentLoggedUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (users.length === 0) {
        usersTableBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No users registered</td></tr>';
        return;
    }
    
    usersTableBody.innerHTML = users.map(user => {
        const userOrders = orders.filter(order => order.userId === user.id);
        const totalOrders = userOrders.length;
        const isCurrentlyLoggedIn = currentLoggedUser && currentLoggedUser.id === user.id;
        const status = isCurrentlyLoggedIn ? 'Online' : 'Offline';
        const statusClass = isCurrentlyLoggedIn ? 'status-delivered' : 'status-confirmed';
        
        return `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td>${totalOrders}</td>
                <td>
                    <button class="btn-secondary" onclick="viewUserDetails(${user.id})">View Details</button>
                    <button class="btn-secondary" onclick="viewUserOrders(${user.id})">View Orders</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Filter users
function filterUsers() {
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('userStatusFilter').value;
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentLoggedUser = JSON.parse(localStorage.getItem('currentUser'));
    
    let filteredUsers = [...users];
    
    if (searchTerm) {
        filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone.includes(searchTerm)
        );
    }
    
    if (statusFilter === 'online') {
        filteredUsers = filteredUsers.filter(user => 
            currentLoggedUser && currentLoggedUser.id === user.id
        );
    }
    
    // Update the table with filtered users
    const usersTableBody = document.getElementById('usersTableBody');
    usersTableBody.innerHTML = filteredUsers.map(user => {
        const userOrders = orders.filter(order => order.userId === user.id);
        const totalOrders = userOrders.length;
        const isCurrentlyLoggedIn = currentLoggedUser && currentLoggedUser.id === user.id;
        const status = isCurrentlyLoggedIn ? 'Online' : 'Offline';
        const statusClass = isCurrentlyLoggedIn ? 'status-delivered' : 'status-confirmed';
        
        return `
            <tr>
                <td>#${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td><span class="status-badge ${statusClass}">${status}</span></td>
                <td>${totalOrders}</td>
                <td>
                    <button class="btn-secondary" onclick="viewUserDetails(${user.id})">View Details</button>
                    <button class="btn-secondary" onclick="viewUserOrders(${user.id})">View Orders</button>
                </td>
            </tr>
        `;
    }).join('');
}

// View user details
function viewUserDetails(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    const currentLoggedUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) return;
    
    const isCurrentlyLoggedIn = currentLoggedUser && currentLoggedUser.id === user.id;
    const userOrders = orders.filter(order => order.userId === user.id);
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    
    let userDetails = `User Details:\n\n`;
    userDetails += `ID: #${user.id}\n`;
    userDetails += `Name: ${user.name}\n`;
    userDetails += `Email: ${user.email}\n`;
    userDetails += `Phone: ${user.phone}\n`;
    userDetails += `Registration Date: ${new Date(user.createdAt).toLocaleDateString()}\n`;
    userDetails += `Status: ${isCurrentlyLoggedIn ? 'Currently Logged In' : 'Offline'}\n`;
    userDetails += `Total Orders: ${userOrders.length}\n`;
    userDetails += `Total Amount Spent: ₹${totalSpent.toLocaleString()}`;
    
    alert(userDetails);
}

// View user orders
function viewUserOrders(userId) {
    const userOrders = orders.filter(order => order.userId === userId);
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === userId);
    
    if (userOrders.length === 0) {
        alert(`No orders found for ${user ? user.name : 'this user'}.`);
        return;
    }
    
    let ordersDetails = `Orders for ${user ? user.name : 'User'}:\n\n`;
    
    userOrders.forEach(order => {
        ordersDetails += `Order #${order.id}\n`;
        ordersDetails += `Date: ${new Date(order.orderDate).toLocaleDateString()}\n`;
        ordersDetails += `Status: ${order.status}\n`;
        ordersDetails += `Total: ₹${order.total.toLocaleString()}\n`;
        ordersDetails += `Items: ${order.items.length} item(s)\n\n`;
    });
    
    alert(ordersDetails);
}

// Clear all users function
function clearAllUsers() {
    if (confirm('Are you sure you want to delete ALL users? This action cannot be undone.\n\nThis will:\n- Delete all registered users\n- Clear all orders\n- Log out current user\n\nYou will need to register admin@shopnest.com again.')) {
        // Clear users
        localStorage.removeItem('users');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('orders');
        localStorage.removeItem('cart');
        
        // Reset global variables
        currentUser = null;
        orders = [];
        allOrders = [];
        
        alert('All users have been cleared successfully!\n\nRedirecting to main page...');
        
        // Redirect to main page
        window.location.href = 'index.html';
    }
}

// Load data on page load
allProducts = JSON.parse(localStorage.getItem('products')) || [];
products = [...allProducts];
allOrders = JSON.parse(localStorage.getItem('orders')) || [];
orders = [...allOrders];

// Close modal when clicking outside
window.onclick = function(event) {
    const editModal = document.getElementById('editProductModal');
    if (event.target === editModal) {
        closeEditModal();
    }
}
