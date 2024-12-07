import express from "express";
import * as facultyController from "../controllers/faculty-controller.js";
import { authenticateUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

// test api to add course data to faculty member
router.route("/")
  .post(authenticateUser,facultyController.addFacultyCourse); // Add course for a faculty member

// route to get faculty's courses taught
router.route("/:facultyId/courses")
  .get(facultyController.getFacultyCourses); // Get Faculty Courses

// Route to edit course details
router.route("/:courseOfferId/edit")
  .patch(authenticateUser, facultyController.editCourseDetails); // Allows faculty to edit their courses

export default router;
