// Get references to cart elements
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartLink = document.getElementById("cart-link");
const closeCartBtn = document.getElementById("close-cart");

// Cart array to store items
let cart = [];

// Open cart function
cartLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    cartModal.classList.add("show-cart"); // Add class to make it visible
});

// Close cart function
closeCartBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent bubbling issue
    cartModal.classList.remove("show-cart");
});

// Function to add items to cart
function addToCart(productName, productPrice, productImage) {
    let existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1; // Increase quantity for duplicate items
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    updateCartUI();
}

// Function to remove items from cart (without closing)
function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Reduce quantity
    } else {
        cart.splice(index, 1); // Remove item when quantity is 0
    }

    updateCartUI();
}

// Function to update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = ""; // Clear existing items

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="50" height="50">
            <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartModal.classList.add("show-cart"); // Ensure cart stays open after update
    cartLink.innerText = `Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`; // Update cart count
}

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll(".product-box button").forEach((button, index) => {
    button.addEventListener("click", () => {
        const productBox = button.parentElement;
        const productName = productBox.querySelector("h5").innerText;
        const productPrice = productBox.querySelector(".product-price")?.innerText.replace("₹", "") || "0";
        const productImage = productBox.querySelector("img").src;

        addToCart(productName, productPrice, productImage);
    });
});
