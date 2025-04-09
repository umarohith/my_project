// Get references to cart elements
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartLink = document.getElementById("cart-link");
const closeCartBtn = document.getElementById("close-cart");

// Load cart from local storage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Open cart function
cartLink.addEventListener("click", (event) => {
    event.preventDefault();
    cartModal.classList.add("show-cart");
});

// Close cart function
closeCartBtn.addEventListener("click", () => {
    cartModal.classList.remove("show-cart");
});

// Function to save cart to local storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to add items to cart
function addToCart(productName, productPrice, productImage) {
    let existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: productName,
            price: parseFloat(productPrice), // Ensure price is a number
            image: productImage,
            quantity: 1
        });
    }

    saveCart(); // Save cart to local storage
    updateCartUI();
}

// Function to remove items from cart
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    saveCart(); // Save cart to local storage
    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
            <button class="remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    // Update cart count
    cartLink.innerHTML = `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`;

    // Ensure cart stays open after an update
    cartModal.classList.add("show-cart");

    // Attach event listeners to "Remove" buttons
    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll(".product-box button").forEach((button) => {
    button.addEventListener("click", () => {
        const productBox = button.parentElement;
        const productName = productBox.querySelector("h5").innerText;
        const productPrice = productBox.querySelector(".product-price")?.innerText.replace("₹", "").trim() || "0";
        const productImage = productBox.querySelector("img").src;

        addToCart(productName, productPrice, productImage);
    });
});

// Load the cart UI on page load
updateCartUI();
