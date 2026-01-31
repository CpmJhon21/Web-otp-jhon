// Main application
class OTPApp {
    static async init() {
        try {
            // Check API key
            const apiKey = Config.getApiKey();
            if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
                this.showAPIKeyWarning();
            }
            
            // Initialize UI
            UI.init();
            
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loadingScreen').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loadingScreen').style.display = 'none';
                }, 300);
            }, 1000);
            
            // Load initial data
            await this.loadInitialData();
            
        } catch (error) {
            console.error('App initialization failed:', error);
            UI.showError('Failed to initialize application');
        }
    }
    
    static async loadInitialData() {
        // Load essential data in background
        try {
            await UI.loadBalance();
            await UI.loadServices();
        } catch (error) {
            console.warn('Some initial data failed to load:', error);
        }
    }
    
    static showAPIKeyWarning() {
        const modal = document.createElement('div');
        modal.className = 'api-warning-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        modal.innerHTML = `
            <div style="
                background: white;
                padding: 30px;
                border-radius: 12px;
                max-width: 500px;
                text-align: center;
            ">
                <h3 style="color: #e74c3c; margin-bottom: 20px;">
                    <i class="fas fa-exclamation-triangle"></i> API Key Required
                </h3>
                <p style="margin-bottom: 20px; color: #333;">
                    Please set your API key in the environment variables:
                </p>
                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 20px;
                    text-align: left;
                    font-family: monospace;
                    font-size: 14px;
                ">
                    <p><strong>For Vercel:</strong></p>
                    <p>API_KEY=your_api_key_here</p>
                    <br>
                    <p><strong>For Replit:</strong></p>
                    <p>Add in Secrets tab</p>
                    <br>
                    <p><strong>For GitHub Pages:</strong></p>
                    <p>Edit config.js file</p>
                </div>
                <button onclick="this.closest('.api-warning-modal').remove()" 
                        style="
                            background: #4361ee;
                            color: white;
                            border: none;
                            padding: 10px 30px;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 16px;
                        ">
                    I Understand
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    OTPApp.init();
});

// Make UI functions available globally
window.UI = UI;
