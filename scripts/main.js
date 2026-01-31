// scripts/main.js - Versi Sederhana
document.addEventListener('DOMContentLoaded', async () => {
    // Sembunyikan loading screen
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 300);
        }
    }, 1000);
    
    // Check API key
    const apiKey = Config.getApiKey();
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE' || apiKey === 'YOUR_ACTUAL_API_KEY_HERE') {
        showAPIKeyWarning();
    }
    
    // Initialize UI
    UI.init();
    
    // Load initial data
    try {
        await UI.loadBalance();
        await UI.loadServices();
    } catch (error) {
        console.error('Initial data load failed:', error);
    }
});

function showAPIKeyWarning() {
    Toastify({
        text: "⚠ API Key not set. Some features may not work.",
        duration: 5000,
        gravity: "top",
        position: "center",
        backgroundColor: "linear-gradient(to right, #ff9966, #ff5e62)",
    }).showToast();
}