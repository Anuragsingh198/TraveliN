const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const JWT_SECRET = 'sdfghjkqwertyuiozxcvbnm';

const tryCatch = require('./cotrrrollerUtils/trycatch'); // Fixed the typo in the path

const register = tryCatch(async (req, res) => {
    const { name, email, password } = req.body;

    // Password length validation should be consistent with the message
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must contain at least 8 characters' });
    }

    const emailLowerCase = email.toLowerCase();
    const existUser = await User.findOne({ email: emailLowerCase });
    if (existUser) {
        return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        name,
        email: emailLowerCase,
        password: hashedPassword,
    });

    const { _id: id, photoUrl } = user;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ success: true, result: { id, name, email: user.email, photoUrl, token } });
});



const  Login = tryCatch(async(req, res) =>{
    const { email, password } = req.body;
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: 'Password must contain at least 8 characters' });
    }
    const emailLowerCase = email.toLowerCase();
    const existUser = await User.findOne({ email: emailLowerCase });
    if (!existUser) {
        return res.status(400).json({ success: false, message: "User  dosen't exists" });
    }
    const correctPassword = await bcrypt.compare(password, existUser.password);
    if(!correctPassword) { return res.status(400).json({ success: false, message: "Invalid credentials" });}
    const { _id: id,  name, photoUrl } = existUser;
    const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, result: { id, name, email: emailLowerCase, photoUrl, token } });
});



 const  updateProfile  =  tryCatch(async(req, res)=>{
        const  updateUser =  await  User.findByIdAndUpdate(req.user.id ,  req.body , {new :true})
        const {_id:id , name ,  photoUrl} = updateUser
        //  update alll the  rooms  record  added by user
        const token = jwt.sign({ id, name, photoUrl }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ success: true, result: {name, photoUrl, token } });

 })

module.exports = {
    register,
    Login,
    updateProfile,
};
