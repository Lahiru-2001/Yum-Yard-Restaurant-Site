// cart_pay.js
async function confirmOrder() {
    // Gather form data
    const data = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone_number: document.getElementById("phone").value,
        address: document.getElementById("address").value,
        card_owner_name: document.getElementById("card_name").value,
        card_number: document.getElementById("card_number").value,
        card_cvv: document.getElementById("cvv").value,
        card_exp_date: document.getElementById("exp_date").value
    };
    // Send data to server
    try {
        const response = await fetch("http://localhost:3000/api/payment/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        // Handle response
        const result = await response.json();

        if (response.ok) {
            alert("Payment Confirmed Successfully!");
            window.location.href = "home_page.html";
        } else {
            alert(result.message || "Payment failed");
        }
        // Handle errors
    } catch (error) {
        console.error(error);
        alert("Server error!");
    }
}
