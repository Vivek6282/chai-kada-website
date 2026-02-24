let currentLanguage = 'en'; // English is the default

const translations = {
    en: {
        cartTitle: "Shopping Cart",
        emptyAlert: "Your cart is empty!",
        orderSuccess: "✅ Order placed! Thank you — come again 🙂"
    },
    ml: {
        cartTitle: "ഷോപ്പിംഗ് കാർട്ട്",
        emptyAlert: "നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്!",
        orderSuccess: "✅ ഓർഡർ നൽകി! നന്ദി — വീണ്ടും വരിക 🙂"
    }
};

let cart = [];
let total = 0;

function switchLanguage(lang) {
    // 1. Update the active language
    currentLanguage = lang;
    
    // 2. Change the main cart title
    document.getElementById("cart-title").textContent = translations[currentLanguage].cartTitle;
    
    // 3. Clear any confirmation messages so they don't get stuck in the wrong language
    document.getElementById("confirmation").textContent = "";
    
    console.log("Language switched to:", lang);
}

// Expose it to the window just like your other functions
window.switchLanguage = switchLanguage;

function addToCart(name, price) {
    console.log('addToCart called', { name, price });
    if (typeof name !== 'string' || typeof price !== 'number') {
        console.error('addToCart invalid args', name, price);
        return;
    }

    // Clear any previous success messages when modifying cart
    document.getElementById("confirmation").textContent = "";

    cart.push({ name, price });
    total += price;
    updateCart();
}

// 🆕 NEW: Function to remove a specific item by its index in the array
function removeFromCart(index) {
    console.log('removeFromCart called', index);
    
    // Check if the item exists
    if (index > -1 && index < cart.length) {
        // Subtract the price of the item being removed
        total -= cart[index].price;
        
        // Remove the item from the array
        cart.splice(index, 1);
        
        // Update the display
        updateCart();
    }
}

// 🆕 NEW: Function to clear the entire cart
function clearCart() {
    console.log('clearCart called');
    if(cart.length === 0) {
        alert("Cart is already empty!");
        return;
    }
    
    // Reset everything
    cart = [];
    total = 0;
    document.getElementById("confirmation").textContent = "";
    updateCart();
}

function updateCart() {
    const list = document.getElementById("cart-items");
    const totalDisplay = document.getElementById("total");

    if (!list || !totalDisplay) {
        console.error('updateCart: missing DOM elements', { list, totalDisplay });
        return;
    }

    list.innerHTML = "";

    cart.forEach((item, index) => {
        const li = document.createElement("li");
        
        // Display item name and price
        // We wrap the text in a span so it sits nicely next to the button
        const textSpan = document.createElement("span");
        textSpan.textContent = `${item.name} - ₹${item.price} `;
        
        // Create a remove button for this specific item
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "❌";
        removeBtn.style.marginLeft = "10px";
        removeBtn.style.padding = "2px 6px";
        removeBtn.style.fontSize = "0.8rem";
        removeBtn.style.background = "#ff5252"; // Red color for delete
        removeBtn.title = "Remove this item";
        
        // When clicked, call removeFromCart with this specific index
        removeBtn.onclick = () => removeFromCart(index);

        li.appendChild(textSpan);
        li.appendChild(removeBtn);
        list.appendChild(li);
    });

    totalDisplay.textContent = total;
    console.log('updateCart done', { cart, total });
}

function placeOrder() {
    console.log('placeOrder called', { cart, total });
    if (cart.length === 0) {
        // Look up the alert in the dictionary!
        alert(translations[currentLanguage].emptyAlert);
        return;
    }

    // Look up the success message in the dictionary!
    document.getElementById("confirmation").textContent = translations[currentLanguage].orderSuccess;

    cart = [];
    total = 0;
    updateCart();
}

// Expose functions to the window so HTML can see them
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearCart = clearCart;
window.placeOrder = placeOrder;
