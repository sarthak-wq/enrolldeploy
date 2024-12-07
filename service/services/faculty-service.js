import UserModel from "../models/user.js";

// function to allow a faculty to edit his course details
export const editCourse = async (req) => {
    const facultyId = req.user.userId
    const courseOfferId = req.params.courseOfferId
    const updates = req.body;
    const faculty = await UserModel.findById(facultyId);

    if (!faculty || faculty.role !== 'Faculty') {
      return setNotFound('Faculty not found', res);
    }

    const courseIndex = faculty.coursesTaught.findIndex(c => c.courseOfferId === courseOfferId);

    if (courseIndex === -1) {
      return setNotFound('Course offering not found', res);
    }

    // Update only allowed fields
    const allowedUpdates = ['maxSeats', 'courseDescription', 'faculty', 'term',];
    allowedUpdates.forEach(field => {
      if (updates[field] !== undefined) {
        faculty.coursesTaught[courseIndex][field] = updates[field];
      }
    });
    await faculty.save();
    return faculty
}