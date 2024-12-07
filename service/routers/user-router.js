import express from "express";
import * as userController from "./../controllers/user-controller.js";
import { authenticateUser } from "../middleware/AuthMiddleware.js";
import { upload } from "./../middleware/uploadMiddleware.js";

const router = express.Router();

// Get All Users
router.get('/getAllUsers', authenticateUser, userController.getAllUsers);

// Get User own Profile
router.get('/profile', authenticateUser, userController.getUserProfile);

// Update User ownProfile
router.put('/profile', authenticateUser, userController.updateUserProfile);

// Upload User Profile Image
router.put('/profile/image', authenticateUser, upload.single('profileImage'), userController.updateProfileImage);

// Delete User's own Profile
router.delete('/profile`', authenticateUser, userController.deleteUserProfile);

// Reset user password
router.patch('/resetpassword', userController.updateUserPassword);

export default router;
