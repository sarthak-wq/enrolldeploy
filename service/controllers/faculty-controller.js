import * as facultyService from "../services/faculty-service.js";
import { setSuccess, setServerError, setBadRequest, setNotFound, setServiceUnavailable } from "../middleware/response-handler.js";
// import UserModel from "../models/user.js";

// function to get the list of all faculties
export const getFacultyList = async (req, res) => {
  try {
    const facultyList = await facultyService.getAll();
    setSuccess(facultyList, res);
  } catch (error) {
    setServiceUnavailable(res); // for service issues (e.g. database down)
  }
};

// function to get a particular faculty details
export const getFacultyDetails = async (req, res) => {
  try {
    const faculty = await facultyService.getById(req.params.facultyId);
    if (!faculty) {
      return setNotFound("Faculty not found", res);
    }
    setSuccess(faculty, res);
  } catch (error) {
    if (error.message === 'Course not found' || error.message === 'Faculty not found') {
      setNotFound("Faculty or course not found", res);
    } else {
      setServerError(error, res);
    }
  }
};

// function to add faculty course
export const addFacultyCourse = async (req, res) => {
  try {
    if (!req.body.course) {
      return setBadRequest("Course is required", res);
    }
    const course = await facultyService.addCourse(req.user.userId, req.body);
    if (!course) {
      return setNotFound("Faculty not found", res);
    }
    setSuccess(course, res, 201);
  } catch (error) {
    if (error.message === 'Course not found' || error.message === 'Faculty not found') {
      setNotFound("Faculty or course not found", res);
    } else {
      setServerError(error, res);
    }
  }
};


// function to get all courses belonging to a faculty
export const getFacultyCourses = async (req, res) => {
  try {
    const faculty = await facultyService.getById(req.params.facultyId);
    if (!faculty) {
      return setNotFound('Faculty not found', res);
    }

    setSuccess(faculty.coursesTaught, res);
  } catch (error) {
    if (error.message === 'Course not found' || error.message === 'Faculty not found') {
      setNotFound("Faculty or course not found", res);
    } else {
      setServerError(error, res);
    }
  }
};

// function to allow professor to edit their course details
export const editCourseDetails = async (req, res) => {
  try {
    const faculty = await facultyService.editCourse(req)
    setSuccess({ message: 'Course offering updated successfully', course: faculty.coursesTaught[req.params.courseOfferId] }, res);
  } catch (error) {
    if (error.message === 'Course not found' || error.message === 'Faculty not found') {
      setNotFound("Faculty or course not found", res);
    } else {
      setServerError(error, res);
    }
  }
};

