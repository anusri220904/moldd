const allProducts = {
    affordable_helmet: [
        { id: 'wall_mount_v1', name: 'Minimalist Wall Mount', price: 599.00, description: 'Sleek 3D-printed helmet mount with hidden screws.', images: ['h1.jpg', 'h2.jpg'] },
        { id: 'eco_stand', name: 'Eco-Series Desk Stand', price: 749.00, description: 'Lightweight and durable desktop helmet display.', images: ['e1.jpg'] }
    ],
    premium_helmet: [
        { id: 'carbon_throne', name: 'The Carbon Throne', price: 1899.00, description: 'Reinforced 3D-printed pedestal with a metallic finish.', images: ['p1.jpg', 'p2.jpg'] },
        { id: 'heavy_duty_wall', name: 'Premium Heavy Duty Mount', price: 1499.00, description: 'Supports full-face helmets with integrated gear hook.', images: ['p3.jpg'] }
    ],
    anime_decor: [
        { id: 'katana_stand', name: 'Katana Desk Display', price: 899.00, description: 'Modern 3D-printed stand for katanas and prop swords.', images: ['a1.jpg', 'a2.jpg'] },
        { id: 'manga_bookend', name: 'Character Silhouette Bookends', price: 1199.00, description: 'Functional art to keep your manga collection organized.', images: ['a3.jpg'] }
    ]
};

// --- CORE FUNCTIONALITY ---
let cart = JSON.parse(localStorage.getItem('molddCart')) || [];

window.renderProducts = function(category) {
    const productsToRender = allProducts[category];
    const targetGrid = document.querySelector('.products-grid');
    if (!targetGrid || !productsToRender) return;

    targetGrid.innerHTML = productsToRender.map(product => `
        <div class="product">
            <div class="product-slider">
                <img src="${product.images[0]}" class="active">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price-info">
                    <strong>₹${product.price.toFixed(2)}</strong>
                </div>
                <button class="btn-add" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('');
};

window.addToCart = function(name, price) {
    cart.push({ name, price: parseFloat(price) });
    localStorage.setItem('molddCart', JSON.stringify(cart));
    updateCartDisplay();
};

window.updateCartDisplay = function() {
    const cartItemsList = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('cartTotal');
    const whatsappLink = document.getElementById('whatsappLink');
    
    if (!cartItemsList) return;

    let subtotal = 0;
    cartItemsList.innerHTML = cart.map((item, index) => {
        subtotal += item.price;
        return `<li>${item.name} - ₹${item.price.toFixed(2)}</li>`;
    }).join('');

    const finalTotal = subtotal + 100; // Flat delivery example
    totalDisplay.textContent = `Total: ₹${finalTotal.toFixed(2)}`;

    let message = `Hello Moldd! I'd like to order:\n` + cart.map(i => `- ${i.name}`).join('\n');
    whatsappLink.href = `https://wa.me/9235698833?text=${encodeURIComponent(message)}`;
};

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const categoryMap = {
        'affordable-helmets.html': 'affordable_helmet',
        'premium-helmets.html': 'premium_helmet',
        'anime-decor.html': 'anime_decor'
    };
    if (categoryMap[fileName]) window.renderProducts(categoryMap[fileName]);
    updateCartDisplay();
});
