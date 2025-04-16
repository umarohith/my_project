// Get references to cart elements
const cartModal = document.getElementById("cart-modal");
const cartItemsContainer = document.getElementById("cart-items");
const cartLink = document.getElementById("cart-link");
const closeCartBtn = document.getElementById("close-cart");
const orderButton = document.getElementById("order-button");

// Load cart from local storage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Open cart function
cartLink.addEventListener("click", (event) => {
    event.preventDefault();
    cartModal.classList.add("show-cart");
    updateCartUI();
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
    cart.splice(index, 1); // Always remove the full product
    saveCart();
    updateCartUI();
}


// Function to update the cart UI
function updateCartUI() {
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your Cart is empty</p>";
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50" height="50">
                <span>${item.name} - ₹${item.price} x ${item.quantity}</span>
                <div class="quantity-controls">
                    <button class="decrease-btn" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-btn" data-index="${index}">+</button>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
    }

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

    // Attach event listeners to "Increase" and "Decrease" buttons
    document.querySelectorAll(".increase-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            cart[index].quantity += 1;
            saveCart(); // Save cart to local storage
            updateCartUI(); // Update UI after quantity change
        });
    });

    document.querySelectorAll(".decrease-btn").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
    
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1; // Decrease quantity
            } else {
                // Optional: Confirm before removing
                if (confirm("Remove this item from the cart?")) {
                    cart.splice(index, 1); // Remove item if quantity is 1
                }
            }
    
            saveCart();     // Save updated cart to localStorage
            updateCartUI(); // Update the UI
        });
    });
    
    // Update total price and show "Order" button
    updateTotalPrice();
}

function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartFooter = document.getElementById("cart-footer");

    // Clear previous footer content
    cartFooter.innerHTML = "";

    if (cart.length > 0) {
        const priceElement = document.createElement("p");
        priceElement.id = "total-price";
        priceElement.innerText = `Total: ₹${total.toFixed(2)}`;
        cartFooter.appendChild(priceElement);

        const orderBtn = document.createElement("button");
        orderBtn.id = "order-button";
        orderBtn.innerText = "Order Now";
        orderBtn.addEventListener("click", () => {
            alert("Your order has been placed!");
            cart = []; // Clear cart after order
            saveCart(); // Save empty cart
            updateCartUI(); // Update UI
        });
        cartFooter.appendChild(orderBtn);
    }
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
document.getElementById("cart-modal").classList.remove("hidden");

