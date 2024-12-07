import authService from './../services/auth-service.js';
import { setConflict, setServerError, setSuccess, setUnauthorized, setNewRecordCreatedSuccess,setRoleError, setUnprocessableEntity } from './../middleware/response-handler.js';
import jwt from 'jsonwebtoken'; 

class AuthController {
  // Calling the login API
  async login(req, res) {
    try {

      const accessToken = await authService.login(req.body);

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });  

      const decodedToken = jwt.decode(accessToken);
      setSuccess({
        userId: decodedToken.userId,
        role: decodedToken.role   
      }, res);
    } catch (error) {
      if (error.message === 'INVALID_CREDENTIALS') {
        setUnauthorized(res);
      } else {
        setServerError(error, res);
      }
    }
  }

  //Calling the signup API
  async signup(req, res) {
    try {
      const token = await authService.signup(req.body);       
      setNewRecordCreatedSuccess(token,res);
    } catch (error) {
      if (error.message === 'USER_ALREADY_EXISTS') {
        setConflict(res);
      }else if (error.message === 'INVALID_ROLE') {
        setRoleError(res);
      } 
      else if (error.message === 'INVALID_EMAIL') {
        setUnprocessableEntity(res);
      } 
      else {
        setServerError(error, res);
      }
    }
  }

  //Calling the logout API
  async logout (req, res) {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.status(200).json({ message: 'Logged out successfully' });
  };
}


export default new AuthController();
