const Fuse = require('fuse.js');

class HealthSearch {
  constructor(data) {
    this.data = data;
    this.fuse = new Fuse(data, {
      keys: [
        { name: 'question', weight: 0.7 },
        { name: 'tags', weight: 0.3 }
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true
    });
  }

  /**
   * Search for relevant health information
   * @param {string} query - User's question
   * @param {number} limit - Maximum number of results to return
   * @returns {Array} Array of matching results with scores
   */
  search(query, limit = 3) {
    const results = this.fuse.search(query.toLowerCase());

    return results
      .slice(0, limit)
      .map(result => ({
        ...result.item,
        score: result.score,
        matches: result.matches
      }));
  }

  /**
   * Get results by language
   * @param {string} query - User's question
   * @param {string} language - Language code ('en', 'rw', 'fr')
   * @param {number} limit - Maximum number of results
   * @returns {Array} Filtered results
   */
  searchByLanguage(query, language, limit = 3) {
    const allResults = this.search(query, limit * 2); // Get more results to filter

    return allResults
      .filter(result => result.language === language)
      .slice(0, limit);
  }

  /**
   * Detect language from query (basic detection)
   * @param {string} query - User's input
   * @returns {string} Detected language code
   */
  detectLanguage(query) {
    // Simple language detection based on common words and patterns
    const queryLower = query.toLowerCase();

    // Kinyarwanda indicators
    const kinyarwandaWords = ['ni', 'uko', 'kandi', 'cyangwa', 'niba', 'uko', 'ibihe', 'bimenyetso', 'sida'];
    const kinyarwandaCount = kinyarwandaWords.filter(word =>
      queryLower.includes(word)
    ).length;

    // French indicators
    const frenchWords = ['le', 'la', 'les', 'et', 'ou', 'si', 'que', 'qui', 'quels', 'sont', 'les'];
    const frenchCount = frenchWords.filter(word =>
      queryLower.includes(word)
    ).length;

    // Additional checks for better accuracy
    if (queryLower.includes('sida') && kinyarwandaCount > 0) {
      return 'rw';
    }
    if (queryLower.includes('vih') || queryLower.includes('sida') && frenchCount > 0) {
      return 'fr';
    }

    if (kinyarwandaCount > frenchCount) {
      return 'rw';
    } else if (frenchCount > kinyarwandaCount) {
      return 'fr';
    } else {
      return 'en'; // Default to English
    }
  }

  /**
   * Get fallback response when no matches found
   * @param {string} language - Language code
   * @returns {string} Fallback message
   */
  getFallbackResponse(language) {
    const fallbacks = {
      en: "I'm not sure about this. Please consult a certified health professional.",
      rw: "Sinzi neza kuri iki. Jana kwa muganga wemewe.",
      fr: "Je ne suis pas sûr de cela. Veuillez consulter un professionnel de santé certifié."
    };

    return fallbacks[language] || fallbacks.en;
  }
}

module.exports = HealthSearch;