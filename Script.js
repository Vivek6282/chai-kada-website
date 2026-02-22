<script>
    console.log('Script loaded');
    let cart = [];
    let total = 0;

    // 🆕 NEW: Function to open and close the floating cart popup
    function toggleCart() {
        const modal = document.getElementById('cart-modal');
        if (modal.style.display === "flex") {
            modal.style.display = "none";
        } else {
            modal.style.display = "flex";
        }
    }

    // Function to add item
    function addToCart(name, price) {
        console.log('addToCart called', { name, price });
        
        // Validation
        if (typeof name !== 'string' || typeof price !== 'number') {
            console.error('addToCart invalid args', name, price);
            return;
        }

        // Clear "Order Placed" message if user adds new items
        document.getElementById("confirmation").innerHTML = "";

        cart.push({ name, price });
        total += price;
        updateCart();
    }

    // Function to remove a single item
    function removeFromCart(index) {
        console.log('removeFromCart called', index);
        if (index > -1 && index < cart.length) {
            total -= cart[index].price; // Subtract price
            cart.splice(index, 1);      // Remove from array
            updateCart();               // Update screen
        }
    }

    // Function to clear everything
    function clearCart() {
        console.log('clearCart called');
        if (cart.length === 0) {
            alert("Cart is already empty!");
            return;
        }
        cart = [];
        total = 0;
        document.getElementById("confirmation").innerHTML = "";
        updateCart();
    }

    // Function to update the UI
    function updateCart() {
        const list = document.getElementById("cart-items");
        const totalDisplay = document.getElementById("total");
        const badge = document.getElementById("cart-badge"); // 🆕 Grab the red badge

        if (!list || !totalDisplay) {
            console.error('updateCart: missing DOM elements');
            return;
        }

        list.innerHTML = "";

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            
            // Item text
            const span = document.createElement("span");
            span.textContent = `${item.name} - ₹${item.price} `;
            
            // Remove (X) Button
            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.style.marginLeft = "10px";
            removeBtn.style.padding = "2px 6px";
            removeBtn.style.fontSize = "0.8rem";
            removeBtn.style.background = "#ff5252"; 
            removeBtn.style.color = "white";
            removeBtn.style.border = "none";
            removeBtn.style.borderRadius = "4px";
            removeBtn.style.cursor = "pointer";
            removeBtn.onclick = () => removeFromCart(index);

            li.appendChild(span);
            li.appendChild(removeBtn);
            list.appendChild(li);
        });

        totalDisplay.textContent = total;
        
        // 🆕 NEW: Update the red number on the floating cart icon!
        if (badge) {
            badge.textContent = cart.length;
        }
    }

    // Function to place order
    function placeOrder() {
        console.log('placeOrder called', { cart, total });
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Kept your larger 90px rich.jpg image!
        document.getElementById("confirmation").innerHTML = 
            "✅ Order placed! നന്ദി — വീണ്ടും വരിക <img src='images/rich.jpg' style='width: 90px; vertical-align: middle; margin-left: 5px;'>";

        cart = [];
        total = 0;
        updateCart();
    }

    // Expose functions to HTML buttons
    window.toggleCart = toggleCart; // 🆕 Expose the toggle function
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
    window.clearCart = clearCart;
    window.placeOrder = placeOrder;

</script>