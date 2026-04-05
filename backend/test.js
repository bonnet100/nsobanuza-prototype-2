const axios = require('axios');
const { spawn } = require('child_process');

async function testChatbot() {
  const baseURL = 'http://localhost:5000';

  // Start server
  console.log('🚀 Starting server...');
  const server = spawn('node', ['server.js'], {
    cwd: __dirname,
    stdio: ['pipe', 'pipe', 'pipe']
  });

  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    // Test health endpoint
    console.log('🩺 Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check:', JSON.stringify(healthResponse.data, null, 2));

    // Test chat endpoint with English
    console.log('\n💬 Testing English chat...');
    const englishResponse = await axios.post(`${baseURL}/chat`, {
      message: 'What are HIV symptoms?'
    });
    console.log('✅ English response:', JSON.stringify(englishResponse.data, null, 2));

    // Test chat endpoint with Kinyarwanda
    console.log('\n💬 Testing Kinyarwanda chat...');
    const kinyarwandaResponse = await axios.post(`${baseURL}/chat`, {
      message: 'Ni ibihe bimenyetso bya SIDA?'
    });
    console.log('✅ Kinyarwanda response:', JSON.stringify(kinyarwandaResponse.data, null, 2));

    // Test chat endpoint with no matches
    console.log('\n💬 Testing fallback response...');
    const fallbackResponse = await axios.post(`${baseURL}/chat`, {
      message: 'What is the meaning of life?'
    });
    console.log('✅ Fallback response:', JSON.stringify(fallbackResponse.data, null, 2));

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  } finally {
    // Stop server
    server.kill();
    console.log('🛑 Server stopped');
  }
}

// Run tests
testChatbot();