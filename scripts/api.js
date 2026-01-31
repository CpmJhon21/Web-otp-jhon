class APIService {
    // Get user balance
    static async getBalance() {
        return await Config.request('v1/user/balance');
    }
    
    // Get all services
    static async getServices() {
        return await Config.request('v2/services');
    }
    
    // Get countries for a specific service
    static async getCountries(serviceId = null) {
        const endpoint = serviceId ? 
            `v2/countries?service_id=${serviceId}` : 
            'v2/countries';
        return await Config.request(endpoint);
    }
    
    // Create new order
    static async createOrder(countryCode, serviceId, operator = 'any') {
        const data = {
            country_code: countryCode,
            service_id: serviceId,
            operator: operator
        };
        return await Config.request('v1/orders', 'POST', data);
    }
    
    // Get order status
    static async getOrderStatus(orderId) {
        return await Config.request(`v1/orders/get_status?order_id=${orderId}`);
    }
    
    // Update order status
    static async updateOrderStatus(orderId, status) {
        return await Config.request(`v1/orders/set_status?order_id=${orderId}&status=${status}`);
    }
    
    // Create deposit
    static async createDeposit(amount, paymentMethod = 'qris') {
        return await Config.request(`v2/deposit/create?amount=${amount}&payment_id=${paymentMethod}`);
    }
    
    // Get deposit status
    static async getDepositStatus(depositId) {
        return await Config.request(`v2/deposit/status?id=${depositId}`);
    }
    
    // Get operators
    static async getOperators() {
        return await Config.request('v2/operators');
    }
}
