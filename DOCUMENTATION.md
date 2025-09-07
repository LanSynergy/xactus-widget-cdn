# Xactus Chat Widget - Advanced Configuration Guide

## 📋 Table of Contents

1. [Basic Setup](#basic-setup)
2. [Advanced Configuration](#advanced-configuration)
3. [n8n Workflow Integration](#n8n-workflow-integration)
4. [Customization Examples](#customization-examples)
5. [Troubleshooting](#troubleshooting)
6. [Best Practices](#best-practices)

## 🚀 Basic Setup

### Step 1: Create n8n Webhook
1. In your n8n workflow, add a **Webhook** node
2. Set the method to `POST`
3. Copy the webhook URL

### Step 2: Add Widget to Your Website
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Chat Widget Configuration -->
    <script>
        window.FiratChatConfig = {
            webhook: {
                url: 'https://your-n8n-instance.com/webhook/your-webhook-id',
                route: 'general'
            },
            branding: {
                logo: 'https://your-website.com/logo.png',
                name: 'Your Company',
                welcomeText: 'Hi 👋, how can we help?',
                responseTimeText: 'We typically respond right away'
            },
            style: {
                primaryColor: '#667eea',
                secondaryColor: '#764ba2',
                position: 'right',
                backgroundColor: '#ffffff',
                fontColor: '#333333'
            }
        };
    </script>
    <script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn/widget.js"></script>
</body>
</html>
```

## ⚙️ Advanced Configuration

### Complete Configuration Object
```javascript
window.FiratChatConfig = {
    // Webhook configuration
    webhook: {
        url: 'https://your-n8n-instance.com/webhook/chat',
        route: 'general' // Used for routing in n8n workflows
    },
    
    // Branding and content
    branding: {
        logo: 'https://example.com/logo.png',
        name: 'Your Company',
        welcomeText: 'Hi 👋, how can we help?',
        responseTimeText: 'We typically respond right away'
    },
    
    // Visual styling
    style: {
        primaryColor: '#667eea',        // Main brand color
        secondaryColor: '#764ba2',      // Secondary color for gradients
        position: 'right',              // 'left' or 'right'
        backgroundColor: '#ffffff',     // Chat background
        fontColor: '#333333'           // Text color
    },
    
    // Behavior settings
    behavior: {
        autoOpen: false,               // Auto-open on page load
        showNotifications: true,       // Show notification badges
        persistSession: true,          // Save sessions in localStorage
        timeout: 30000                // Request timeout (ms)
    }
};
```

## 🔌 n8n Workflow Integration

### Basic Workflow Structure
```
Webhook → Function → HTTP Request → Respond to Webhook
```

### Sample n8n Function Node
```javascript
// Extract data from webhook
const action = $input.item.json.action;
const sessionId = $input.item.json.sessionId;
const route = $input.item.json.route;
const message = $input.item.json.chatInput;
const metadata = $input.item.json.metadata;

if (action === 'loadPreviousSession') {
    // Initialize new session
    return {
        output: "Hello! I'm here to help. What can I do for you today?"
    };
} else if (action === 'sendMessage') {
    // Process user message
    // You can add your AI logic here or call external APIs
    
    // Simple echo response (replace with your logic)
    return {
        output: `I received your message: "${message}". How else can I help?`
    };
}

return {
    output: "I'm sorry, I didn't understand that request."
};
```

### Advanced n8n Workflow with AI Integration
```
Webhook → Function → OpenAI/Anthropic API → Function → Respond to Webhook
```

### OpenAI Integration Example
```javascript
// In the pre-AI function node
const userMessage = $input.item.json.chatInput;
const sessionId = $input.item.json.sessionId;

return {
    messages: [
        {
            role: "system",
            content: "You are a helpful customer support assistant."
        },
        {
            role: "user", 
            content: userMessage
        }
    ],
    sessionId: sessionId
};

// In the post-AI function node
const aiResponse = $input.item.json.choices[0].message.content;
const sessionId = $input.item.json.sessionId;

return {
    output: aiResponse,
    sessionId: sessionId
};
```

## 🎨 Customization Examples

### E-commerce Theme
```javascript
window.FiratChatConfig = {
    webhook: {
        url: 'https://your-n8n.com/webhook/ecommerce-support',
        route: 'sales'
    },
    branding: {
        logo: 'https://your-store.com/logo.png',
        name: 'ShopSupport',
        welcomeText: 'Need help with your order? 🛍️',
        responseTimeText: 'Our sales team responds in under 5 minutes'
    },
    style: {
        primaryColor: '#f59e0b',
        secondaryColor: '#d97706',
        position: 'right',
        backgroundColor: '#fffbeb',
        fontColor: '#92400e'
    },
    behavior: {
        autoOpen: false,
        showNotifications: true
    }
};
```

### SaaS Platform Theme
```javascript
window.FiratChatConfig = {
    webhook: {
        url: 'https://your-n8n.com/webhook/saas-support',
        route: 'technical'
    },
    branding: {
        logo: 'https://your-saas.com/icon.svg',
        name: 'TechSupport',
        welcomeText: 'Technical questions? We\'re here! 🚀',
        responseTimeText: 'Average response time: 2 minutes'
    },
    style: {
        primaryColor: '#3b82f6',
        secondaryColor: '#1d4ed8',
        position: 'right',
        backgroundColor: '#ffffff',
        fontColor: '#1e293b'
    }
};
```

### Healthcare Theme
```javascript
window.FiratChatConfig = {
    webhook: {
        url: 'https://your-n8n.com/webhook/health-support',
        route: 'patient'
    },
    branding: {
        logo: 'https://your-clinic.com/logo.png',
        name: 'HealthAssist',
        welcomeText: 'How can we help with your health questions? 🏥',
        responseTimeText: 'Our medical team will respond shortly'
    },
    style: {
        primaryColor: '#059669',
        secondaryColor: '#047857',
        position: 'right',
        backgroundColor: '#f0fdf4',
        fontColor: '#064e3b'
    }
};
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Widget Not Appearing
**Problem**: The chat widget doesn't show up on the page.

**Solutions**:
- Check browser console for JavaScript errors
- Verify the script URL is correct
- Ensure configuration is defined before the script loads
- Check for conflicting CSS that might hide the widget

```javascript
// Debug: Check if widget loaded
console.log('Widget loaded:', window.FiratChatWidgetInitialized);
console.log('Config:', window.FiratChatConfig);
```

#### 2. Messages Not Sending
**Problem**: Messages appear in the chat but don't reach n8n.

**Solutions**:
- Verify webhook URL is correct and accessible
- Check CORS settings on your n8n instance
- Ensure webhook is active in n8n
- Check network tab in browser dev tools

```javascript
// Debug webhook
fetch('YOUR_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        action: 'test',
        sessionId: 'test-123',
        route: 'general'
    })
}).then(r => r.json()).then(console.log);
```

#### 3. Styling Issues
**Problem**: Widget colors or positioning don't match configuration.

**Solutions**:
- Check for CSS conflicts with your website
- Use browser dev tools to inspect element styles
- Add `!important` to your custom CSS if needed

```css
/* Override widget styles if needed */
.xactus -chat-widget {
    --xactus -primary: #your-color !important;
}
```

#### 4. Mobile Display Issues
**Problem**: Widget doesn't display correctly on mobile devices.

**Solutions**:
- Ensure viewport meta tag is present
- Check for mobile-specific CSS conflicts
- Test on actual devices, not just browser dev tools

### Error Messages

#### "Failed to start conversation"
- Check webhook URL and n8n instance availability
- Verify CORS configuration
- Check n8n workflow is active

#### "Message failed to send"
- Network connectivity issues
- Webhook timeout (increase timeout in config)
- n8n workflow errors

#### "Invalid response format"
- n8n workflow must return `{ "output": "message" }`
- Check for empty or malformed responses

## 🏆 Best Practices

### 1. Performance Optimization
```javascript
// Use CDN for better performance
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn@main/widget.js"></script>

// Or specific version for cache stability
<script src="https://cdn.jsdelivr.net/gh/LanSynergy/xactus-widget-cdn@v1.0.0/widget.js"></script>
```

### 2. Security Considerations
- Use HTTPS for all webhook URLs
- Implement rate limiting in n8n
- Validate all inputs in your n8n workflow
- Don't expose sensitive data in client-side configuration

### 3. User Experience
```javascript
window.FiratChatConfig = {
    behavior: {
        autoOpen: false,           // Don't auto-open unless user initiated
        persistSession: true,      // Remember conversation
        timeout: 15000            // Reasonable timeout for good UX
    }
};
```

### 4. Accessibility
- Ensure sufficient color contrast
- Test with screen readers
- Provide alternative contact methods

### 5. Analytics Integration
```javascript
// Track widget usage
window.FiratChatWidget.onOpen = () => {
    gtag('event', 'chat_opened', {
        event_category: 'engagement'
    });
};
```

## 📊 Monitoring and Analytics

### n8n Workflow Logging
```javascript
// Add to your n8n function node
const logData = {
    timestamp: new Date().toISOString(),
    sessionId: $input.item.json.sessionId,
    action: $input.item.json.action,
    userAgent: $input.item.json.metadata?.userAgent,
    message: $input.item.json.chatInput
};

// Store in database or send to analytics service
console.log('Chat interaction:', logData);
```

### Performance Monitoring
```javascript
// Monitor widget performance
window.addEventListener('load', () => {
    setTimeout(() => {
        if (!window.FiratChatWidgetInitialized) {
            console.error('Chat widget failed to initialize');
            // Send error to monitoring service
        }
    }, 5000);
});
```

---

For more advanced use cases or custom implementations, please refer to the main [README.md](README.md) or open an issue in the repository.