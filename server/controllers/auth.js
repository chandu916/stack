import Jwt  from "jsonwebtoken"
import bcrypt from 'bcryptjs'
import users from '../models/auth.js'

const ACCESS_TOKEN_EXPIRES_IN = '5m';

const signAccessToken = (user) =>
    Jwt.sign({ email: user.email, id: user._id }, process.env.KEY, {
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });


export const signup = async (req, res ) =>{
    const { name, email, password }=req.body;

    try{
        const existinguser = await users.findOne({ email });
        if(existinguser) {
            return res.status(404).json({ message: "User already Exist."})
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const newUser = await users.create({name, email, password: hashedPassword})
    const token = signAccessToken(newUser)
    res.status(200).json({result: newUser, token})

    }catch(error) {
        res.status(500).json("Something went worng...")
}
}

export const login = async (req, res ) =>{
    const {email, password }=req.body;
    try{
        const existinguser = await users.findOne({email})
        if(!existinguser){
            console.log(existinguser)
            return res.status(404).json({message:"user don't Exist"})
        }
        const isPassword = await bcrypt.compare(password, existinguser.password)
        if(!isPassword){
            return res.status(400).json({message:"Invalid creditionals"})
        }
                const token = signAccessToken(existinguser)
                res.status(200).json({result: existinguser, token})
    } catch (error) {
        console.error(error); 
            res.status(500).json('Internal Server Error');
    }
            
}

export const refreshToken = async (req, res) => {
    try {
        const currentUser = await users.findById(req.userId);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const token = signAccessToken(currentUser);
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to refresh token' });
    }
};

