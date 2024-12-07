import express from "express";
import * as studentController from "./../controllers/student-controller.js";
import { authenticateUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// Enroll in a Course
router.post('/', authenticateUser, studentController.enrollInCourse);

export default router;
