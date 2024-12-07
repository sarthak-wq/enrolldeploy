import express from "express";
import authController from "./../controllers/authController.js";
import { authenticateUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();
router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.post('/',authController.logout);
router.post('/check-auth', authenticateUser);

export default router;