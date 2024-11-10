document.addEventListener('DOMContentLoaded', function() {
    // Get current page path
    const currentPage = window.location.pathname;
    
    // Get all nav items
    const navItems = document.querySelectorAll('.nav-item');
    
    // Remove active class from all items
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class based on current page
    if (currentPage.includes('index.html') || currentPage.endsWith('/')) {
        document.querySelector('[href="index.html"]').classList.add('active');
    } else if (currentPage.includes('leaderboard.html')) {
        document.querySelector('[href="leaderboard.html"]').classList.add('active');
    } else if (currentPage.includes('settings.html')) {
        document.querySelector('[href="settings.html"]').classList.add('active');
    }
});
