# Xactus Chat Widget

A modern, professional chat widget designed for n8n webhook integrations. Built with vanilla JavaScript, featuring smooth animations, responsive design, lead capture forms, gradient support, and extensive customization options.

![Chat Widget Preview](https://via.placeholder.com/600x400/667eea/ffffff?text=Chat+Widget+Preview)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- 📋 **Lead Capture Forms** - Collect visitor information before chat starts
- 🌈 **Gradient Support** - Choose between solid colors or beautiful gradients
- 📱 **Mobile First** - Fully responsive design optimized for all devices
- ⚙️ **Easy Configuration** - Simple JavaScript configuration object
- 🔌 **n8n Integration** - Built specifically for n8n webhook workflows
- 🎯 **Accessibility** - WCAG compliant with proper ARIA labels
- 🌙 **Dark Mode** - Automatic dark mode support
- 💾 **Session Persistence** - Maintains chat sessions and lead data across page reloads
- 🔄 **Auto Retry** - Automatic retry mechanism for failed messages
- ⚡ **Performance** - Lightweight and optimized for fast loadingget

A modern, professional chat widget designed for n8n webhook integrations. Built with vanilla JavaScript, featuring smooth animations, responsive design, and extensive customization options.

![Chat Widget Preview](https://via.placeholder.com/600x400/667eea/ffffff?text=Chat+Widget+Preview)

## ✨ Features

- 🎨 **Modern Design** - Clean, professional interface with smooth animations
- 📱 **Mobile First** - Fully responsive design optimized for all devices
- ⚙️ **Easy Configuration** - Simple JavaScript configuration object
- 🔌 **n8n Integration** - Built specifically for n8n webhook workflows
- 🎯 **Accessibility** - WCAG compliant with proper ARIA labels
- 🌙 **Dark Mode** - Automatic dark mode support
- 💾 **Session Persistence** - Maintains chat sessions across page reloads
- 🔄 **Auto Retry** - Automatic retry mechanism for failed messages
- ⚡ **Performance** - Lightweight and optimized for fast loading

## 🚀 Quick Start

### CDN Integration

Add this script to your website:

```html
<!-- Chat Widget Configuration -->
<script>
    // You can use either FiratChatConfig or ChatWidgetConfig
    window.FiratChatConfig = {
        webhook: {
            url: 'YOUR_N8N_WEBHOOK_URL',
            route: 'general'
        },
        branding: {
            logoUrl: 'YOUR_LOGO_URL',
            businessName: 'Your Company',
            welcomeText: 'Hi 👋, how can we help?',
            responseTimeText: 'We typically respond right away',
            poweredBy: {
                enabled: false, // Set to true to show powered by footer
                text: 'Powered by Your Company',
                url: 'https://yourcompany.com',
                target: '_blank'
            }
        },
        style: {
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            useGradient: false, // Set to true for gradient backgrounds
            position: 'right', // 'left' or 'right'
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        },
        leadCapture: {
            enabled: true, // Enable to collect visitor information before chat
            title: 'Let us know how to reach you',
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
            },
            phoneField: {
                enabled: false,
                label: 'Phone',
                placeholder: 'Your phone number',
                required: false
            },
            companyField: {
                enabled: false,
                label: 'Company',
                placeholder: 'Your company name',
                required: false
            },
            buttonText: 'Continue to Chat'
        },
        behavior: {
            autoOpen: false,
            showNotifications: true,
            persistSession: true,
            skipLeadCaptureIfKnown: true
        }
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn/widget.js"></script>
```

### Configuration Steps

1. **Replace `YOUR_N8N_WEBHOOK_URL`** with your actual n8n webhook endpoint
2. **Replace `YOUR_LOGO_URL`** with your company logo URL (optional)
3. **Customize colors, branding, and lead capture** to match your brand
4. **Test the widget** in different configurations

### CDN Usage Options

You can use the widget from different CDNs:

**JSDelivr CDN (Recommended - Fast Global CDN):**
```html
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn/widget.js"></script>
```

**GitHub Pages (Alternative):**
```html
<script src="https://lansynergy.github.io/xactus-widget-cdn/widget.js"></script>
```

**Version-Specific JSDelivr:**
```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn@main/widget.js"></script>

<!-- Specific version tag -->
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn@v1.0.0/widget.js"></script>
```

### Self-Hosted

1. Download `widget.js`
2. Host it on your server
3. Include the configuration and script tags as shown above

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
    logoUrl: 'https://example.com/logo.png', // Your company logo
    businessName: 'Your Company', // Company name displayed in header
    welcomeText: 'Hi 👋, how can we help?', // Welcome message
    responseTimeText: 'We typically respond right away', // Response time message
    poweredBy: {
        enabled: true, // Show powered by footer
        text: 'Powered by Your Company', // Footer text
        url: 'https://yourcompany.com', // Optional link URL
        target: '_blank' // '_blank' for new tab, '_self' for same tab
    }
}
```

### Style Customization
```javascript
style: {
    primaryColor: '#667eea', // Primary brand color
    secondaryColor: '#764ba2', // Secondary brand color (for gradients/hover)
    useGradient: false, // Set to true to enable gradient backgrounds
    position: 'right', // Widget position: 'left' or 'right'
    backgroundColor: '#ffffff', // Chat background color
    fontColor: '#333333' // Text color
}
```

### Lead Capture Configuration
```javascript
leadCapture: {
    enabled: false, // Enable lead capture form
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
    },
    phoneField: {
        enabled: false,
        label: 'Phone',
        placeholder: 'Your phone number',
        required: false
    },
    companyField: {
        enabled: false,
        label: 'Company',
        placeholder: 'Your company name',
        required: false
    },
    buttonText: 'Continue to Chat'
}
```

### Behavior Settings
```javascript
behavior: {
    autoOpen: false, // Auto-open chat on page load
    showNotifications: true, // Show notification badges
    persistSession: true, // Maintain sessions across page reloads
    skipLeadCaptureIfKnown: true, // Skip form if lead data already exists
    timeout: 30000 // Request timeout in milliseconds
}
```

## 🔌 n8n Webhook Setup

Your n8n webhook should expect the following payload formats:

### Initialize Session
```json
{
    "action": "loadPreviousSession",
    "sessionId": "uuid-string",
    "route": "general",
    "metadata": {
        "userId": "user-uuid",
        "timestamp": "2024-01-01T00:00:00.000Z",
        "userAgent": "browser-info"
    }
}
```

### Send Message
```json
{
    "action": "sendMessage",
    "sessionId": "uuid-string",
    "route": "general",
    "chatInput": "User message text",
    "metadata": {
        "userId": "user-uuid",
        "timestamp": "2024-01-01T00:00:00.000Z"
    }
}
```

### Expected Response
Your webhook should return:
```json
{
    "output": "Bot response message"
}
```

Or as an array:
```json
[{
    "output": "Bot response message"
}]
```

## 🎨 Customization Examples

### Corporate Theme
```javascript
window.FiratChatConfig = {
    style: {
        primaryColor: '#1f2937',
        secondaryColor: '#374151',
        backgroundColor: '#ffffff',
        fontColor: '#111827'
    },
    branding: {
        name: 'Corporate Support',
        welcomeText: 'Welcome to our support center',
        responseTimeText: 'Our team will respond within 2 hours'
    }
};
```

### Startup Theme
```javascript
window.FiratChatConfig = {
    style: {
        primaryColor: '#10b981',
        secondaryColor: '#059669',
        backgroundColor: '#ffffff',
        fontColor: '#065f46'
    },
    branding: {
        name: 'Startup Support',
        welcomeText: 'Hey there! 👋',
        responseTimeText: 'We\'re online and ready to help!'
    }
};
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📱 Mobile Optimization

The widget automatically adapts to mobile devices with:
- Touch-optimized interactions
- Responsive sizing
- Mobile-specific CSS optimizations
- Reduced motion support for accessibility

## ♿ Accessibility Features

- WCAG 2.1 AA compliant
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader optimization
- High contrast mode support
- Reduced motion preferences

## 🔧 API Methods

The widget exposes global methods for programmatic control:

```javascript
// Open the chat widget
window.FiratChatWidget.open();

// Close the chat widget
window.FiratChatWidget.close();

// Toggle the chat widget
window.FiratChatWidget.toggle();
```

## 🚀 Deployment to GitHub Pages

1. Fork this repository
2. Enable GitHub Pages in repository settings
3. Your widget will be available at: `https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn/widget.js`
4. Update your website integration to use your GitHub Pages URL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@yourcompany.com
- 💬 Discord: [Your Discord Server](https://discord.gg/yourserver)
- 📖 Documentation: [Full Documentation](https://yourcompany.com/docs)

## 🙏 Acknowledgments

- Built with modern web standards
- Inspired by leading chat widget solutions
- Optimized for n8n workflow integrations

---

Made with ❤️ for the n8n community