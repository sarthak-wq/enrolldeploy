import mongoose from 'mongoose';

// Define the Course Schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseCode: { type: String, required: true },
  prerequisites: [{ type: String }],
  courseDescription: {type: String, required: true}
});

// Define the Term Schema
const termSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  semester: { type: String, enum: ['SPRING', 'SUMMER', 'FALL'], required: true }
});

// Define the CourseOffer Schema
const courseOfferSchema = new mongoose.Schema({
  courseOfferId: { type: String, required: true },
  course: courseSchema,
  term: termSchema,
  faculty: { type: String, required: true },
  maxSeats: { type: Number, required: true }
});

const CourseOfferModel = mongoose.model('CourseOffer', courseOfferSchema);

export {courseOfferSchema, CourseOfferModel};
