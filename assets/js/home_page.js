// MENU FILTER
function filterMenu(type) {
    let items = document.querySelectorAll(".menu-card");
    let buttons = document.querySelectorAll(".menu-tabs button");

    // Update active button
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    // Show/hide items
    items.forEach(item => {
        if (type === "all") {
            item.style.display = "block";
        } else {
            item.style.display = item.classList.contains(type) ? "block" : "none";
        }
    });
}

// TESTIMONIAL SLIDER
const testimonials = [
    {
        text: "Amazing food and great service!",
        name: "Sarah",
        img: "/assets/images/testimonials-2.jpg"
    },
    {
        text: "Best restaurant ever!",
        name: "John",
        img: "/assets/images/testimonials-2.jpg"
    },
    {
        text: "Loved the experience!",
        name: "Emma",
        img: "/assets/images/testimonials-2.jpg"
    }
];

let i = 0;
const card = document.querySelector(".testimonial-card");
const dots = document.querySelectorAll(".testimonial-dots span");

// FUNCTION TO UPDATE CONTENT
function showTestimonial(index) {

    // fade out
    card.classList.add("fade-out");

    setTimeout(() => {
        document.querySelector(".testimonial-content p").innerText = testimonials[index].text;
        document.querySelector(".testimonial-content h4").innerText = testimonials[index].name;
        document.querySelector(".testimonial-img img").src = testimonials[index].img;

        // update dots
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");

        // fade in
        card.classList.remove("fade-out");
        card.classList.add("fade-in");

    }, 300);
}

// AUTO SLIDER
setInterval(() => {
    i = (i + 1) % testimonials.length;
    showTestimonial(i);
}, 3000);

// DOT CLICK EVENT
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        i = index;
        showTestimonial(i);
    });
});

// CONTACT FORM
const contactForm = document.getElementById("contactForm");
// Check if form exists before adding event listener
if (contactForm) {
    contactForm.addEventListener("submit", async function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;

        try {
            const response = await fetch("http://localhost:3000/api/feedback/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Server error.");
        }
    });
}


