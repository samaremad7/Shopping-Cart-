// Use this object to simulate user data
const userData = {
    email: 'user@gamil.com',
    password: '123456'
};
document.addEventListener('DOMContentLoaded', () => {
    const loggedInEmail = localStorage.getItem('loggedInEmail');
    if (loggedInEmail && document.title === 'Logout') {
        window.location.href = 'index.html';
    } else if (document.title === 'Login') {
        document.getElementById('message').innerText = '';
    }
});
// Login function
document.getElementById('login-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === userData.email && password === userData.password) {
        localStorage.setItem('loggedInEmail', email);
        window.location.href = 'index.html'; 
    } else {
        document.getElementById('message').innerText = 'Invalid credentials, please try again.';
    }
});
// Logout function
function logout() {
    clearCart();
    localStorage.removeItem('loggedInEmail');
    window.location.href = 'login.html'; 
    
}
/*######################################################################################### */
const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'imgs/product1.jpg', description: 'Description of product 1' },
    { id: 2, name: 'Product 2', price: 20, image: 'imgs/product2.jpg', description: 'Description of product 2' },
    { id: 3, name: 'Product 3', price: 30, image: 'imgs/product3.jpg', description: 'Description of product 3' },
    { id: 4, name: 'Product 4', price: 40, image: 'imgs/product4.jpg', description: 'Description of product 4' },
    { id: 5, name: 'Product 5', price: 50, image: 'imgs/product5.jpg', description: 'Description of product 5' },
    { id: 6, name: 'Product 6', price: 60, image: 'imgs/product6.jpg', description: 'Description of product 6' }
];

function renderProducts() {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p class="card-text">$${product.price}</p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    
    cart.forEach(product => {
        const cartItem = `
            <div class="col-12">
                <h5>${product.name} - $${product.price}</h5>
            </div>
        `;
        cartItems.innerHTML += cartItem;
        total += product.price;
    });

    document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}

function clearCart() {
    localStorage.removeItem('cart');
    location.reload();
}

// Load functions on page load
if (document.getElementById('product-list')) {
    renderProducts();
}
if (document.getElementById('cart-items')) {
    renderCart();
}
//#################################
let checkoutButton = document.getElementById("checkout");
checkoutButton.addEventListener("click", () => {
    let totalPaymentElement = document.getElementById("total-price");
    let totalPayment = parseFloat(totalPaymentElement.textContent.replace('Total: $', ''));
    localStorage.setItem("totalPayment", totalPayment);
    window.location.href = "payment.html";
});