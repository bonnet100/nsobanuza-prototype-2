# Nsobanuza Health Chatbot Backend

A multilingual AI chatbot backend using Retrieval-Augmented Generation (RAG) for the Nsobanuza digital health platform.

## Features

- 🌍 **Multilingual Support**: Handles Kinyarwanda, English, and French
- 🔍 **Intelligent Search**: Uses Fuse.js for fuzzy search across health data
- 🤖 **AI Integration**: Ready for OpenAI, Anthropic, or Google AI APIs
- 📊 **RAG Architecture**: Retrieves relevant context before generating responses
- 🛡️ **Culturally Sensitive**: Provides safe, non-judgmental health information
- ⚡ **Fast & Efficient**: Optimized for low-data usage and quick responses

## Project Structure

```
backend/
├── server.js              # Main Express server
├── package.json           # Dependencies and scripts
├── data/
│   └── healthData.json    # Health information dataset
├── services/
│   └── aiService.js       # AI API integration
└── utils/
    └── search.js          # Search and retrieval logic
```

## Setup

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables** (Optional)
   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   AI_API_KEY=your-api-key-here
   AI_API_URL=https://api.openai.com/v1/chat/completions
   AI_MODEL=gpt-3.5-turbo
   ```

3. **Start the Server**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### POST /chat
Send a chat message and receive an AI-generated response.

**Request Body:**
```json
{
  "message": "What are HIV symptoms?"
}
```

**Response:**
```json
{
  "response": "Early HIV symptoms may include fever, fatigue, swollen lymph nodes...",
  "language": "en",
  "contextUsed": 2,
  "confidence": 0.85
}
```

### GET /health
Check server health and service status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "services": {
    "search": "initialized",
    "ai": "initialized"
  }
}
```

## Data Format

Health data is stored in `data/healthData.json` with the following structure:

```json
[
  {
    "id": 1,
    "language": "en",
    "question": "What are the symptoms of HIV?",
    "answer": "Early HIV symptoms may include fever, fatigue...",
    "tags": ["HIV", "symptoms", "testing"]
  }
]
```

## Language Detection

The system automatically detects the input language:
- **Kinyarwanda (rw)**: Detects common Kinyarwanda words
- **French (fr)**: Detects common French words
- **English (en)**: Default fallback

## AI Integration

Currently uses mock responses for development. To enable real AI:

1. Set your API key in environment variables
2. Uncomment the API call in `services/aiService.js`
3. Update the API URL and model as needed

Supported AI services:
- OpenAI GPT models
- Anthropic Claude
- Google Gemini
- Any OpenAI-compatible API

## Search Algorithm

Uses Fuse.js with:
- **Keys**: `question` (70% weight), `tags` (30% weight)
- **Threshold**: 0.4 (balanced precision/recall)
- **Results**: Top 1-3 matches per language

## Security & Performance

- Input validation and sanitization
- Error handling with try/catch blocks
- CORS enabled for frontend integration
- Request/response size limits
- Graceful shutdown handling

## Development

### Adding New Health Data

1. Add entries to `data/healthData.json`
2. Ensure consistent language codes and tagging
3. Test search relevance with new data

### Customizing AI Prompts

Edit the `buildPrompt` method in `services/aiService.js` to customize AI behavior.

### Logging

Chat interactions are logged to console. For production, implement database logging in the `logInteraction` method.

## Deployment

1. Set environment variables for production
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)
4. Set up monitoring and logging
5. Enable HTTPS

## Contributing

1. Follow the existing code structure
2. Add comprehensive error handling
3. Test multilingual functionality
4. Update documentation for changes

## License

MIT License - see LICENSE file for details.