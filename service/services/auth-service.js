import jwt from 'jsonwebtoken';
import User from './../models/user.js';

class AuthService {
  //Login API
  async login(data) {
    const user = await User.findOne({ email: data.email });
    if (!user) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new Error('INVALID_CREDENTIALS');
    }

    return this.generateToken(user);
  }

  //Signup API
  async signup(userData) {

    if(this.isValidEmail(userData.email)===false){
      throw new Error('INVALID_EMAIL');
    }

    const existingUser = await User.findOne({ email: userData.email });    

    if (existingUser) {
      throw new Error('USER_ALREADY_EXISTS');
    }

    if(!(userData.role==='Student' || userData.role==='Faculty' || userData.role==='Admin'))
    {
      throw new Error('INVALID_ROLE');
    }
    const user = new User(userData);
    await user.save();
    return;
  }

  //Validate Email
  isValidEmail(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    if(!(email==='')) { if(emailRegex.test(email)) { return true; } return false;}
  }

  //Generate JWT token
  generateToken(user) {
    return jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }
}

export default new AuthService();