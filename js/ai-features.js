class AIPortfolioEnhancer {
    constructor() {
        this.chatWidget = document.querySelector('.chat-widget');
        this.initializeChat();
        this.trackUserInteractions();
    }

    initializeChat() {
        const chatToggle = this.chatWidget.querySelector('.chat-toggle');
        const chatContainer = this.chatWidget.querySelector('.chat-container');

        chatToggle.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
        });

        // Initialize chat interface
        chatContainer.innerHTML = `
            <div class="chat-messages"></div>
            <input type="text" class="chat-input" placeholder="Ask me anything...">
        `;

        const chatInput = chatContainer.querySelector('.chat-input');
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleChatMessage(chatInput.value);
                chatInput.value = '';
            }
        });
    }

    async handleChatMessage(message) {
        const chatMessages = this.chatWidget.querySelector('.chat-messages');
        
        // Add user message
        chatMessages.innerHTML += `
            <div class="message user-message">${message}</div>
        `;

        // Simulate AI response (replace with actual AI integration)
        const response = await this.getAIResponse(message);
        chatMessages.innerHTML += `
            <div class="message ai-message">${response}</div>
        `;

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async getAIResponse(message) {
        // Implement your AI chat integration here
        return "Thanks for your message! I'm an AI assistant here to help you learn more about this portfolio.";
    }

    trackUserInteractions() {
        // Track user interactions for content recommendations
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                this.updateUserPreferences(item.dataset.category);
            });
        });
    }

    updateUserPreferences(category) {
        // Implement user preference tracking and content recommendations
        console.log(`User showed interest in: ${category}`);
    }
}

// Initialize AI features
document.addEventListener('DOMContentLoaded', () => {
    new AIPortfolioEnhancer();
}); 