import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
import generateAdvancedRecommendationPrompt from './../../data/recommendationPrompt.js';

dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '', 
});

// Service class
class ChatbotService {
  // Function to get recommendation
  async getRecommendation(req) {
    const recommendationPrompt = generateAdvancedRecommendationPrompt(
      req.body.userProfile, 
      req.body.courses,
      req.body.userInput
    );

    try {
      // Generate recommendation
      const response = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful course advisor. Give responses in bullet points.' },
          { role: 'user', content: recommendationPrompt }
        ],
        model: 'llama-3.1-70b-versatile',
        temperature: 1,
        max_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null
      });

      return response;
    } catch (error) {
      throw new Error('GROQ_API_ERROR');
    }
  }
}

export default new ChatbotService();
