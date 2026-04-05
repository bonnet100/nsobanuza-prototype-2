const axios = require('axios');

class AIService {
  constructor() {
    // In production, load from environment variables
    this.apiKey = process.env.AI_API_KEY || 'your-api-key-here';
    this.apiUrl = process.env.AI_API_URL || 'https://api.openai.com/v1/chat/completions';
    this.model = process.env.AI_MODEL || 'gpt-3.5-turbo';
  }

  /**
   * Generate a response using AI with retrieved context
   * @param {string} userMessage - User's original question
   * @param {Array} context - Retrieved relevant information
   * @param {string} language - Response language
   * @returns {Promise<string>} AI-generated response
   */
  async generateResponse(userMessage, context, language) {
    try {
      // Combine context into a readable string
      const contextText = context.length > 0
        ? context.map(item => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')
        : 'No specific information available.';

      const prompt = this.buildPrompt(userMessage, contextText, language);

      // For development/demo purposes, return a mock response
      // In production, uncomment the API call below
      return this.generateMockResponse(userMessage, context, language);

      // Production API call (uncomment when you have API access)
      /*
      const response = await axios.post(this.apiUrl, {
        model: this.model,
        messages: [
          {
            role: 'system',
            content: 'You are a helpful, culturally sensitive health assistant for young people in Rwanda. Provide clear, safe, and non-judgmental responses.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data.choices[0].message.content.trim();
      */
    } catch (error) {
      console.error('AI Service Error:', error.message);
      return this.getFallbackResponse(language);
    }
  }

  /**
   * Build the prompt for the AI
   * @param {string} userMessage - User's question
   * @param {string} context - Retrieved information
   * @param {string} language - Language code
   * @returns {string} Formatted prompt
   */
  buildPrompt(userMessage, context, language) {
    const languageInstructions = {
      en: 'Respond in English.',
      rw: 'Respond in Kinyarwanda.',
      fr: 'Respond in French.'
    };

    return `User question: ${userMessage}

Relevant health information:
${context}

${languageInstructions[language] || 'Respond in English.'}

Guidelines:
- Be clear, safe, and culturally sensitive
- Be non-judgmental and supportive
- Keep responses concise but helpful
- If unsure, advise consulting a professional
- Focus on accurate health information
- Respect Rwandan cultural context when relevant

Provide a helpful response:`;
  }

  /**
   * Generate mock response for development
   * @param {string} userMessage - User's question
   * @param {Array} context - Retrieved context
   * @param {string} language - Language code
   * @returns {string} Mock response
   */
  generateMockResponse(userMessage, context, language) {
    if (context.length === 0) {
      return this.getFallbackResponse(language);
    }

    // Simple mock responses based on context
    const firstMatch = context[0];

    const responses = {
      en: `Based on health information, ${firstMatch.answer} Remember to consult a healthcare professional for personalized advice.`,
      rw: `Ukurikije amakuru y'ubuzima, ${firstMatch.answer} Wibuke kujya kwa muganga kugira ngo agufashe ku giti cye.`,
      fr: `Selon les informations de santé, ${firstMatch.answer} N'oubliez pas de consulter un professionnel de santé pour des conseils personnalisés.`
    };

    return responses[language] || responses.en;
  }

  /**
   * Get fallback response when AI fails
   * @param {string} language - Language code
   * @returns {string} Fallback message
   */
  getFallbackResponse(language) {
    const fallbacks = {
      en: "I apologize, but I'm having trouble generating a response right now. Please consult a healthcare professional for accurate information.",
      rw: "Mbabarira, ariko ndi mu kaga ko gutanga igisubizo ubu. Jana kwa muganga kugira ngo ubone amakuru y'ukuri.",
      fr: "Je m'excuse, mais j'ai des difficultés à générer une réponse pour le moment. Veuillez consulter un professionnel de santé pour des informations précises."
    };

    return fallbacks[language] || fallbacks.en;
  }

  /**
   * Log chat interaction for analytics
   * @param {string} userMessage - User's question
   * @param {string} response - AI response
   * @param {Array} context - Retrieved context
   */
  logInteraction(userMessage, response, context) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      userMessage,
      response,
      contextCount: context.length,
      contextIds: context.map(item => item.id)
    };

    // In production, save to database or log file
    console.log('Chat Log:', JSON.stringify(logEntry, null, 2));
  }
}

module.exports = AIService;