import UserModel from "../models/user.js";

// Enrolling a student in a course
export const enrollInCourse = async (userId, courseData) => {
  if (!userId) {
    const error = new Error('Student ID is required');
    error.code = 400;
    throw error;
  }

  const student = await UserModel.findById(userId);
  // console.log(student)
  if (!student) {
    const error = new Error('Student not found');
    error.code = 404;
    throw error;
  }

  // Check if the student is already enrolled in the course
  const alreadyEnrolled = student.enrolledCourses.some(
    (enrollment) =>
      enrollment.courseOffer.courseOfferId === courseData.courseOffer.courseOfferId
  );

  if (alreadyEnrolled) {
    const error = new Error('Student is already enrolled in this course');
    error.code = 400;
    throw error;
  }

  // Add the course data to the enrolledCourses array
  student.enrolledCourses.push({
    courseOffer: courseData.courseOffer,
    enrollmentStatus: 'Enrolled',
  });
  // Save the updated student document
  try {
    return await student.save();
  } catch (err) {
    const error = new Error('Error saving student enrollment');
    error.code = 500;
    throw error;
  }
};