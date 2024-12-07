import { setServerError, setSuccess } from './../middleware/response-handler.js';
import chatbotService from './../services/chatbot-service.js';

class ChatbotController {
  async chat(req, res) {
    try {        
      const response = await chatbotService.getRecommendation(req);

      // Handle streaming response
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.flushHeaders();

      for await (const chunk of response) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      // Close the stream
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error) {
      console.error(error);
      setServerError(error, res);
    }
  }
}

export default new ChatbotController();
