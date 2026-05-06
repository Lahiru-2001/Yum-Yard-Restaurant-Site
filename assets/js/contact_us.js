document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    // Gather form data
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;
    // Send data to server
    try {
        const response = await fetch("http://localhost:3000/api/feedback/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        });
        // Handle response
        const data = await response.json();

        if (response.ok) {
            alert("Message sent successfully!");
            document.getElementById("contactForm").reset();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error(error);
        alert("Server error. Try again later.");
    }
});