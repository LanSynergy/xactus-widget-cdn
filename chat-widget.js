// Chat Widget Script
(function() {
    // Create and inject styles
    const styles = `
        .n8n-chat-widget {
            --chat--color-primary: var(--n8n-chat-primary-color, #854fff);
            --chat--color-secondary: var(--n8n-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--n8n-chat-background-color, #ffffff);
            --chat--color-font: var(--n8n-chat-font-color, #333333);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
        }

        .n8n-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 20px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }

        .n8n-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }

        .n8n-chat-widget .close-button:hover {
            opacity: 1;
        }

        .n8n-chat-widget .brand-header img {
            width: 32px;
            height: 32px;
        }

        .n8n-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }

        .n8n-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }

        .n8n-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }

        .n8n-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 12px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }

        .n8n-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }

        .n8n-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }

        .n8n-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }

        .n8n-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }

        .n8n-chat-widget .chat-interface.active {
            display: flex;
        }

        .n8n-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }

        .n8n-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }

        .n8n-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }

        .n8n-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .n8n-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }

        .n8n-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }

        .n8n-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            min-width: 60px;
            height: 60px;
            padding: 0 20px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-family: inherit;
            font-size: 16px;
            font-weight: 500;
        }

        .n8n-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }

        .n8n-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }

        .n8n-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }

        .n8n-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }

        .n8n-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }

        .n8n-chat-widget .chat-footer a:hover {
            opacity: 1;
        }

        .n8n-chat-widget .lead-capture {
            display: none;
            flex-direction: column;
            height: 100%;
            padding: 30px 20px;
            text-align: center;
        }

        .n8n-chat-widget .lead-capture.active {
            display: flex;
        }

        .n8n-chat-widget .profile-section {
            text-align: center;
            margin-bottom: 24px;
        }

        .n8n-chat-widget .profile-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            margin: 0 auto 12px;
            overflow: hidden;
            background: #f5f5f5;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .n8n-chat-widget .profile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .n8n-chat-widget .profile-name {
            font-size: 16px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 8px;
        }

        .n8n-chat-widget .lead-capture h2 {
            font-size: 20px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 30px;
            line-height: 1.3;
        }

        .n8n-chat-widget .lead-logo {
            display: flex;
            justify-content: center;
            margin-bottom: 24px;
        }

        .n8n-chat-widget .lead-logo img {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            object-fit: cover;
            border: 3px solid rgba(133, 79, 255, 0.1);
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.15);
        }

        .n8n-chat-widget .lead-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .n8n-chat-widget .form-group {
            text-align: left;
        }

        .n8n-chat-widget .form-group label {
            display: block;
            margin-bottom: 10px;
            font-weight: 500;
            color: var(--chat--color-font);
            font-size: 15px;
        }

        .n8n-chat-widget .form-group input {
            width: 100%;
            padding: 16px 14px;
            border: 1.5px solid rgba(133, 79, 255, 0.2);
            border-radius: 14px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            font-family: inherit;
            font-size: 16px;
            box-sizing: border-box;
            transition: all 0.2s ease;
        }

        .n8n-chat-widget .form-group input:focus {
            outline: none;
            border-color: var(--chat--color-primary);
            box-shadow: 0 0 0 3px rgba(133, 79, 255, 0.1);
            transform: translateY(-1px);
        }

        .n8n-chat-widget .form-group input::placeholder {
            color: rgba(133, 79, 255, 0.5);
            font-weight: 400;
        }

        .n8n-chat-widget .form-group input::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }

        .n8n-chat-widget .continue-btn {
            width: 100%;
            padding: 18px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            font-family: inherit;
            margin-top: 16px;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.25);
        }

        .n8n-chat-widget .continue-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(133, 79, 255, 0.35);
        }

        .n8n-chat-widget .continue-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
        }
    `;

    // Load Geist font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://cdn.jsdelivr.net/npm/geist@1.0.0/dist/fonts/geist-sans/style.css';
    document.head.appendChild(fontLink);

    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: 'https://via.placeholder.com/32x32/667eea/ffffff?text=💬',
            name: 'Chat Support',
            welcomeText: 'Hi 👋, how can we help?',
            responseTimeText: 'We typically respond right away',
            toggleText: 'Need help?',
            poweredBy: {
                text: 'Powered by n8n',
                link: 'https://n8n.partnerlinks.io/m8a94i19zhqq?utm_source=nocodecreative.io'
            }
        },
        leadCapture: {
            enabled: true,
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
            primaryColor: '#ff6b35',
            secondaryColor: '#f7931e',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };

    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            leadCapture: { ...defaultConfig.leadCapture, ...window.ChatWidgetConfig.leadCapture },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;

    // Prevent multiple initializations
    if (window.N8NChatWidgetInitialized) return;
    window.N8NChatWidgetInitialized = true;

    let currentSessionId = '';

    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'n8n-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--n8n-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--n8n-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--n8n-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--n8n-chat-font-color', config.style.fontColor);

    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    // Single, global header (avoid duplicate headers in different views)
    const headerHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}" onerror="this.style.display='none'">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
    `;

    const newConversationHTML = `
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Send us a message
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;

    const leadCaptureHTML = `
        <div class="lead-capture">
            <div class="profile-section">
                <div class="profile-avatar">
                    <img src="${config.branding.logo}" alt="${config.branding.name}" onerror="this.style.display='none'">
                </div>
                <div class="profile-name">${config.branding.name}</div>
            </div>
            <h2>${config.leadCapture.title}</h2>
            <form class="lead-form">
                ${config.leadCapture.nameField.enabled ? `
                    <div class="form-group">
                        <label for="lead-name">${config.leadCapture.nameField.label}</label>
                        <input type="text" id="lead-name" name="name" placeholder="${config.leadCapture.nameField.placeholder}" ${config.leadCapture.nameField.required ? 'required' : ''}>
                    </div>
                ` : ''}
                ${config.leadCapture.emailField.enabled ? `
                    <div class="form-group">
                        <label for="lead-email">${config.leadCapture.emailField.label}</label>
                        <input type="email" id="lead-email" name="email" placeholder="${config.leadCapture.emailField.placeholder}" ${config.leadCapture.emailField.required ? 'required' : ''}>
                    </div>
                ` : ''}
                <button type="submit" class="continue-btn">Continue to Chat</button>
            </form>
        </div>
    `;

    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea placeholder="Type your message here..." rows="1"></textarea>
                <button type="submit">Send</button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    // Assemble with a single header at the top
    chatContainer.innerHTML = headerHTML + newConversationHTML + leadCaptureHTML + chatInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 24px; height: 24px;">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>
        ${config.branding.toggleText ? `<span>${config.branding.toggleText}</span>` : ''}
    `;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);

    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const leadCapture = chatContainer.querySelector('.lead-capture');
    const leadForm = chatContainer.querySelector('.lead-form');
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');

    let leadData = {};

    function generateUUID() {
        return crypto.randomUUID();
    }

    function showLeadCapture() {
        chatContainer.querySelector('.new-conversation').style.display = 'none';
        leadCapture.classList.add('active');
    }

    async function startNewConversation() {
        currentSessionId = generateUUID();

        // Loading state on submit button (if present)
        const continueBtn = chatContainer.querySelector('.continue-btn');
        const prevBtnText = continueBtn ? continueBtn.textContent : '';
        if (continueBtn) {
            continueBtn.disabled = true;
            continueBtn.textContent = 'Starting...';
        }

    // Optimistic UI: switch to chat immediately
        leadCapture.classList.remove('active');
        chatInterface.classList.add('active');

    // Focus input so user can type and press Enter right away
    const activeTextarea = chatContainer.querySelector('.chat-interface textarea');
    if (activeTextarea) activeTextarea.focus();

        // Optional greeting while waiting for backend
        const waitingMsg = document.createElement('div');
        waitingMsg.className = 'chat-message bot';
        waitingMsg.textContent = 'One moment while I get set up...';
        messagesContainer.appendChild(waitingMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Build an introductory message that includes captured lead data
        const namePart = leadData.name ? `Name: ${leadData.name}` : '';
        const emailPart = leadData.email ? `Email: ${leadData.email}` : '';
        const detailsLine = [namePart, emailPart].filter(Boolean).join(' | ');
        const introMessage = detailsLine
            ? `New chat started. ${detailsLine}. Please greet them and ask how you can help.`
            : 'New chat started. Please greet the user and ask how you can help.';

        const payload = {
            action: 'sendMessage',
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: introMessage,
            metadata: {
                userId: '',
                ...leadData
            }
        };

        try {
            const resp = await fetch(config.webhook.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            // If backend returns non-2xx or non-JSON, fall back gracefully
            let responseData = null;
            try { responseData = await resp.json(); } catch {}

            // Replace waiting message with actual greeting if provided
            if (responseData) {
                waitingMsg.textContent = Array.isArray(responseData) ? (responseData[0]?.output || waitingMsg.textContent) : (responseData.output || waitingMsg.textContent);
            } else if (!resp.ok) {
                waitingMsg.textContent = 'Connected, but no greeting received.';
            }
        } catch (error) {
            // Network/CORS error — keep chat open and show helpful note
            console.error('Start conversation error:', error);
            waitingMsg.textContent = 'Could not reach the chat service. Please try again or check your webhook URL/CORS.';
        } finally {
            if (continueBtn) {
                continueBtn.disabled = false;
                continueBtn.textContent = prevBtnText || 'Continue to Chat';
            }
        }
    }

    async function sendMessage(message) {
        const messageData = {
            action: "sendMessage",
            sessionId: currentSessionId,
            route: config.webhook.route,
            chatInput: message,
            metadata: {
                userId: "",
                ...leadData
            }
        };

        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'chat-message user';
        userMessageDiv.textContent = message;
        messagesContainer.appendChild(userMessageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        try {
            const response = await fetch(config.webhook.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
            });
            
            const data = await response.json();
            
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'chat-message bot';
            botMessageDiv.textContent = Array.isArray(data) ? data[0].output : data.output;
            messagesContainer.appendChild(botMessageDiv);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    newChatBtn.addEventListener('click', showLeadCapture);
    
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Collect lead data
        const nameInput = leadForm.querySelector('#lead-name');
        const emailInput = leadForm.querySelector('#lead-email');
        
        leadData = {};
        if (nameInput) leadData.name = nameInput.value.trim();
        if (emailInput) leadData.email = emailInput.value.trim();
        
        // Validate required fields
        let isValid = true;
        if (config.leadCapture.nameField.enabled && config.leadCapture.nameField.required && !leadData.name) {
            isValid = false;
        }
        if (config.leadCapture.emailField.enabled && config.leadCapture.emailField.required && !leadData.email) {
            isValid = false;
        }
        
        if (isValid) {
            startNewConversation();
        }
    });
    
    // Unified send handler so clicking Send behaves like pressing Enter
    function handleSend() {
        const msg = textarea.value.trim();
        if (!msg) return;
        sendMessage(msg);
        textarea.value = '';
    }

    sendButton.addEventListener('click', handleSend);

    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });

    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
})();
