# Web-otp-jhon
# RumaOTP Web Dashboard

Modern web dashboard for RumaOTP SMS verification service.

## Features

- 📱 Responsive design for desktop and mobile
- 🎨 Modern UI with dark/light theme
- 🔐 Secure API key management via environment variables
- ⚡ Fast loading with async operations
- 📊 Real-time balance and order tracking
- 💳 Deposit system with QRIS support
- 🌍 Multi-country service availability

## Deployment

### Option 1: Vercel (Recommended)

1. Fork this repository
2. Create a new project on Vercel
3. Import your GitHub repository
4. Add environment variable:
   - Name: `API_KEY`
   - Value: Your RumaOTP API key
5. Deploy!

### Option 2: Replit

1. Create new HTML/CSS/JS Repl
2. Upload all files
3. Set environment variable:
   - Go to Secrets tab
   - Add: `API_KEY = your_api_key_here`
4. Run the project

### Option 3: GitHub Pages

1. Fork this repository
2. Go to Settings > Pages
3. Set source to main branch
4. Edit `scripts/config.js`:
   - Change `window.API_KEY` to your actual API key
5. Save and deploy

## Environment Variables

Create a `.env` file in root directory:

```env
API_KEY=your_api_key_here
