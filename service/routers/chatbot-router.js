import express from "express";
import chatbotController from "../controllers/chatbot-controller.js";
import { authenticateUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.post('/', authenticateUser, chatbotController.chat);

export default router;