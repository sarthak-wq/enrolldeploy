import * as courseService from "../services/course-service.js";
import { setSuccess, setServerError, setBadRequest } from "../middleware/response-handler.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await courseService.getAll();
    setSuccess(courses, res);
  } catch (error) {
    console.error("Error in getAllCourses:", error);
    setServerError(error, res);
  }
};
export const getCourseDetails = async (req, res) => {
  try {
    const course = await courseService.getById(req.params.courseOfferId);
    if (!course) {
      return setNotFound("Course not found", res);
    }
    setSuccess(course, res);
  } catch (error) {
    setServerError(error, res);
  }
};

export const createCourse = async (req, res) => {
  try {
    const newCourse = await courseService.createNewCourse(req.body);
    console.log(req)
    setSuccess(newCourse, res, 201);
  } catch (error) {
    if (error.name === 'ValidationError') {
      setBadRequest(error.message, res);
    } else {
      setServerError(error, res);
    }
  }
};

export const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await courseService.update(req.params.courseOfferId, req.body);
    if (!updatedCourse) {
      return setNotFound("Course not found", res);
    }
    setSuccess("Course updated successfully!", res);
  } catch (error) {
    setServerError(error, res);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await courseService.deleteSelectedCourse(req.params.courseOfferId);
    if (!deletedCourse) {
      return setNotFound("Course not found", res);
    }
    setSuccess({ message: "Course deleted successfully" }, res);
  } catch (error) {
    setServerError(error, res);
  }
};

export const registerForCourse = async (req, res) => {
  try {
    const registeredCourse = await courseService.register(req.params.courseOfferId);
    if (!registeredCourse) {
      return setNotFound("Course not found or no seats available", res);
    }
    setSuccess({ message: "Successfully registered for the course", course: registeredCourse }, res);
  } catch (error) {
    if (error.message === "No seats available") {
      setBadRequest(error.message, res);
    } else {
      setServerError(error, res);
    }
  }
};