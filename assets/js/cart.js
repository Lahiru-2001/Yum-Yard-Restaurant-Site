let qty = 1;
const price = 2000;
const delivery = 300;

// Change quantity
function changeQty(val) {
    qty += val;

    if (qty < 1) qty = 1;

    document.getElementById("qty").innerText = qty;

    updateTotal();
}

// Update totals
function updateTotal() {
    const subtotal = qty * price;
    const total = subtotal + delivery;

    document.getElementById("subtotal").innerText = subtotal.toFixed(2);
    document.getElementById("total").innerText = total.toFixed(2);
}

// Run once on load
updateTotal();

// Continue button
document.querySelector(".continue-btn").addEventListener("click", async function () {

    const termsChecked = document.querySelector(".terms input").checked;

    if (!termsChecked) {
        alert("Please agree to the Terms and Conditions");
        return;
    }
    // Prepare order data
    const subtotal = qty * price;
    const total = subtotal + delivery;

    const orderData = {
        product_name: "Magnam Tiste",
        order_type: "lunch",
        order_quantity: qty,
        subtotal: subtotal,
        delivery_price: delivery,
        total_price: total,
        terms_agreed: termsChecked
    };
    // Send order data to server
    try {
        const response = await fetch("http://localhost:3000/api/cart/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });
        // Handle response
        const data = await response.json();

        if (response.ok) {
            alert("Order saved successfully!");
            window.location.href = "cart_pay.html";
        } else {
            alert(data.message || "Error saving order");
        }
        // Handle errors
    } catch (error) {
        console.error(error);
        alert("Server error");
    }
});