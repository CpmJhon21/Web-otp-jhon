// scripts/config.js - Kode yang Diperbaiki
class Config {
    static BASE_URL = 'https://www.rumahotp.com/api';
    
    static getApiKey() {
        // Untuk development/testing - langsung return API key
        // Jika ingin deploy, ganti dengan API key Anda
        return 'otp_zyUwvkagNwjgaeiq'; // ← GANTI INI!
    }
    
    static getHeaders() {
        return {
            'x-apikey': this.getApiKey(),
            'Accept': 'application/json'
        };
    }
    
    static async request(endpoint, method = 'GET', params = null) {
        try {
            const url = endpoint.startsWith('http') ? endpoint : `${this.BASE_URL}/${endpoint}`;
            
            const config = {
                method: method,
                url: url,
                headers: this.getHeaders()
            };
            
            if (params) {
                if (method === 'GET') {
                    config.params = params;
                } else {
                    config.data = params;
                }
            }
            
            console.log('API Request:', config);
            const response = await axios(config);
            console.log('API Response:', response.data);
            return response.data;
        } catch (error) {
            console.error('API Error Details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            // Return error object that UI can handle
            return {
                success: false,
                error: error.message,
                status: error.response?.status
            };
        }
    }
}