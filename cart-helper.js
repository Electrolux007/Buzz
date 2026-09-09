// Global Cart Badge Updater
window.updateCartBadge = function() {
    const badges = document.querySelectorAll("#cart-badge");
    let cart = JSON.parse(localStorage.getItem("buzz_cart")) || [];
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    badges.forEach(badge => {
        if (totalItems > 0) {
            badge.textContent = totalItems;
            badge.style.display = "inline-block";
        } else {
            badge.style.display = "none";
        }
    });
};

// Run on every page load
document.addEventListener("DOMContentLoaded", () => {
    window.updateCartBadge();
});