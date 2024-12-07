import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { courseOfferSchema } from './course.js'; 

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['Student', 'Faculty', 'Admin'],
      required: true
    },
    enrolledCourses: [
      {
        courseOffer: courseOfferSchema,
        enrollmentStatus: { type: String, enum: ['Enrolled', 'Completed', 'In Progress'] },
      },
    ],
    coursesTaught: [courseOfferSchema],
    profileImage: {
      type: String
    }
      
  }, { timestamps: true });

  // Hash password before saving the user
  userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Compare password
  userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };

const UserModel = mongoose.model('user', userSchema);
export default UserModel;