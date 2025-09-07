# Xactus Chat Widget

A modern, professional chat widget that integrates seamlessly with n8n workflows. Features a three-stage user experience: welcome screen → lead capture → chat interface.

## ✨ Features

- 🎨 **Modern Design** - Clean, professional interface with Geist Sans typography
- 🔄 **Three-Stage Flow** - Welcome screen → Lead capture → Chat interface
- 🎯 **Lead Capture** - Collect visitor information before chat (name, email)
- 🤖 **AI Personalization** - Lead data is sent to your AI for personalized responses
- 🎨 **Customizable Branding** - Logo, colors, messaging, and positioning
- 📱 **Responsive Design** - Works perfectly on desktop and mobile
- ⚡ **Fast & Lightweight** - Optimized for performance
- 🔗 **n8n Integration** - Direct webhook integration with session management

## 🚀 Quick Start

Add this script to your website:

```html
<!-- Chat Widget Configuration -->
<script>
    window.ChatWidgetConfig = {
        webhook: {
            url: 'YOUR_N8N_WEBHOOK_URL',
            route: 'general'
        },
        branding: {
            logo: 'INSERT_LOGO_URL',
            name: 'INSERT_COMPANY_NAME',
            welcomeText: 'Get instant answers to your questions!',
            responseTimeText: 'Click the button below to start chatting'
        },
        leadCapture: {
            enabled: true, // Enable lead capture form
            title: 'Please enter your details to start chatting',
            nameField: {
                enabled: true,
                label: 'Name',
                placeholder: 'Your name',
                required: true
            },
            emailField: {
                enabled: true,
                label: 'Email',
                placeholder: 'Your email address',
                required: true
            }
        },
        style: {
            primaryColor: '#10b981',
            secondaryColor: '#059669',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#1f2937'
        }
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn/chat-widget.js"></script>
```

### Configuration Steps

1. **Replace `YOUR_N8N_WEBHOOK_URL`** with your actual n8n webhook endpoint
2. **Replace `INSERT_LOGO_URL`** with your company logo URL (optional)
3. **Replace `INSERT_COMPANY_NAME`** with your business name
4. **Customize colors and branding** to match your brand
5. **Configure lead capture fields** as needed

## ⚙️ Configuration Options

### Webhook Settings
```javascript
webhook: {
    url: 'https://your-n8n-instance.com/webhook/chat', // Required: Your n8n webhook URL
    route: 'general' // Optional: Route parameter for n8n workflow
}
```

### Branding Options
```javascript
branding: {
    logo: 'https://example.com/logo.png', // Your company logo
    name: 'Your Company', // Company name displayed in header
    welcomeText: 'Hi 👋, how can we help?', // Welcome message
    responseTimeText: 'We typically respond right away', // Response time message
    poweredBy: {
        text: 'Powered by Your Company', // Footer text
        link: 'https://yourcompany.com' // Optional link URL
    }
}
```

### Lead Capture Configuration
```javascript
leadCapture: {
    enabled: true, // Enable/disable lead capture form
    title: 'Please enter your details to start chatting', // Form title
    nameField: {
        enabled: true, // Show name field
        label: 'Name', // Field label
        placeholder: 'Your name', // Placeholder text
        required: true // Make field required
    },
    emailField: {
        enabled: true, // Show email field
        label: 'Email', // Field label
        placeholder: 'Your email address', // Placeholder text
        required: true // Make field required
    }
}
```

**Note:** Lead capture data (name, email) is automatically included in all messages sent to your AI, allowing for personalized responses.

### Style Customization
```javascript
style: {
    primaryColor: '#667eea', // Primary brand color
    secondaryColor: '#764ba2', // Secondary brand color (for gradients/hover)
    position: 'right', // Widget position: 'left' or 'right'
    backgroundColor: '#ffffff', // Chat background color
    fontColor: '#333333' // Text color
}
```

## 🔄 User Experience Flow

1. **Welcome Screen** - Visitor sees welcome message and "Send us a message" button
2. **Lead Capture** - Visitor enters name and email (configurable fields)
3. **Chat Interface** - Visitor can chat with your AI assistant

The lead data is automatically sent to your n8n workflow with every message, enabling personalized AI responses.

## 📡 CDN Usage Options

**JSDelivr CDN (Recommended - Fast Global CDN):**
```html
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn/chat-widget.js"></script>
```

**GitHub Pages (Alternative):**
```html
<script src="https://lansynergy.github.io/xactus-widget-cdn/chat-widget.js"></script>
```

**Version-Specific JSDelivr:**
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn@main/chat-widget.js"></script>

<!-- Specific version tag -->
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn@v1.0.0/chat-widget.js"></script>
```

## 🛠️ Self-Hosted

1. Download `chat-widget.js`
2. Host it on your server
3. Include the configuration and script tags as shown above

## 📊 Data Structure

### Message Payload to n8n
```json
{
    "action": "sendMessage",
    "sessionId": "uuid-string",
    "route": "general",
    "chatInput": "User message text",
    "metadata": {
        "userId": "",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

### Session Initialization
```json
{
    "action": "loadPreviousSession",
    "sessionId": "uuid-string",
    "route": "general",
    "metadata": {
        "userId": "",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.