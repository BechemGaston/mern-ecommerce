import express from 'express';
import bycrypt from 'bcrypt';
import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import { generateToken } from '../utils.js';


const userRouter = express.Router();

userRouter.post(
    '/signin',
    asyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        if(user) {
            if (bycrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return;
            }
        }
        res.status(401).send({message: "Invalid email or password"})
    })
)

export default userRouter;