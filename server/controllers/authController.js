
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
//
import User from '../models/userModel.js'
import { errorHandler } from '../utils/error.js'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json('User created successfully!');
    } catch (error) {
      next(error);
    }
  };

  export const signin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'User not found'));
      }
  
      const validPassword = await bcrypt.compare(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(401, 'Wrong credentials!'));
      }
  
      const token = jwt.sign({ id: validUser._id },'midhun@2023', { expiresIn: '5d' });
      const { password: pass, ...rest } = validUser._doc;
      const responsePayload = {'accessToken': token, ...rest };
      res.cookie('accessToken', token, { httpOnly: true }).status(200).json(responsePayload);
    } catch (error) {
      next(error);
    }
  };
 
  export const google =async(req,res,next)=>{
    try {
      const user = await User.findOne({email:req.body.email})
      if(user){
        const token = jwt.sign({ id: validUser._id },'midhun@2023', { expiresIn: '5d' });
      const { password: pass, ...rest } = validUser._doc;
      res.cookie('accessToken', token, { httpOnly: true }).status(200).json(rest);
      }else{
        const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(generatedPassword,10);
        const newUser = new User({username:req.body.name.split(' ').join('').toLowerCase() + Math.random()
      .toString(36).slice(-4),email:req.body.email,password:hashedPassword,avatar:req.body.photo});
      await newUser.save();
      const token = jwt.sign({ id: newUser._id },'midhun@2023', { expiresIn: '5d' });
      const { password: pass, ...rest } = newUser._doc;
      res.cookie('accessToken', token, { httpOnly: true }).status(200).json(rest);
      }
    } catch (error) {
      next(error)
    }
  }
  export const signout=async(req,res,next)=>{
    try {
      res.clearCookie('accessToken');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  }