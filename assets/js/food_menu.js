// JavaScript for filtering menu items
function filterMenu(type) {
    let items = document.querySelectorAll(".menu-card");
    let buttons = document.querySelectorAll(".menu-tabs button");

    // Remove active class from all buttons and add to the clicked button
    buttons.forEach(btn => btn.classList.remove("active"));
    event.target.classList.add("active");

    // Show or hide menu items based on the selected type
    items.forEach(item => {
        if (type === "all") {
            item.style.display = "block";
        } else {
            item.style.display = item.classList.contains(type) ? "block" : "none";
        }
    });
}