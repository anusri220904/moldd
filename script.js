const allProducts = {
    'affordable-helmets.html': [
        { name: 'Lite Wall Mount', appPrice: 799, selPrice: 499, desc: '3D printed minimalist mount.', img: 'h1.jpg' },
        { name: 'Basic Desk Stand', appPrice: 999, selPrice: 649, desc: 'Sturdy entry-level stand.', img: 'h2.jpg' },
        { name: 'Gear Hook', appPrice: 450, selPrice: 299, desc: 'Multi-purpose helmet hook.', img: 'h3.jpg' },
        { name: 'Slim Pedestal', appPrice: 850, selPrice: 549, desc: 'Elegant small-footprint stand.', img: 'h4.jpg' },
        { name: 'Dual Entry Hanger', appPrice: 1200, selPrice: 799, desc: 'Holds two helmets securely.', img: 'h5.jpg' }
    ],
    'premium-helmets.html': [
        { name: 'Carbon Throne', appPrice: 2499, selPrice: 1899, desc: 'High-gloss reinforced display.', img: 'p1.jpg' },
        { name: 'Heavy Duty Mount', appPrice: 1999, selPrice: 1499, desc: 'Industrial strength wall mount.', img: 'p2.jpg' },
        { name: 'Viking Series', appPrice: 2800, selPrice: 2199, desc: 'Ornate Norse-themed stand.', img: 'p3.jpg' },
        { name: 'Lumina LED Stand', appPrice: 3500, selPrice: 2599, desc: 'Integrated backlighting.', img: 'p4.jpg' },
        { name: 'Racing Armor Stand', appPrice: 4200, selPrice: 2999, desc: 'Sculpted aerodynamic design.', img: 'p5.jpg' }
    ],
    'anime-decor.html': [
        { name: 'Katana Rack', appPrice: 1299, selPrice: 899, desc: 'Desktop sword display.', img: 'a1.jpg' },
        { name: 'Hero Bookends', appPrice: 1650, selPrice: 1199, desc: 'Manga collection silouettes.', img: 'a2.jpg' },
        { name: 'Village Kunai Rack', appPrice: 950, selPrice: 699, desc: 'Ninja tool wall display.', img: 'a3.jpg' },
        { name: 'Icon Night Light', appPrice: 1899, selPrice: 1399, desc: '3D printed lithophane lamp.', img: 'a4.jpg' },
        { name: 'Artisan Keycaps', appPrice: 650, selPrice: 449, desc: 'Custom anime keyboard caps.', img: 'a5.jpg' }
    ]
};

let cart = JSON.parse(localStorage.getItem('molddCart')) || [];

window.renderProducts = function() {
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const products = allProducts[fileName];
    const grid = document.querySelector('.products-grid');

    if (!grid || !products) return;

    grid.innerHTML = products.map(p => `
        <div class="product">
            <img src="${p.img}" onerror="this.src='https://placehold.co/400?text=Moldd'">
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div class="price-info">
                <span style="text-decoration:line-through; color:#999;">₹${p.appPrice}</span>
                <strong style="font-size:1.2rem; margin-left:10px;">₹${p.selPrice}</strong>
            </div>
            <button class="btn-add" onclick="addToCart('${p.name}', ${p.selPrice})">Add to Cart</button>
        </div>
    `).join('');
};

window.addToCart = function(name, price) {
    cart.push({ name, price });
    localStorage.setItem('molddCart', JSON.stringify(cart));
    updateCartDisplay();
};

window.updateCartDisplay = function() {
    const list = document.getElementById('cartItems');
    const totalEl = document.getElementById('cartTotal');
    const subtotalEl = document.getElementById('cartSubtotal');
    const waLink = document.getElementById('whatsappLink');

    if (!list) return;

    let subtotal = 0;
    list.innerHTML = cart.map(item => {
        subtotal += item.price;
        return `<li>${item.name} - ₹${item.price}</li>`;
    }).join('');

    const total = subtotal > 0 ? subtotal + 100 : 0;
    if (subtotalEl) subtotalEl.innerText = subtotal.toFixed(2);
    if (totalEl) totalEl.innerText = "₹" + total.toFixed(2);

    let msg = `I want to Order from Moldd:\n` + cart.map(i => `- ${i.name}`).join('\n') + `\nTotal: ₹${total}`;
    waLink.href = `https://wa.me/9336222830?text=${encodeURIComponent(msg)}`;
};

document.getElementById('clearCartBtn')?.addEventListener('click', () => {
    cart = [];
    localStorage.removeItem('molddCart');
    updateCartDisplay();
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartDisplay();
});
