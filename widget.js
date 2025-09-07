/**
 * Xactus Chat Widget
 * Modern, professional chat widget for n8n integrations
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // Prevent multiple initializations
    if (window.FiratChatWidgetInitialized) return;
    window.FiratChatWidgetInitialized = true;

    // Modern CSS with enhanced styling
    const styles = `
        .xactus -chat-widget {
            --primary-color: var(--xactus -primary, #667eea);
            --secondary-color: var(--xactus -secondary, #764ba2);
            --background-color: var(--xactus -bg, #ffffff);
            --text-color: var(--xactus -text, #333333);
            --shadow-color: rgba(102, 126, 234, 0.15);
            --border-color: rgba(102, 126, 234, 0.1);
            --success-color: #10b981;
            --error-color: #ef4444;
            
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            font-size: 14px;
            line-height: 1.5;
            color: var(--text-color);
        }

        .xactus -chat-widget * {
            box-sizing: border-box;
        }

        .xactus -chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            width: 380px;
            max-width: calc(100vw - 40px);
            height: 600px;
            max-height: calc(100vh - 100px);
            background: var(--background-color);
            border-radius: 16px;
            box-shadow: 0 10px 40px var(--shadow-color), 0 4px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--border-color);
            overflow: hidden;
            transform: translateY(100vh);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
        }

        .xactus -chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .xactus -chat-widget .chat-container.open {
            transform: translateY(0);
            opacity: 1;
        }

        .xactus -chat-widget .chat-header {
            background: var(--primary-color);
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            position: relative;
            border-radius: 16px 16px 0 0;
        }

        .xactus -chat-widget .chat-header img {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            padding: 4px;
        }

        .xactus -chat-widget .chat-header .brand-info h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
        }

        .xactus -chat-widget .chat-header .brand-info p {
            margin: 0;
            font-size: 12px;
            opacity: 0.8;
        }

        .xactus -chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            font-size: 18px;
            width: 32px;
            height: 32px;
        }

        .xactus -chat-widget .close-button:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-50%) scale(1.1);
        }

        .xactus -chat-widget .welcome-screen {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 40px 30px;
            text-align: center;
            flex: 1;
            background: rgba(102, 126, 234, 0.02);
        }

        .xactus -chat-widget .welcome-screen h2 {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-color);
            margin: 0 0 12px 0;
            line-height: 1.3;
        }

        .xactus -chat-widget .welcome-screen p {
            color: var(--text-color);
            opacity: 0.7;
            margin: 0 0 30px 0;
            font-size: 14px;
        }

        .xactus -chat-widget .start-chat-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 16px 32px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
        }

        .xactus -chat-widget .start-chat-btn:hover {
            background: var(--secondary-color);
            transform: translateY(-1px);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .xactus -chat-widget .start-chat-btn:active {
            transform: translateY(0);
        }

        .xactus -chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .xactus -chat-widget .chat-interface.active {
            display: flex;
        }

        .xactus -chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--background-color);
            scrollbar-width: thin;
            scrollbar-color: var(--border-color) transparent;
        }

        .xactus -chat-widget .chat-messages::-webkit-scrollbar {
            width: 6px;
        }

        .xactus -chat-widget .chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .xactus -chat-widget .chat-messages::-webkit-scrollbar-thumb {
            background: var(--border-color);
            border-radius: 3px;
        }

        .xactus -chat-widget .chat-message {
            margin: 12px 0;
            padding: 14px 18px;
            border-radius: 18px;
            max-width: 85%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
            position: relative;
            animation: messageSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes messageSlideIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .xactus -chat-widget .chat-message.user {
            background: var(--primary-color);
            color: white;
            align-self: flex-end;
            margin-left: auto;
            border-bottom-right-radius: 6px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        }

        .xactus -chat-widget .chat-message.bot {
            background: #f8f9fa;
            border: 1px solid var(--border-color);
            color: var(--text-color);
            align-self: flex-start;
            margin-right: auto;
            border-bottom-left-radius: 6px;
            box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
        }

        .xactus -chat-widget .typing-indicator {
            display: flex;
            align-items: center;
            gap: 4px;
            padding: 14px 18px;
            background: #f8f9fa;
            border: 1px solid var(--border-color);
            border-radius: 18px;
            border-bottom-left-radius: 6px;
            margin: 12px 0;
            max-width: 85%;
            align-self: flex-start;
        }

        .xactus -chat-widget .typing-dot {
            width: 6px;
            height: 6px;
            background: var(--primary-color);
            border-radius: 50%;
            animation: typingBounce 1.4s infinite ease-in-out;
        }

        .xactus -chat-widget .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .xactus -chat-widget .typing-dot:nth-child(2) { animation-delay: -0.16s; }

        @keyframes typingBounce {
            0%, 80%, 100% {
                transform: scale(0.8);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }

        .xactus -chat-widget .chat-input {
            padding: 20px;
            background: var(--background-color);
            border-top: 1px solid var(--border-color);
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }

        .xactus -chat-widget .input-wrapper {
            flex: 1;
            position: relative;
        }

        .xactus -chat-widget .chat-input textarea {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            background: var(--background-color);
            color: var(--text-color);
            resize: none;
            font-family: inherit;
            font-size: 14px;
            line-height: 1.4;
            min-height: 20px;
            max-height: 120px;
            transition: all 0.2s ease;
            outline: none;
        }

        .xactus -chat-widget .chat-input textarea:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .xactus -chat-widget .chat-input textarea::placeholder {
            color: var(--text-color);
            opacity: 0.5;
        }

        .xactus -chat-widget .send-button {
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 12px;
            padding: 14px 18px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            min-width: 48px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .xactus -chat-widget .send-button:hover:not(:disabled) {
            background: var(--secondary-color);
            transform: translateY(-1px);
            box-shadow: 0 3px 12px rgba(0, 0, 0, 0.15);
        }

        .xactus -chat-widget .send-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        .xactus -chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .xactus -chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .xactus -chat-widget .chat-toggle:hover {
            background: var(--secondary-color);
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .xactus -chat-widget .chat-toggle svg {
            width: 28px;
            height: 28px;
            fill: currentColor;
            transition: transform 0.3s ease;
        }

        .xactus -chat-widget .chat-toggle.open svg {
            transform: rotate(180deg);
        }

        .xactus -chat-widget .notification-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            background: var(--error-color);
            color: white;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            font-size: 11px;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: badgePulse 2s infinite;
        }

        @keyframes badgePulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        .xactus -chat-widget .error-message {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: var(--error-color);
            padding: 12px 16px;
            margin: 12px 0;
            border-radius: 8px;
            font-size: 13px;
            text-align: center;
        }

        .xactus -chat-widget .lead-capture-form {
            padding: 30px;
            text-align: center;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .xactus -chat-widget .lead-capture-form h2 {
            font-size: 20px;
            font-weight: 600;
            color: var(--text-color);
            margin: 0 0 20px 0;
            line-height: 1.4;
        }

        .xactus -chat-widget .form-group {
            margin-bottom: 16px;
            text-align: left;
        }

        .xactus -chat-widget .form-group label {
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-color);
            margin-bottom: 6px;
        }

        .xactus -chat-widget .form-group input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            background: var(--background-color);
            color: var(--text-color);
            font-size: 14px;
            transition: all 0.2s ease;
            outline: none;
            box-sizing: border-box;
        }

        .xactus -chat-widget .form-group input:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
        }

        .xactus -chat-widget .form-group input::placeholder {
            color: var(--text-color);
            opacity: 0.5;
        }

        .xactus -chat-widget .continue-btn {
            width: 100%;
            background: var(--primary-background);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 14px 24px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 10px;
        }

        .xactus -chat-widget .continue-btn:hover:not(:disabled) {
            background: var(--primary-background-hover);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .xactus -chat-widget .continue-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }

        .xactus -chat-widget .form-error {
            color: var(--error-color);
            font-size: 12px;
            margin-top: 4px;
            display: none;
        }

        .xactus -chat-widget .form-group.error input {
            border-color: var(--error-color);
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
        }

        .xactus -chat-widget .form-group.error .form-error {
            display: block;
        }

        /* Mobile optimizations */
        @media (max-width: 480px) {
            .xactus -chat-widget .chat-container {
                width: calc(100vw - 20px);
                height: calc(100vh - 80px);
                bottom: 10px;
                right: 10px;
                border-radius: 12px;
            }
            
            .xactus -chat-widget .chat-container.position-left {
                left: 10px;
            }
            
            .xactus -chat-widget .chat-toggle {
                bottom: 15px;
                right: 15px;
                width: 56px;
                height: 56px;
            }
            
            .xactus -chat-widget .chat-toggle.position-left {
                left: 15px;
            }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
            .xactus -chat-widget * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
            .xactus -chat-widget {
                --border-color: #000000;
                --shadow-color: rgba(0, 0, 0, 0.5);
            }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            .xactus -chat-widget {
                --background-color: var(--xactus -bg, #1a1a1a);
                --text-color: var(--xactus -text, #ffffff);
                --border-color: rgba(255, 255, 255, 0.1);
                --shadow-color: rgba(0, 0, 0, 0.3);
            }
            
            .xactus -chat-widget .chat-message.bot {
                background: #2a2a2a;
                border-color: rgba(255, 255, 255, 0.1);
            }
        }

        /* Powered By Footer */
        .xactus -chat-widget .powered-by {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            background: rgba(0, 0, 0, 0.02);
            font-size: 11px;
            color: #666;
            text-decoration: none;
            transition: all 0.2s ease;
        }

        .xactus -chat-widget .powered-by:hover {
            color: var(--primary-color);
            background: rgba(0, 0, 0, 0.05);
        }

        .xactus -chat-widget .powered-by:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: -2px;
        }

        @media (prefers-color-scheme: dark) {
            .xactus -chat-widget .powered-by {
                border-top-color: rgba(255, 255, 255, 0.1);
                background: rgba(255, 255, 255, 0.05);
                color: #999;
            }
            
            .xactus -chat-widget .powered-by:hover {
                background: rgba(255, 255, 255, 0.1);
            }
        }
    `;

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: 'general'
        },
        branding: {
            logo: '',
            name: 'Chat Support',
            welcomeText: 'Hi 👋, how can we help?',
            responseTimeText: 'We typically respond right away',
            businessName: '',
            logoUrl: '',
            poweredBy: {
                enabled: false,
                text: 'Powered by n8n',
                url: '',
                target: '_blank'
            }
        },
        style: {
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
            useGradient: false, // Set to true to enable gradients
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333',
            headerStyle: 'solid' // 'solid', 'gradient', or 'custom'
        },
        leadCapture: {
            enabled: false,
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
        },
        behavior: {
            autoOpen: false,
            showNotifications: true,
            persistSession: true,
            timeout: 30000,
            skipLeadCaptureIfKnown: true
        }
    };

    // Merge user config with defaults - support both FiratChatConfig and ChatWidgetConfig
    const userConfig = window.ChatWidgetConfig || window.FiratChatConfig;
    const config = userConfig ? 
        Object.assign({}, defaultConfig, {
            webhook: Object.assign({}, defaultConfig.webhook, userConfig.webhook || {}),
            branding: Object.assign({}, defaultConfig.branding, userConfig.branding || {}, {
                poweredBy: Object.assign({}, defaultConfig.branding.poweredBy, userConfig.branding?.poweredBy || {})
            }),
            style: Object.assign({}, defaultConfig.style, userConfig.style || {}),
            leadCapture: Object.assign({}, defaultConfig.leadCapture, 
                userConfig.leadCapture ? {
                    ...defaultConfig.leadCapture,
                    ...userConfig.leadCapture,
                    nameField: Object.assign({}, defaultConfig.leadCapture.nameField, userConfig.leadCapture.nameField || {}),
                    emailField: Object.assign({}, defaultConfig.leadCapture.emailField, userConfig.leadCapture.emailField || {}),
                    phoneField: Object.assign({}, defaultConfig.leadCapture.phoneField, userConfig.leadCapture.phoneField || {}),
                    companyField: Object.assign({}, defaultConfig.leadCapture.companyField, userConfig.leadCapture.companyField || {})
                } : {}
            ),
            behavior: Object.assign({}, defaultConfig.behavior, userConfig.behavior || {})
        }) : defaultConfig;

    // Load Inter font if not already loaded
    if (!document.querySelector('link[href*="Inter"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
    }

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Helper functions
    function generateGradient(primary, secondary) {
        return `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
    }

    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function getBackgroundStyle() {
        if (config.style.useGradient) {
            return generateGradient(config.style.primaryColor, config.style.secondaryColor);
        }
        return config.style.primaryColor;
    }

    function getHoverBackgroundStyle() {
        if (config.style.useGradient) {
            return generateGradient(config.style.secondaryColor, config.style.primaryColor);
        }
        return config.style.secondaryColor;
    }

    // Chat widget class
    class FiratChatWidget {
        constructor() {
            this.currentSessionId = '';
            this.isOpen = false;
            this.messageQueue = [];
            this.isProcessing = false;
            this.retryCount = 0;
            this.maxRetries = 3;
            this.leadData = {};
            
            this.init();
        }

        init() {
            this.createWidget();
            this.attachEventListeners();
            this.loadSession();
            this.loadLeadData();
            
            if (config.behavior.autoOpen) {
                setTimeout(() => this.openChat(), 1000);
            }
        }

        createWidget() {
            // Create main container
            this.container = document.createElement('div');
            this.container.className = 'xactus -chat-widget';
            
            // Set CSS custom properties
            this.container.style.setProperty('--xactus -primary', config.style.primaryColor);
            this.container.style.setProperty('--xactus -secondary', config.style.secondaryColor);
            this.container.style.setProperty('--xactus -bg', config.style.backgroundColor);
            this.container.style.setProperty('--xactus -text', config.style.fontColor);
            
            // Set gradient/solid backgrounds
            const primaryRgb = hexToRgb(config.style.primaryColor);
            if (primaryRgb) {
                this.container.style.setProperty('--primary-rgb', `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`);
            }
            this.container.style.setProperty('--primary-background', getBackgroundStyle());
            this.container.style.setProperty('--primary-background-hover', getHoverBackgroundStyle());

            // Create chat container
            const chatContainer = document.createElement('div');
            chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
            
            // Generate lead capture form HTML if enabled
            const leadCaptureHTML = config.leadCapture.enabled ? `
                <div class="lead-capture-form">
                    <h2>${config.leadCapture.title}</h2>
                    <form class="lead-form">
                        ${config.leadCapture.nameField.enabled ? `
                            <div class="form-group">
                                <label for="lead-name">${config.leadCapture.nameField.label}</label>
                                <input 
                                    type="text" 
                                    id="lead-name" 
                                    name="name"
                                    placeholder="${config.leadCapture.nameField.placeholder}"
                                    ${config.leadCapture.nameField.required ? 'required' : ''}
                                >
                                <div class="form-error">This field is required</div>
                            </div>
                        ` : ''}
                        
                        ${config.leadCapture.emailField.enabled ? `
                            <div class="form-group">
                                <label for="lead-email">${config.leadCapture.emailField.label}</label>
                                <input 
                                    type="email" 
                                    id="lead-email" 
                                    name="email"
                                    placeholder="${config.leadCapture.emailField.placeholder}"
                                    ${config.leadCapture.emailField.required ? 'required' : ''}
                                >
                                <div class="form-error">Please enter a valid email address</div>
                            </div>
                        ` : ''}
                        
                        ${config.leadCapture.phoneField.enabled ? `
                            <div class="form-group">
                                <label for="lead-phone">${config.leadCapture.phoneField.label}</label>
                                <input 
                                    type="tel" 
                                    id="lead-phone" 
                                    name="phone"
                                    placeholder="${config.leadCapture.phoneField.placeholder}"
                                    ${config.leadCapture.phoneField.required ? 'required' : ''}
                                >
                                <div class="form-error">This field is required</div>
                            </div>
                        ` : ''}
                        
                        ${config.leadCapture.companyField.enabled ? `
                            <div class="form-group">
                                <label for="lead-company">${config.leadCapture.companyField.label}</label>
                                <input 
                                    type="text" 
                                    id="lead-company" 
                                    name="company"
                                    placeholder="${config.leadCapture.companyField.placeholder}"
                                    ${config.leadCapture.companyField.required ? 'required' : ''}
                                >
                                <div class="form-error">This field is required</div>
                            </div>
                        ` : ''}
                        
                        <button type="submit" class="continue-btn">
                            ${config.leadCapture.buttonText}
                        </button>
                    </form>
                    ${config.branding.poweredBy.enabled ? `
                        <${config.branding.poweredBy.url ? 'a' : 'div'} 
                            class="powered-by" 
                            ${config.branding.poweredBy.url ? `href="${config.branding.poweredBy.url}" target="${config.branding.poweredBy.target}"` : ''}
                        >
                            ${config.branding.poweredBy.text}
                        </${config.branding.poweredBy.url ? 'a' : 'div'}>
                    ` : ''}
                </div>
            ` : '';
            
            chatContainer.innerHTML = `
                <div class="chat-header" style="background: ${getBackgroundStyle()};">
                    <img src="${config.branding.logo || config.branding.logoUrl}" alt="${config.branding.name || config.branding.businessName}" onerror="this.style.display='none'">
                    <div class="brand-info">
                        <h3>${config.branding.name || config.branding.businessName}</h3>
                        <p>Online now</p>
                    </div>
                    <button class="close-button" aria-label="Close chat">×</button>
                </div>
                
                ${leadCaptureHTML}
                
                <div class="welcome-screen" ${config.leadCapture.enabled ? 'style="display: none;"' : ''}>
                    <h2>${config.branding.welcomeText}</h2>
                    <p>${config.branding.responseTimeText}</p>
                    <button class="start-chat-btn" style="background: ${getBackgroundStyle()};">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                        </svg>
                        Start conversation
                    </button>
                </div>
                
                <div class="chat-interface">
                    <div class="chat-messages" role="log" aria-live="polite" aria-label="Chat messages"></div>
                    <div class="chat-input">
                        <div class="input-wrapper">
                            <textarea 
                                placeholder="Type your message..." 
                                rows="1" 
                                aria-label="Message input"
                                maxlength="1000"
                            ></textarea>
                        </div>
                        <button class="send-button" aria-label="Send message" disabled style="background: ${getBackgroundStyle()};">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2 12l20-8-20-8v6l15 2-15 2v6z"/>
                            </svg>
                        </button>
                    </div>
                    ${config.branding.poweredBy.enabled ? `
                        <${config.branding.poweredBy.url ? 'a' : 'div'} 
                            class="powered-by" 
                            ${config.branding.poweredBy.url ? `href="${config.branding.poweredBy.url}" target="${config.branding.poweredBy.target}"` : ''}
                        >
                            ${config.branding.poweredBy.text}
                        </${config.branding.poweredBy.url ? 'a' : 'div'}>
                    ` : ''}
                </div>
            `;

            // Create toggle button
            const toggleButton = document.createElement('button');
            toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
            toggleButton.setAttribute('aria-label', 'Open chat');
            toggleButton.style.background = getBackgroundStyle();
            toggleButton.innerHTML = `
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
            `;

            this.container.appendChild(chatContainer);
            this.container.appendChild(toggleButton);
            document.body.appendChild(this.container);

            // Store references
            this.chatContainer = chatContainer;
            this.toggleButton = toggleButton;
            this.messagesContainer = chatContainer.querySelector('.chat-messages');
            this.textarea = chatContainer.querySelector('textarea');
            this.sendButton = chatContainer.querySelector('.send-button');
            this.welcomeScreen = chatContainer.querySelector('.welcome-screen');
            this.chatInterface = chatContainer.querySelector('.chat-interface');
            this.leadCaptureForm = chatContainer.querySelector('.lead-capture-form');
            this.leadForm = chatContainer.querySelector('.lead-form');
        }

        attachEventListeners() {
            // Toggle button
            this.toggleButton.addEventListener('click', () => this.toggleChat());
            
            // Close button
            this.container.querySelector('.close-button').addEventListener('click', () => this.closeChat());
            
            // Start chat button
            const startChatBtn = this.container.querySelector('.start-chat-btn');
            if (startChatBtn) {
                startChatBtn.addEventListener('click', () => this.startNewConversation());
            }
            
            // Lead capture form
            if (this.leadForm) {
                this.leadForm.addEventListener('submit', (e) => this.handleLeadFormSubmit(e));
                
                // Apply hover effects with gradients
                const continueBtn = this.leadForm.querySelector('.continue-btn');
                if (continueBtn) {
                    continueBtn.style.background = getBackgroundStyle();
                    continueBtn.addEventListener('mouseenter', () => {
                        continueBtn.style.background = getHoverBackgroundStyle();
                    });
                    continueBtn.addEventListener('mouseleave', () => {
                        continueBtn.style.background = getBackgroundStyle();
                    });
                }
            }
            
            // Send button
            this.sendButton.addEventListener('click', () => this.handleSendMessage());
            
            // Apply hover effects to send button
            this.sendButton.addEventListener('mouseenter', () => {
                if (!this.sendButton.disabled) {
                    this.sendButton.style.background = getHoverBackgroundStyle();
                }
            });
            this.sendButton.addEventListener('mouseleave', () => {
                this.sendButton.style.background = getBackgroundStyle();
            });
            
            // Apply hover effects to toggle button
            this.toggleButton.addEventListener('mouseenter', () => {
                this.toggleButton.style.background = getHoverBackgroundStyle();
            });
            this.toggleButton.addEventListener('mouseleave', () => {
                this.toggleButton.style.background = getBackgroundStyle();
            });
            
            // Apply hover effects to start chat button
            if (startChatBtn) {
                startChatBtn.addEventListener('mouseenter', () => {
                    startChatBtn.style.background = getHoverBackgroundStyle();
                });
                startChatBtn.addEventListener('mouseleave', () => {
                    startChatBtn.style.background = getBackgroundStyle();
                });
            }
            
            // Textarea events
            this.textarea.addEventListener('input', () => this.handleTextareaInput());
            this.textarea.addEventListener('keydown', (e) => this.handleTextareaKeydown(e));
            
            // Auto-resize textarea
            this.textarea.addEventListener('input', () => this.autoResizeTextarea());
            
            // Click outside to close
            document.addEventListener('click', (e) => this.handleOutsideClick(e));
            
            // Escape key to close
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeChat();
                }
            });
        }

        autoResizeTextarea() {
            this.textarea.style.height = 'auto';
            this.textarea.style.height = Math.min(this.textarea.scrollHeight, 120) + 'px';
        }

        handleTextareaInput() {
            const value = this.textarea.value.trim();
            this.sendButton.disabled = !value;
        }

        handleTextareaKeydown(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        }

        handleLeadFormSubmit(e) {
            e.preventDefault();
            
            const formData = new FormData(this.leadForm);
            const leadData = {};
            let hasErrors = false;
            
            // Clear previous errors
            this.leadForm.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('error');
            });
            
            // Validate required fields
            if (config.leadCapture.nameField.enabled && config.leadCapture.nameField.required) {
                const name = formData.get('name');
                if (!name || name.trim() === '') {
                    this.showFieldError('lead-name', 'This field is required');
                    hasErrors = true;
                } else {
                    leadData.name = name.trim();
                }
            } else if (config.leadCapture.nameField.enabled) {
                const name = formData.get('name');
                if (name && name.trim() !== '') {
                    leadData.name = name.trim();
                }
            }
            
            if (config.leadCapture.emailField.enabled && config.leadCapture.emailField.required) {
                const email = formData.get('email');
                if (!email || email.trim() === '') {
                    this.showFieldError('lead-email', 'This field is required');
                    hasErrors = true;
                } else if (!this.isValidEmail(email)) {
                    this.showFieldError('lead-email', 'Please enter a valid email address');
                    hasErrors = true;
                } else {
                    leadData.email = email.trim();
                }
            } else if (config.leadCapture.emailField.enabled) {
                const email = formData.get('email');
                if (email && email.trim() !== '') {
                    if (!this.isValidEmail(email)) {
                        this.showFieldError('lead-email', 'Please enter a valid email address');
                        hasErrors = true;
                    } else {
                        leadData.email = email.trim();
                    }
                }
            }
            
            if (config.leadCapture.phoneField.enabled && config.leadCapture.phoneField.required) {
                const phone = formData.get('phone');
                if (!phone || phone.trim() === '') {
                    this.showFieldError('lead-phone', 'This field is required');
                    hasErrors = true;
                } else {
                    leadData.phone = phone.trim();
                }
            } else if (config.leadCapture.phoneField.enabled) {
                const phone = formData.get('phone');
                if (phone && phone.trim() !== '') {
                    leadData.phone = phone.trim();
                }
            }
            
            if (config.leadCapture.companyField.enabled && config.leadCapture.companyField.required) {
                const company = formData.get('company');
                if (!company || company.trim() === '') {
                    this.showFieldError('lead-company', 'This field is required');
                    hasErrors = true;
                } else {
                    leadData.company = company.trim();
                }
            } else if (config.leadCapture.companyField.enabled) {
                const company = formData.get('company');
                if (company && company.trim() !== '') {
                    leadData.company = company.trim();
                }
            }
            
            if (hasErrors) {
                return;
            }
            
            // Store lead data
            this.leadData = leadData;
            this.saveLeadData();
            
            // Hide lead capture form and start conversation
            if (this.leadCaptureForm) {
                this.leadCaptureForm.style.display = 'none';
            }
            this.startNewConversation();
        }

        showFieldError(fieldId, message) {
            const field = this.leadForm.querySelector(`#${fieldId}`);
            if (field) {
                const formGroup = field.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.add('error');
                    const errorElement = formGroup.querySelector('.form-error');
                    if (errorElement) {
                        errorElement.textContent = message;
                    }
                }
            }
        }

        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        loadLeadData() {
            if (config.behavior.persistSession) {
                const savedLeadData = localStorage.getItem('xactus -chat-lead-data');
                if (savedLeadData) {
                    try {
                        this.leadData = JSON.parse(savedLeadData);
                        
                        // If lead capture is enabled but we have lead data, skip the form
                        if (config.leadCapture.enabled && config.behavior.skipLeadCaptureIfKnown && Object.keys(this.leadData).length > 0) {
                            if (this.leadCaptureForm) {
                                this.leadCaptureForm.style.display = 'none';
                            }
                            if (this.welcomeScreen) {
                                this.welcomeScreen.style.display = 'flex';
                            }
                        }
                    } catch (e) {
                        console.warn('Failed to parse saved lead data');
                    }
                }
            }
        }

        saveLeadData() {
            if (config.behavior.persistSession && Object.keys(this.leadData).length > 0) {
                localStorage.setItem('xactus -chat-lead-data', JSON.stringify(this.leadData));
            }
        }

        handleTextareaKeydown(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSendMessage();
            }
        }

        handleOutsideClick(e) {
            if (this.isOpen && !this.container.contains(e.target)) {
                this.closeChat();
            }
        }

        toggleChat() {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        openChat() {
            this.chatContainer.classList.add('open');
            this.toggleButton.classList.add('open');
            this.toggleButton.setAttribute('aria-label', 'Close chat');
            this.isOpen = true;
            
            // Focus on textarea if chat interface is active
            if (this.chatInterface.classList.contains('active')) {
                setTimeout(() => this.textarea.focus(), 300);
            }
        }

        closeChat() {
            this.chatContainer.classList.remove('open');
            this.toggleButton.classList.remove('open');
            this.toggleButton.setAttribute('aria-label', 'Open chat');
            this.isOpen = false;
        }

        async startNewConversation() {
            this.currentSessionId = this.generateUUID();
            this.welcomeScreen.style.display = 'none';
            this.chatInterface.classList.add('active');
            
            this.saveSession();
            
            try {
                await this.initializeChat();
                setTimeout(() => this.textarea.focus(), 100);
            } catch (error) {
                this.showError('Failed to start conversation. Please try again.');
                console.error('Chat initialization error:', error);
            }
        }

        async initializeChat() {
            const data = {
                action: "loadPreviousSession",
                sessionId: this.currentSessionId,
                route: config.webhook.route,
                metadata: {
                    userId: this.getUserId(),
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    leadData: this.leadData || {}
                }
            };

            try {
                const response = await this.makeRequest(data);
                
                if (response && response.output) {
                    this.addMessage('bot', response.output);
                } else {
                    this.addMessage('bot', 'Hello! How can I help you today?');
                }
            } catch (error) {
                throw new Error('Failed to initialize chat session');
            }
        }

        async handleSendMessage() {
            const message = this.textarea.value.trim();
            if (!message || this.isProcessing) return;

            this.isProcessing = true;
            this.sendButton.disabled = true;
            
            // Add user message
            this.addMessage('user', message);
            this.textarea.value = '';
            this.autoResizeTextarea();
            
            // Show typing indicator
            const typingIndicator = this.showTypingIndicator();
            
            try {
                const response = await this.sendMessageToWebhook(message);
                this.removeTypingIndicator(typingIndicator);
                
                if (response && response.output) {
                    this.addMessage('bot', response.output);
                    this.retryCount = 0;
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (error) {
                this.removeTypingIndicator(typingIndicator);
                this.handleMessageError(error, message);
            } finally {
                this.isProcessing = false;
                this.sendButton.disabled = false;
                this.textarea.focus();
            }
        }

        async sendMessageToWebhook(message) {
            const data = {
                action: "sendMessage",
                sessionId: this.currentSessionId,
                route: config.webhook.route,
                chatInput: message,
                metadata: {
                    userId: this.getUserId(),
                    timestamp: new Date().toISOString(),
                    leadData: this.leadData || {}
                }
            };

            return await this.makeRequest(data);
        }

        async makeRequest(data) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), config.behavior.timeout);

            try {
                const response = await fetch(config.webhook.url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(data),
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const result = await response.json();
                return Array.isArray(result) ? result[0] : result;
            } catch (error) {
                clearTimeout(timeoutId);
                throw error;
            }
        }

        handleMessageError(error, originalMessage) {
            console.error('Message send error:', error);
            
            if (this.retryCount < this.maxRetries) {
                this.retryCount++;
                this.showError(`Message failed to send. Retrying... (${this.retryCount}/${this.maxRetries})`);
                
                setTimeout(() => {
                    this.sendMessageToWebhook(originalMessage).then(response => {
                        if (response && response.output) {
                            this.addMessage('bot', response.output);
                            this.retryCount = 0;
                            this.hideError();
                        }
                    }).catch(() => {
                        this.handleMessageError(error, originalMessage);
                    });
                }, 2000);
            } else {
                this.showError('Unable to send message. Please check your connection and try again.');
                this.retryCount = 0;
            }
        }

        addMessage(type, content) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `chat-message ${type}`;
            messageDiv.textContent = content;
            
            // Apply gradient/solid styling to user messages
            if (type === 'user') {
                messageDiv.style.background = getBackgroundStyle();
            }
            
            // Add timestamp for accessibility
            const timestamp = new Date().toLocaleTimeString();
            messageDiv.setAttribute('aria-label', `${type === 'user' ? 'You' : config.branding.name || config.branding.businessName} at ${timestamp}: ${content}`);
            
            this.messagesContainer.appendChild(messageDiv);
            this.scrollToBottom();
        }

        showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            `;
            
            this.messagesContainer.appendChild(typingDiv);
            this.scrollToBottom();
            return typingDiv;
        }

        removeTypingIndicator(indicator) {
            if (indicator && indicator.parentNode) {
                indicator.parentNode.removeChild(indicator);
            }
        }

        showError(message) {
            this.hideError();
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            
            this.messagesContainer.appendChild(errorDiv);
            this.scrollToBottom();
            
            this.errorElement = errorDiv;
        }

        hideError() {
            if (this.errorElement && this.errorElement.parentNode) {
                this.errorElement.parentNode.removeChild(this.errorElement);
                this.errorElement = null;
            }
        }

        scrollToBottom() {
            requestAnimationFrame(() => {
                this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
            });
        }

        generateUUID() {
            if (crypto.randomUUID) {
                return crypto.randomUUID();
            }
            
            // Fallback for older browsers
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }

        getUserId() {
            let userId = localStorage.getItem('xactus -chat-user-id');
            if (!userId) {
                userId = this.generateUUID();
                localStorage.setItem('xactus -chat-user-id', userId);
            }
            return userId;
        }

        saveSession() {
            if (config.behavior.persistSession) {
                localStorage.setItem('xactus -chat-session', this.currentSessionId);
            }
        }

        loadSession() {
            if (config.behavior.persistSession) {
                const savedSession = localStorage.getItem('xactus -chat-session');
                if (savedSession) {
                    this.currentSessionId = savedSession;
                }
            }
        }
    }

    // Initialize widget when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new FiratChatWidget());
    } else {
        new FiratChatWidget();
    }

    // Expose widget API
    window.FiratChatWidget = {
        open: () => {
            if (window.firatChatInstance) {
                window.firatChatInstance.openChat();
            }
        },
        close: () => {
            if (window.firatChatInstance) {
                window.firatChatInstance.closeChat();
            }
        },
        toggle: () => {
            if (window.firatChatInstance) {
                window.firatChatInstance.toggleChat();
            }
        }
    };

})();