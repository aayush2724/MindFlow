const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

/**
 * Generate empathetic insights based on student data
 * @param {Object} data - Student wellbeing data
 * @returns {Array} - List of 3 strings
 */
const generateAIInsights = async (data) => {
  try {
    const prompt = `A student has shown the following wellbeing data over the past 7 days: ${JSON.stringify(data.checkins)}. 
    Their current burnout risk is ${data.riskLevel} with a score of ${data.score}/100. 
    Generate 3 short, empathetic, actionable recommendations to help them recover. 
    Keep each under 25 words. Respond ONLY in valid JSON format: { "insights": ["string1", "string2", "string3"] }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from text (handling potential markdown formatting)
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    return parsed.insights || [];
  } catch (error) {
    console.error('AI Insight Generation Error:', error);
    // Fallback static insights
    return [
      "Consider setting a firm 'no-screen' time 30 minutes before bed to improve sleep quality.",
      "Try the Pomodoro technique today: 25 minutes of focus followed by a 5-minute movement break.",
      "Reach out to a peer or mentor today just to chat—social connection is a powerful buffer against stress."
    ];
  }
};

module.exports = { generateAIInsights };
