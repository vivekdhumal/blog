import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async(req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password || email === '' || password === '') {
        return res.status(412).json({message: "All credentials are required"});
    }

    try {
        const validUser = await User.findOne({email});

        if(!validUser) {
            return res.status(400).json({message: "Email address does not exists"});
        }

        // console.log(password);
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if(!validPassword) {
            return res.status(400).json({message: "Invalid password"});
        }

        const tokenData = {
            id: validUser._id,
            name: validUser.name,
            email: validUser.email
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET);

        const {password: pass, ...rest} = validUser._doc;

        res.status(200)
            .json({ user: rest, token });

    } catch (error) {
        next(error);
    }
};