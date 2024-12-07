import * as userService from "./../services/user-service.js";
import { setServerError, setSuccess } from "../middleware/response-handler.js";


export const getUserProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({
        code: 404,
        message: 'User not found.',
      });
    }
    res.status(200).json(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(400).json({
        code: 400,
        message: 'Invalid user ID format.',
      });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Internal server error.',
      });
    }
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsersService();
    setSuccess(users, res);
  } catch (error) {
    setServerError(error, res);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await userService.updateUserProfile(req);
    if (!updatedUser) {
      return res.status(404).json({
        code: 404,
        message: 'User not found.',
      });
    }
    res.status(200).json({
      message: 'Profile updated successfully.',
      updatedUser,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(400).json({
        code: 400,
        message: 'Validation error. Please check the request body.',
      });
    } else if (err.name === 'CastError') {
      res.status(400).json({
        code: 400,
        message: 'Invalid user ID format.',
      });
    } else {
      res.status(500).json({
        code: 500,
        message: 'Internal server error.',
      });
    }
  }};


export const deleteUserProfile = async (req, res) => {
  try {
    // Extract userId from the request body
    const { userId } = req.body;

    console.log(userId);
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    // Call the service to delete the user by ID
    const isDeleted = await userService.deleteUserById(userId);

    if (isDeleted) {
      return res.status(204).send(); // No Content
    } else {
      return res.status(404).json({
        message: `User with ID ${userId} not found.`,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);

    res.status(500).json({
      message: "An unexpected error occurred.",
    });
  }
};



  export const updateUserPassword = async (req, res) => {
    try {
      const updatedUser = await userService.updateUserPassword(req);
      res.status(201).json({
        code: "Success",
        message: "Record created successfully."
      });
    }catch (error) {   
      if (error.message === 'NO_USER_DATA') {
        res.status(400).json({
          code: 400,
          message: 'Email does not exist in our database.',
        }); 
      }
      else if (error.message === 'SAME_CREDENTIALS') {
        res.status(400).json({
          code: 400,
          message: 'New password cannot be the same as the current password.',
        });
      } else {
        res.status(500).json({
          code: 500,
          message: 'Internal server error.',
        });
      }
    }
  };

  export const createUser = async (req, res, next) => {
    try {
      const student = await studentService.createUser(req.body);
      res.status(201).json({
        id: student._id,
        message: 'Student added successfully.',
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        res.status(400).json({
          code: 400,
          message: 'Validation error. Please check the request body.',
        });
      } else {
        res.status(500).json({
          code: 500,
          message: 'Internal server error.',
        });
      }
    }
  };

export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const result = await userService.updateProfileImage(req.user.userId, req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading profile image', error: error.message });
  }
};