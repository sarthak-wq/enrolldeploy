import User from '../models/user.js';
import bcrypt from 'bcrypt';

// Service to get all users 
export const getAllUsersService = async () => {
  try {
    const users = await UserModel.find();  // Fetch all users from the database
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);  // Handle error in database interaction
  }
};

// Service to get a user by ID 
export const getUserByIdService = async (userId) => {
  try {
    const user = await UserModel.findById(userId);  // Fetch user by ID from the database
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);  // If user not found, throw error
    }
    return user;
  } catch (error) {
    throw new Error(error.message);  // Handle any error, like invalid ID format or database issues
  }
};


export const deleteSelectedUserService = async (userId) => {
  try {
    const user = await User.findById(userId); // Find user by ID

    if (!user) {
      return false; // If user not found, return false
    }

    await User.deleteOne({ _id: userId }); // Delete user by ID
    return true; // Return true if user was deleted

  } catch (error) {
    console.error("Error in deleteUserById:", error);
    throw new Error("Internal server error."); // Propagate error to controller
  }
};

