// Di ui.js, perbaiki fungsi loadBalance:
static async loadBalance() {
    try {
        this.showLoading('Loading balance...');
        const balance = await APIService.getBalance();
        
        if (balance && balance.success) {
            // Update balance display
            document.getElementById('currentBalance').textContent = 
                balance.data.formated || `Rp${balance.data.balance}`;
            document.getElementById('apiKey').textContent = 
                balance.data.apikey || 'Not available';
            document.getElementById('userName').textContent = 
                balance.data.username || 'Guest';
            document.getElementById('userEmail').textContent = 
                balance.data.email || 'Not set';
            document.getElementById('username').textContent = 
                balance.data.username || 'Guest';
            
            this.showSuccess('Balance loaded successfully!');
        } else {
            this.showError(balance?.error || 'Invalid API response');
        }
    } catch (error) {
        console.error('Balance loading error:', error);
        this.showError('Failed to load balance. Check API key.');
    } finally {
        this.hideLoading();
    }
}

// Perbaiki fungsi loadServices:
static async loadServices() {
    try {
        this.showLoading('Loading services...');
        const services = await APIService.getServices();
        
        if (services && services.success) {
            const grid = document.getElementById('servicesGrid');
            grid.innerHTML = '';
            
            services.data.forEach(service => {
                const card = this.createServiceCard(service);
                grid.appendChild(card);
            });
            
            this.showSuccess(`${services.data.length} services loaded`);
        } else {
            this.showError(services?.error || 'Failed to load services');
            this.showEmptyState('servicesGrid', 'No services available');
        }
    } catch (error) {
        console.error('Services loading error:', error);
        this.showError('Failed to load services');
        this.showEmptyState('servicesGrid', 'Failed to load services');
    } finally {
        this.hideLoading();
    }
}