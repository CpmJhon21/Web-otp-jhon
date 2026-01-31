class UI {
    // Initialize the UI
    static init() {
        this.setupEventListeners();
        this.loadDashboard();
        this.setupTheme();
    }
    
    // Setup event listeners
    static setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('href').substring(1);
                this.showSection(section);
                
                // Update active nav
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Menu toggle for mobile
        document.getElementById('menuToggle').addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('active');
        });
        
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // Quick actions
        document.getElementById('checkBalance').addEventListener('click', () => this.loadBalance());
        document.getElementById('viewServices').addEventListener('click', () => this.showSection('services'));
        document.getElementById('createOrder').addEventListener('click', () => this.showOrderForm());
        document.getElementById('depositFunds').addEventListener('click', () => this.showSection('balance'));
        
        // Order management
        document.getElementById('newOrderBtn').addEventListener('click', () => this.showOrderForm());
        document.getElementById('cancelOrderBtn').addEventListener('click', () => this.hideOrderForm());
        document.getElementById('submitOrderBtn').addEventListener('click', () => this.submitOrder());
        
        // Balance
        document.getElementById('refreshBalance').addEventListener('click', () => this.loadBalance());
        document.getElementById('depositBtn').addEventListener('click', () => this.processDeposit());
        
        // Search
        document.getElementById('serviceSearch').addEventListener('input', (e) => {
            this.filterServices(e.target.value);
        });
        
        // Country filter
        document.getElementById('countryFilter').addEventListener('change', (e) => {
            this.loadCountries(e.target.value);
        });
    }
    
    // Show/hide sections
    static showSection(sectionId) {
        // Hide all sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show selected section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Load section data
            switch(sectionId) {
                case 'dashboard':
                    this.loadDashboard();
                    break;
                case 'services':
                    this.loadServices();
                    break;
                case 'countries':
                    this.loadCountries();
                    break;
                case 'orders':
                    this.loadActiveOrders();
                    break;
                case 'balance':
                    this.loadBalance();
                    break;
            }
        }
        
        // Close mobile menu if open
        document.querySelector('.nav-links').classList.remove('active');
    }
    
    // Load dashboard data
    static async loadDashboard() {
        try {
            // Load recent orders
            // Note: You might need to implement a separate endpoint for recent orders
            // For now, we'll show empty state
            this.showEmptyState('recentOrders', 'No recent orders found');
            
            // Load balance for quick view
            const balance = await APIService.getBalance();
            if (balance.success) {
                document.getElementById('username').textContent = balance.data.username;
            }
        } catch (error) {
            this.showError('Failed to load dashboard data');
        }
    }
    
    // Load services
    static async loadServices() {
        try {
            const services = await APIService.getServices();
            
            if (services.success) {
                const grid = document.getElementById('servicesGrid');
                grid.innerHTML = '';
                
                services.data.forEach(service => {
                    const card = this.createServiceCard(service);
                    grid.appendChild(card);
                });
            }
        } catch (error) {
            this.showError('Failed to load services');
        }
    }
    
    // Create service card
    static createServiceCard(service) {
        const div = document.createElement('div');
        div.className = 'service-card';
        div.innerHTML = `
            <img src="${service.service_img}" alt="${service.service_name}" 
                 onerror="this.src='https://via.placeholder.com/60'">
            <h3>${service.service_name}</h3>
            <p class="service-code">Code: ${service.service_code}</p>
            <button class="btn-primary" onclick="UI.orderService(${service.service_code})">
                <i class="fas fa-shopping-cart"></i> Order Now
            </button>
        `;
        return div;
    }
    
    // Load countries
    static async loadCountries(serviceId = null) {
        try {
            const countries = await APIService.getCountries(serviceId);
            
            if (countries.success) {
                const grid = document.getElementById('countriesGrid');
                grid.innerHTML = '';
                
                countries.data.forEach(country => {
                    const card = this.createCountryCard(country);
                    grid.appendChild(card);
                });
            }
        } catch (error) {
            this.showError('Failed to load countries');
        }
    }
    
    // Create country card
    static createCountryCard(country) {
        const div = document.createElement('div');
        div.className = 'country-card';
        div.innerHTML = `
            <img src="${country.img}" alt="${country.name}" 
                 onerror="this.src='https://via.placeholder.com/60'">
            <h3>${country.name}</h3>
            <p><strong>Prefix:</strong> ${country.prefix}</p>
            <p><strong>Stock:</strong> ${country.stock_total}</p>
            <p><strong>Rate:</strong> ${country.rate}</p>
            <div class="price-info">
                Price: ${country.pricelist[0]?.price_format || 'N/A'}
            </div>
            <button class="btn-primary" onclick="UI.selectCountry('${country.iso_code}', '${country.name}')">
                <i class="fas fa-check"></i> Select
            </button>
        `;
        return div;
    }
    
    // Load active orders
    static async loadActiveOrders() {
        try {
            // Note: You'll need to implement endpoint for active orders
            // For demo, we'll show empty state
            this.showEmptyState('activeOrdersTable', 'No active orders');
        } catch (error) {
            this.showError('Failed to load orders');
        }
    }
    
    // Load balance
    static async loadBalance() {
        try {
            const balance = await APIService.getBalance();
            
            if (balance.success) {
                // Update balance display
                document.getElementById('currentBalance').textContent = balance.data.formated;
                document.getElementById('apiKey').textContent = balance.data.apikey;
                document.getElementById('userName').textContent = balance.data.username;
                document.getElementById('userEmail').textContent = balance.data.email;
                document.getElementById('username').textContent = balance.data.username;
                
                // Load transactions
                // Note: You'll need to implement transactions endpoint
                this.showEmptyState('transactionsList', 'No recent transactions');
            }
        } catch (error) {
            this.showError('Failed to load balance');
        }
    }
    
    // Show order form
    static async showOrderForm() {
        const form = document.getElementById('orderForm');
        form.style.display = 'block';
        
        // Scroll to form
        form.scrollIntoView({ behavior: 'smooth' });
        
        // Load countries and services for dropdowns
        try {
            const [countries, services, operators] = await Promise.all([
                APIService.getCountries(),
                APIService.getServices(),
                APIService.getOperators()
            ]);
            
            if (countries.success) {
                const select = document.getElementById('orderCountry');
                select.innerHTML = '<option value="">Select Country</option>';
                countries.data.forEach(country => {
                    const option = document.createElement('option');
                    option.value = country.iso_code;
                    option.textContent = `${country.name} (${country.prefix})`;
                    select.appendChild(option);
                });
            }
            
            if (services.success) {
                const select = document.getElementById('orderService');
                select.innerHTML = '<option value="">Select Service</option>';
                services.data.forEach(service => {
                    const option = document.createElement('option');
                    option.value = service.service_code;
                    option.textContent = service.service_name;
                    select.appendChild(option);
                });
            }
            
            if (operators.status || operators.success) {
                const select = document.getElementById('orderOperator');
                select.innerHTML = '<option value="any">Any Operator</option>';
                const operatorsData = operators.data || operators.operators;
                operatorsData.forEach(operator => {
                    const option = document.createElement('option');
                    option.value = operator.name || operator.id;
                    option.textContent = operator.name;
                    select.appendChild(option);
                });
            }
        } catch (error) {
            this.showError('Failed to load order form data');
        }
    }
    
    // Hide order form
    static hideOrderForm() {
        document.getElementById('orderForm').style.display = 'none';
    }
    
    // Submit order
    static async submitOrder() {
        const country = document.getElementById('orderCountry').value;
        const service = document.getElementById('orderService').value;
        const operator = document.getElementById('orderOperator').value;
        
        if (!country || !service) {
            this.showError('Please select country and service');
            return;
        }
        
        try {
            this.showLoading('Creating order...');
            const order = await APIService.createOrder(country, service, operator);
            
            if (order.success) {
                this.hideOrderForm();
                this.showSuccess('Order created successfully!');
                this.showOrderModal(order.data);
                this.loadActiveOrders();
            }
        } catch (error) {
            this.showError('Failed to create order');
        } finally {
            this.hideLoading();
        }
    }
    
    // Process deposit
    static async processDeposit() {
        const amount = document.getElementById('depositAmount').value;
        const method = document.getElementById('paymentMethod').value;
        
        if (!amount || amount < 1000) {
            this.showError('Minimum deposit is Rp1,000');
            return;
        }
        
        try {
            this.showLoading('Processing deposit...');
            const deposit = await APIService.createDeposit(amount, method);
            
            if (deposit.success) {
                this.showSuccess('Deposit created! Check your payment app.');
                // You can redirect to payment page or show QR code
                console.log('Deposit ID:', deposit.data.id);
            }
        } catch (error) {
            this.showError('Failed to process deposit');
        } finally {
            this.hideLoading();
        }
    }
    
    // Show order modal
    static showOrderModal(order) {
        const modal = document.getElementById('orderModal');
        const body = document.getElementById('orderModalBody');
        
        body.innerHTML = `
            <div class="order-details">
                <p><strong>Order ID:</strong> ${order.order_id}</p>
                <p><strong>Phone Number:</strong> ${order.phone_number}</p>
                <p><strong>Service:</strong> ${order.service}</p>
                <p><strong>Country:</strong> ${order.country}</p>
                <p><strong>Price:</strong> ${order.price_formated}</p>
                <p><strong>Expires in:</strong> ${order.expires_in_minute} minutes</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="UI.checkOrderStatus('${order.order_id}')">
                        <i class="fas fa-sync"></i> Check Status
                    </button>
                    <button class="btn-success" onclick="UI.copyNumber('${order.phone_number}')">
                        <i class="fas fa-copy"></i> Copy Number
                    </button>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
        
        // Close modal on X click
        modal.querySelector('.modal-close').onclick = () => {
            modal.style.display = 'none';
        };
        
        // Close modal on outside click
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        };
    }
    
    // Check order status
    static async checkOrderStatus(orderId) {
        try {
            const status = await APIService.getOrderStatus(orderId);
            if (status.success) {
                this.showInfo(`Status: ${status.data.status}`);
            }
        } catch (error) {
            this.showError('Failed to check status');
        }
    }
    
    // Copy phone number
    static copyNumber(number) {
        navigator.clipboard.writeText(number.replace(/\s+/g, ''));
        this.showSuccess('Phone number copied!');
    }
    
    // Filter services
    static filterServices(query) {
        const cards = document.querySelectorAll('.service-card');
        const searchTerm = query.toLowerCase();
        
        cards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Select country for ordering
    static selectCountry(code, name) {
        const select = document.getElementById('orderCountry');
        for (let option of select.options) {
            if (option.value === code) {
                select.value = code;
                break;
            }
        }
        this.showSection('orders');
        this.showOrderForm();
        this.showSuccess(`Selected: ${name}`);
    }
    
    // Order service directly
    static async orderService(serviceCode) {
        this.showSection('orders');
        await this.showOrderForm();
        document.getElementById('orderService').value = serviceCode;
    }
    
    // Theme management
    static setupTheme() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    static toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
    
    // Utility functions
    static showEmptyState(containerId, message) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>${message}</p>
                </div>
            `;
        }
    }
    
    static showLoading(message = 'Loading...') {
        Toastify({
            text: message,
            duration: -1,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
    }
    
    static hideLoading() {
        // Toastify doesn't have a built-in hide method
        // In production, you might want to use a different loading indicator
        document.querySelectorAll('.toastify').forEach(toast => {
            toast.style.display = 'none';
        });
    }
    
    static showSuccess(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        }).showToast();
    }
    
    static showError(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #ff416c, #ff4b2b)",
        }).showToast();
    }
    
    static showInfo(message) {
        Toastify({
            text: message,
            duration: 3000,
            gravity: "top",
            position: "right",
            backgroundColor: "linear-gradient(to right, #2193b0, #6dd5ed)",
        }).showToast();
    }
}
