// import mongoose from "mongoose";

// // course offer schema for the course details related
// const courseOfferSchema = new mongoose.Schema({
//   course: {
//     courseOfferId: { type: String, required: true, default: "6789" }, 
//     name: { type: String, required: true },
//     courseCode: { type: String, required: true },
//     prerequisites: [{ type: String }], // List of course codes
//   },
//   term: {
//     year: { type: Number, required: true },
//     semester: { type: String, enum: ["SPRING", "SUMMER", "FALL"], required: true },
//   },
//   instructor: { type: String, required: true },
//   maxSeats: { type: Number, required: true },
//   currentSeats: { type: Number, required: true },
// });

// // faculty schema to get the faculty details
// const facultySchema = new mongoose.Schema({
//   id: { type: String, unique: true, required: true },
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   coursesTaught: [courseOfferSchema],
// });

// const FacultyModel = mongoose.model("Faculty", facultySchema);

// export default FacultyModel;
