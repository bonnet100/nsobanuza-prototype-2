const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const HealthSearch = require('./utils/search');
const AIService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 5000;
const chatRoutes = ['/chat', '/api/chat'];
const healthRoutes = ['/health', '/api/health'];

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://nsobanuza.vercel.app', 'https://*.vercel.app', 'http://localhost:3000']
    : '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

let healthSearch;
let aiService;

async function initializeServices() {
  try {
    const dataPath = path.join(__dirname, 'data', 'healthData.json');
    const healthData = JSON.parse(await fs.readFile(dataPath, 'utf8'));

    healthSearch = new HealthSearch(healthData);
    aiService = new AIService();

    console.log(`Loaded ${healthData.length} health records`);
    console.log('Services initialized successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error.message);
    process.exit(1);
  }
}

app.post(chatRoutes, async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request: message is required and must be a non-empty string',
      });
    }

    const detectedLanguage = healthSearch.detectLanguage(message);
    const searchResults = healthSearch.searchByLanguage(message, detectedLanguage, 3);
    const aiResponse = await aiService.generateResponse(message, searchResults, detectedLanguage);

    aiService.logInteraction(message, aiResponse, searchResults);

    return res.json({
      response: aiResponse,
      language: detectedLanguage,
      contextUsed: searchResults.length,
      confidence: searchResults.length > 0 ? Math.max(...searchResults.map((result) => 1 - (result.score || 0))) : 0,
    });
  } catch (error) {
    console.error('Chat endpoint error:', error);

    return res.status(500).json({
      error: 'Internal server error',
      response: 'I apologize, but I am experiencing technical difficulties. Please try again later or consult a healthcare professional.',
    });
  }
});

app.get(healthRoutes, (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      search: healthSearch ? 'initialized' : 'not initialized',
      ai: aiService ? 'initialized' : 'not initialized',
    },
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

initializeServices().catch((error) => {
  console.error('Failed to initialize services:', error);
});

module.exports = app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Nsobanuza Health Chatbot Backend running on port ${PORT}`);
    console.log(`Health check available at http://localhost:${PORT}/health`);
    console.log(`Chat endpoint available at http://localhost:${PORT}/chat`);
  });
}
