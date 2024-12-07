// import UserModel from "../models/user.js";
import User from "../models/user.js";

//Get user by ID
export const getUserById = async (studentId) => {
  return await User.findById(studentId);
};

//Get all users
export const getAllUsersService = async () => {
  try {
    const users = await User.find();  // Fetch all users from the database
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);  // Handle error in database interaction
  }
};

//update user's profile
export const updateUserProfile = async (req) => {
  let userId = req.user.userId;
  let updateData = req.body;

  // Validate that updateData is not empty
  if (!updateData || Object.keys(updateData).length === 0) {
    const error = new Error('Update data is required.');
    error.name = 'ValidationError';
    throw error;
  }

  // Find the user by ID
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('User not found.');
    error.code = 404;
    throw error;
  }

  // Update the user fields if provided in updateData
  if (updateData.firstName) user.firstName = updateData.firstName;
  if (updateData.lastName) user.lastName = updateData.lastName;
  if (updateData.email) user.email = updateData.email;

  // Save the updated user document
  await user.save();

  return user;
};

//delete user
export const deleteUserById = async (userId) => {
  // let userId = req.user.userId;
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

//update profile image
export const updateProfileImage = async (userId, file) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error('User not found');
  }

  const base64Image = file.buffer.toString('base64');
  user.profileImage = `data:${file.mimetype};base64,${base64Image}`;

  await user.save();

  return { message: 'Profile image uploaded successfully' };
};

//update password
  export const updateUserPassword = async (data) => {
    // Validate that updateData is not empty
    const updateData = data.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      throw new Error('NO_DATA');      
    }

    // Find the user by ID
    const user = await User.findOne({ email: updateData.email });

    if (!user) {
      throw new Error('NO_USER_DATA');      
    }

    const isMatch = await user.comparePassword(updateData.password);
    if (isMatch===true) {
      throw new Error('SAME_CREDENTIALS');      
    }
    
    // Update the user fields if provided in updateData
    if (updateData.password) user.password = updateData.password;   
  
    // Save the updated user document
    await user.save();  
    return;
  };