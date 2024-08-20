const { Router } = require('express');
const { register, Login, updateProfile } = require('../controllers/user');
const auth = require('../middleware/auth');


const  userRouter   =  Router();

userRouter.post('/register' , register );
userRouter.post('/login' , Login );
userRouter.patch('/updateProfile' ,auth, updateProfile );

module.exports = userRouter;