import { CourseOfferModel } from "../models/course.js";


export const createNewCourse = async (courseData) => {
  console.log("hiiiii",courseData)
  const newCourse = new CourseOfferModel(courseData);
  return newCourse.save();
};

export const getAll = async () => {
    try {
      const courses = await CourseOfferModel.find({});
      return courses;
    } catch (error) {
      console.error("Error fetching courses:", error);
      throw error;
    }
  };

export const getById = async (courseOfferId) => {
  return CourseOfferModel.findOne({ "course.courseOfferId": courseOfferId });
};

export const update = async (courseOfferId, updateData) => {
  return CourseOfferModel.findOneAndUpdate(
    { "course.courseOfferId": courseOfferId },
    updateData,
    { new: true, runValidators: true }
  );
};

export const deleteSelectedCourse = async (courseOfferId) => {
  console.log("courseoffer",courseOfferId)
  return CourseOfferModel.findOneAndDelete({ "course.courseOfferId": courseOfferId });
};

export const register = async (courseOfferId) => {
  const course = await CourseOfferModel.findOne({ "course.courseOfferId": courseOfferId });
  if (!course) {
    return null;
  }
  if (course.currentSeats >= course.maxSeats) {
    throw new Error("No seats available");
  }
  course.currentSeats += 1;
  return course.save();
};