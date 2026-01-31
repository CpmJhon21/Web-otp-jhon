// Konfigurasi API
class Config {
    static BASE_URL = 'https://www.rumahotp.com/api';
    
    static getApiKey() {
        // Untuk Vercel/Replit: Gunakan environment variable
        if (typeof process !== 'undefined' && process.env) {
            return process.env.API_KEY;
        }
        // Untuk GitHub Pages: Gunakan variable dari window
        return window.API_KEY || 'otp_JrwkBqJXMGzWVSPE';
    }
    
    static getHeaders() {
        return {
            'x-apikey': this.getApiKey(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }
    
    static async request(endpoint, method = 'GET', data = null) {
        try {
            const options = {
                method: method,
                url: `${this.BASE_URL}/${endpoint}`,
                headers: this.getHeaders()
            };
            
            if (data && method !== 'GET') {
                options.data = data;
            } else if (data) {
                // Untuk GET request dengan query params
                options.params = data;
            }
            
            const response = await axios(options);
            return response.data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}
