import express from "express";
import * as courseController from "../controllers/course-controller.js";
import { authenticateUser } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.route("/").get(authenticateUser, courseController.getAllCourses)

//Add course
router.post("/newCourse",authenticateUser, courseController.createCourse);

//delete course
router.delete("/deleteCourse",authenticateUser, courseController.deleteCourse);

//update course
router.patch("/updateCourse",authenticateUser, courseController.updateCourse);

//get courseoffer details
router.route("/:courseOfferId").get(authenticateUser, courseController.getCourseDetails)

export default router;