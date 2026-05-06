const API_URL = "http://localhost:3000/api/auth";

// Switch Forms
function showRegister() {
    document.getElementById("loginContainer").classList.add("hidden");
    document.getElementById("registerForm").classList.remove("hidden");
}

function showLogin() {
    document.getElementById("registerForm").classList.add("hidden");
    document.getElementById("loginContainer").classList.remove("hidden");
}

// REGISTER
async function register() {
    let username = document.getElementById("regUsername").value;
    let email = document.getElementById("regEmail").value;
    let confirmEmail = document.getElementById("regConfirmEmail").value;
    let password = document.getElementById("regPassword").value;

    if (!username || !email || !confirmEmail || !password) {
        alert("Please fill all fields");
        return;
    }

    if (email !== confirmEmail) {
        alert("Emails do not match!");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert("Registered Successfully!");
        showLogin();

    } catch (error) {
        console.error(error);
        alert("Error registering user");
    }
}

// LOGIN
async function login() {
    let username = document.getElementById("loginUsername").value;
    let password = document.getElementById("loginPassword").value;

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.message);
            return;
        }

        alert("Login Successful!");

        // OPTIONAL: store user session
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect
        window.location.href = "home_page.html";

    } catch (error) {
        console.error(error);
        alert("Error logging in");
    }
}