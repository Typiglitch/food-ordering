document.addEventListener('DOMContentLoaded', function () {
    const orderList = document.getElementById('orderList');
    const customerOrderList = document.getElementById('customerOrderList');
    const clearOrdersButton = document.getElementById('clearOrdersButton'); // Reference the clear button
    const password = '123';
    // Function to update the order display
    const updateOrderDisplay = () => {
        const orders = JSON.parse(localStorage.getItem('foodOrders')) || {}; // Fetch orders

        orderList.innerHTML = ''; // Clear existing orders
        customerOrderList.innerHTML = ''; // Clear existing customer orders

        // Display orders by customer
        Object.keys(orders).forEach(customer => {
            if (Array.isArray(orders[customer])) {
                const customerLi = document.createElement('li');
                let totalOrderCost = 0; // Variable to track total cost

                // Prepare the order details and calculate total
                const orderDetails = orders[customer].map((order, index) => {
                    const orderCost = order.price * order.quantity; // Calculate order cost
                    totalOrderCost += orderCost; // Add to total
                    
                    // Return the order details
                    return `${order.food} x ${order.quantity} ($${orderCost.toFixed(2)})`;
                }).join(', ');

                // Display total cost for the customer
                customerLi.textContent = `Orders for ${customer}: ${orderDetails} Total: $${totalOrderCost.toFixed(2)}`;

                // Create a Remove button for all orders of this customer
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove All Orders';
                removeButton.addEventListener('click', function () {
                    deleteCustomerOrders(customer); // Function to delete all orders for this customer
                });

                // Create a list item for customer orders
                const customerOrderItem = document.createElement('li');
                customerOrderItem.textContent = customerLi.textContent; // Set the content
                customerOrderItem.appendChild(removeButton); // Append the remove button
                
                // Append the customer order item to the list
                customerOrderList.appendChild(customerOrderItem);

                // List each order individually (if necessary)
                orders[customer].forEach((order) => {
                    const li = document.createElement('li');
                    li.textContent = `Order: ${order.food} x ${order.quantity} ($${(order.price * order.quantity).toFixed(2)})`;
                    orderList.appendChild(li);
                });
            }
        });
    };

    // Function to delete all orders for a specific customer
    const deleteCustomerOrders = (customer) => {
        let orders = JSON.parse(localStorage.getItem('foodOrders')) || {};
        if (orders[customer]) {
            delete orders[customer]; // Remove the customer's orders
            localStorage.setItem('foodOrders', JSON.stringify(orders)); // Update localStorage
            updateOrderDisplay(); // Refresh the order display
            alert(`All orders for ${customer} have been deleted.`);
        }
    };

    // Initial load - display all orders
    updateOrderDisplay();

    // Listen for changes to localStorage
    window.addEventListener('storage', function (event) {
        if (event.key === 'foodOrders') {
            updateOrderDisplay();
        }
    });

    // Clear all orders
    clearOrdersButton.addEventListener('click', function () {
        var security_code = prompt("Please enter the password in order to clear all orders");
        if (security_code == password) {
            localStorage.removeItem('foodOrders'); // Clear orders from localStorage
            updateOrderDisplay(); // Update the display to show that orders have been cleared
            alert("All orders have been cleared!");
            } else {
                alert("Wrong Password")
            }; 
    });
});
