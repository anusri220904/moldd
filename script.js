const allProducts = {
    affordable_helmet: [
        { id: 'wall_mount_v1', name: 'Minimalist Wall Mount', price: 499.00, originalPrice: 799.00, description: 'Sleek 3D-printed helmet mount with hidden screws.', images: ['h1.jpg'] },
        { id: 'eco_stand', name: 'Eco-Series Desk Stand', price: 649.00, originalPrice: 999.00, description: 'Lightweight and durable desktop helmet display.', images: ['e1.jpg'] },
        { id: 'compact_hook', name: 'Compact Gear Hook', price: 299.00, originalPrice: 450.00, description: 'Space-saving hook for helmets and lightweight jackets.', images: ['h3.jpg'] },
        { id: 'basic_pedestal', name: 'Standard Pedestal', price: 549.00, originalPrice: 850.00, description: 'Basic elevated stand for open-face helmets.', images: ['h4.jpg'] },
        { id: 'dual_hanger', name: 'Dual Entry Hanger', price: 799.00, originalPrice: 1200.00, description: 'Sturdy wall mount designed for two helmets.', images: ['h5.jpg'] }
    ],
    premium_helmet: [
        { id: 'carbon_throne', name: 'The Carbon Throne', price: 1899.00, originalPrice: 2499.00, description: 'Reinforced 3D-printed pedestal with a metallic finish.', images: ['p1.jpg'] },
        { id: 'heavy_duty_wall', name: 'Pro Heavy Duty Mount', price: 1499.00, originalPrice: 1999.00, description: 'Supports full-face helmets with integrated gear hook.', images: ['p3.jpg'] },
        { id: 'viking_stand', name: 'Viking Series Display', price: 2199.00, originalPrice: 2800.00, description: 'Intricately designed Norse-inspired desktop stand.', images: ['p4.jpg'] },
        { id: 'led_glow_mount', name: 'Lumina LED Mount', price: 2599.00, originalPrice: 3500.00, description: 'Premium wall mount with integrated LED backlighting.', images: ['p5.jpg'] },
        { id: 'sculpted_armor', name: 'Armor-Plated Stand', price: 2999.00, originalPrice: 4200.00, description: 'High-detail sculpted stand for premium racing helmets.', images: ['p6.jpg'] }
    ],
    anime_decor: [
        { id: 'katana_stand', name: 'Katana Desk Display', price: 899.00, originalPrice: 1299.00, description: 'Modern 3D-printed stand for katanas and prop swords.', images: ['a1.jpg'] },
        { id: 'manga_bookend', name: 'Hero Silhouette Bookends', price: 1199.00, originalPrice: 1650.00, description: 'Functional art to keep your manga collection organized.', images: ['a3.jpg'] },
        { id: 'kunai_holder', name: 'Hidden Village Rack', price: 699.00, originalPrice: 950.00, description: 'Wall-mounted display for collectible kunai and scrolls.', images: ['a4.jpg'] },
        { id: 'logo_lamp', name: 'Anime Icon Night Light', price: 1399.00, originalPrice: 1899.00, description: '3D-printed lithophane style lamp of iconic symbols.', images: ['a5.jpg'] },
        { id: 'keycap_art', name: 'Artisan Keycap Set', price: 449.00, originalPrice: 650.00, description: 'Hand-finished 3D printed keycaps for mechanical keyboards.', images: ['a6.jpg'] }
    ]
};

// --- RENDER LOGIC WITH DUAL PRICING ---
window.renderProducts = function(category) {
    const productsToRender = allProducts[category];
    const targetGrid = document.querySelector('.products-grid');
    if (!targetGrid || !productsToRender) return;

    targetGrid.innerHTML = productsToRender.map(product => `
        <div class="product">
            <div class="product-slider">
                <img src="${product.images[0]}" class="active" onerror="this.src='https://placehold.co/400x375?text=Moldd+Product'">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price-info">
                    <span style="text-decoration: line-through; color: #999; font-size: 0.9rem; margin-right: 8px;">₹${product.originalPrice.toFixed(2)}</span>
                    <strong style="color: #1A1A1A; font-size: 1.25rem;">₹${product.price.toFixed(2)}</strong>
                </div>
                <button class="btn-add" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            </div>
        </div>
    `).join('');
};

// Initialization Mapping
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const categoryMap = {
        'affordable-helmets.html': 'affordable_helmet',
        'premium-helmets.html': 'premium_helmet',
        'anime-decor.html': 'anime_decor'
    };
    if (categoryMap[fileName]) window.renderProducts(categoryMap[fileName]);
});
