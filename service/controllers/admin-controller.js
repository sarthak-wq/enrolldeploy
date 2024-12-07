import * as adminService from '../services/admin-service.js';
import * as userService from '../services/user-service.js'
import { 
  setSuccess, 
  setServerError, 
} from '../middleware/response-handler.js';

// Get all users 
export const getAllUsers = async (req, res) => {
  try {
    const users = await adminService.getAllUsersService();
    setSuccess(users, res);
  } catch (error) {
    setServerError(error, res);
  }
};

// Get user by ID 
export const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await adminService.getUserByIdService(userId);
    if (!user) {
      return res.status(404).json({ message: `User with ID ${userId} not found.` });
    }
    setSuccess(user, res);
  } catch (error) {
    setServerError(error, res);
  }
};


export const deleteUserProfile = async (req, res) => {
  try {
    // Extract userId from the route parameters
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required.",
      });
    }

    // Call the service to delete the user by ID
    const isDeleted = await adminService.deleteSelectedUserService(userId, res);

    if (isDeleted) {
      return res.status(200).json({
        message: `User with ID ${userId} deleted successfully.`,
      }); 
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
