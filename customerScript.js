
document.addEventListener('DOMContentLoaded', function () {
    const cart = [];
    let totalPrice = 0;

    // Select DOM elements
    const addToCartButtons = document.querySelectorAll('.addToCartButton');
    const cartList = document.getElementById('cartList');
    const totalPriceDisplay = document.getElementById('totalPrice');
    const checkoutButton = document.getElementById('checkoutButton');
    const checkoutPopup = document.getElementById('checkoutPopup');
    const checkoutSummary = document.getElementById('checkoutSummary');
    const checkoutTotalPrice = document.getElementById('checkoutTotalPrice');
    const confirmCheckout = document.getElementById('confirmCheckout');
    const cancelCheckout = document.getElementById('cancelCheckout');

    // Function to update the cart display
    const updateCartDisplay = () => {
        cartList.innerHTML = ''; // Clear the cart list

        // Iterate through the cart and display each item
        cart.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = `${item.food} ($${item.price}) - Quantity: ${item.quantity}`;
            cartList.appendChild(li);
        });

        // Update total price display
        totalPriceDisplay.textContent = totalPrice.toFixed(2);
    };

    // Add item to the cart when the add to cart button is clicked
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const food = this.getAttribute('data-food');
            const price = parseFloat(this.getAttribute('data-price'));

            // Check if the item already exists in the cart
            const existingItem = cart.find(item => item.food === food);
            if (existingItem) {
                // Increase quantity if item already in the cart
                existingItem.quantity += 1;
            } else {
                // Add new item to the cart
                cart.push({ food, price, quantity: 1 });
            }

            // Update the total price
            totalPrice += price;

            // Update the cart display
            updateCartDisplay();
        });
    });

    // Show the checkout popup when the checkout button is clicked
    checkoutButton.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty.');
            return;
        }

        // Show the checkout popup
        checkoutPopup.style.display = 'block';

        // Clear the current summary and update it with the cart items
        checkoutSummary.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.food} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
            checkoutSummary.appendChild(li);
        });

        // Update the total price in the checkout summary
        checkoutTotalPrice.textContent = totalPrice.toFixed(2);
    });

    // Confirm the checkout and save the order to localStorage
    confirmCheckout.addEventListener('click', function () {
        // Save cart to localStorage
        let orders = JSON.parse(localStorage.getItem('foodOrders')) || {};
        const customerName = prompt("Enter your name:", "Customer1") || "Customer1"; // Get the customer name from input

        if (!orders[customerName]) {
            orders[customerName] = []; // Initialize array if it doesn't exist
        }

        // Store the orders correctly
        cart.forEach(item => {
            orders[customerName].push({
                food: item.food,
                price: item.price,
                quantity: item.quantity
            });
        });

        localStorage.setItem('foodOrders', JSON.stringify(orders)); // Update localStorage
        console.log(cart); // For debugging

        // Clear cart and hide checkout popup
        cart.length = 0; // Clear the cart by setting its length to 0
        totalPrice = 0;
        updateCartDisplay();
        checkoutPopup.style.display = 'none';
        alert("Order placed successfully!");
    });

    // Cancel the checkout and hide the checkout popup
    cancelCheckout.addEventListener('click', function () {
        checkoutPopup.style.display = 'none';
    });
});
