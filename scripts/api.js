// scripts/api.js - Kode yang Diperbaiki
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
        const params = serviceId ? { service_id: serviceId } : null;
        return await Config.request('v2/countries', 'GET', params);
    }
    
    // Create new order
    static async createOrder(countryCode, serviceId, operator = 'any') {
        const params = {
            country_code: countryCode,
            service_id: serviceId,
            operator: operator
        };
        return await Config.request('v1/orders', 'POST', params);
    }
    
    // Get order status
    static async getOrderStatus(orderId) {
        return await Config.request('v1/orders/get_status', 'GET', { order_id: orderId });
    }
    
    // Update order status
    static async updateOrderStatus(orderId, status) {
        return await Config.request('v1/orders/set_status', 'GET', { 
            order_id: orderId, 
            status: status 
        });
    }
    
    // Create deposit
    static async createDeposit(amount, paymentMethod = 'qris') {
        return await Config.request('v2/deposit/create', 'GET', { 
            amount: amount, 
            payment_id: paymentMethod 
        });
    }
    
    // Get operators (endpoint ini tidak ada di dokumentasi, jadi kita skip)
    static async getOperators() {
        // Fallback jika endpoint tidak ada
        return {
            status: true,
            data: [
                { id: 1, name: 'any' },
                { id: 2, name: 'Telkomsel' },
                { id: 3, name: 'XL' },
                { id: 4, name: 'Indosat' },
                { id: 5, name: '3' },
                { id: 6, name: 'Smartfren' }
            ]
        };
    }
}