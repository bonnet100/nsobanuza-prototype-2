const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const HealthSearch = require('./utils/search');
const AIService = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : '*',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Global variables
let healthSearch;
let aiService;

// Initialize services
async function initializeServices() {
  try {
    // Load health data
    const dataPath = path.join(__dirname, 'data', 'healthData.json');
    const healthData = JSON.parse(await fs.readFile(dataPath, 'utf8'));

    // Initialize search service
    healthSearch = new HealthSearch(healthData);

    // Initialize AI service
    aiService = new AIService();

    console.log(`✅ Loaded ${healthData.length} health records`);
    console.log('✅ Services initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize services:', error.message);
    process.exit(1);
  }
}

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Invalid request: message is required and must be a non-empty string'
      });
    }

    // Detect language from user input
    const detectedLanguage = healthSearch.detectLanguage(message);

    // Search for relevant information
    const searchResults = healthSearch.searchByLanguage(message, detectedLanguage, 3);

    // Generate AI response with context
    const aiResponse = await aiService.generateResponse(message, searchResults, detectedLanguage);

    // Log interaction (optional)
    aiService.logInteraction(message, aiResponse, searchResults);

    // Return response
    res.json({
      response: aiResponse,
      language: detectedLanguage,
      contextUsed: searchResults.length,
      confidence: searchResults.length > 0 ? Math.max(...searchResults.map(r => 1 - (r.score || 0))) : 0
    });

  } catch (error) {
    console.error('Chat endpoint error:', error);

    res.status(500).json({
      error: 'Internal server error',
      response: 'I apologize, but I\'m experiencing technical difficulties. Please try again later or consult a healthcare professional.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      search: healthSearch ? 'initialized' : 'not initialized',
      ai: aiService ? 'initialized' : 'not initialized'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function startServer() {
  await initializeServices();

  app.listen(PORT, () => {
    console.log(`🚀 Nsobanuza Health Chatbot Backend running on port ${PORT}`);
    console.log(`📊 Health check available at http://localhost:${PORT}/health`);
    console.log(`💬 Chat endpoint available at http://localhost:${PORT}/chat`);
  });
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

// Start the application
startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});