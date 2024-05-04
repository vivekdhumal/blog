import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 }).limit(20);

    res.status(200).json({
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  if (!req.params.userId) {
    return res.status(412).json({ message: "User id is missing" });
  }

  try {
    const user = await User.findById(req.params.userId, { password: 0 });

    res.status(200).json({
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!req.body) {
    return res.status(412).json({ message: "empty request" });
  }
  if (!req.body.name || req.body.name.trim().length == 0) {
    return res.status(412).json({ message: "Name field is required" });
  }
  if (!req.body.email || req.body.email.trim().length == 0) {
    return res.status(412).json({ message: "Email field is required" });
  }
  if (!emailRegex.test(req.body.email)) {
    return res.status(412).json({ message: "Email is invalid" });
  }

  try {
    const emailExists = await User.exists({ email: req.body.email.trim() });

    if (emailExists) {
      return res.status(412).json({ message: "Email is already been taken" });
    }
  } catch (error) {
    next(error);
  }

  if (!req.body.password || req.body.password.trim().length == 0) {
    return res.status(412).json({ message: "Password field is required" });
  }
  if (!req.body.is_admin) {
    return res.status(412).json({ message: "Is Admin field is required" });
  }

  try {
    const newPassword = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
      isAdmin: req.body.is_admin,
    });
    const user = await newUser.save();
    const { password, ...rest } = user._doc;

    return res.status(200).json({ message: "User created", user: rest });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  // console.log("user id", req.params.userId);
  if (!req.params.userId) {
    return res.status(412).json({ message: "User id is missing" });
  }
  if (!req.body) {
    return res.status(412).json({ message: "empty request" });
  }
  if (!req.body.name || req.body.name.trim().length == 0) {
    return res.status(412).json({ message: "Name field is required" });
  }
  if (!req.body.email || req.body.email.trim().length == 0) {
    return res.status(412).json({ message: "Email field is required" });
  }
  if (!emailRegex.test(req.body.email)) {
    return res.status(412).json({ message: "Email is invalid" });
  }

  try {
    console.log(req.params.userId);

    const emailExists = await User.findOne({
      email: req.body.email.trim(),
      _id: { $ne: req.params.userId },
    });

    // console.log("email exists ", emailExists);

    if (emailExists) {
      return res.status(412).json({ message: "Email is already been taken" });
    }
  } catch (error) {
    next(error);
  }

  if (!req.body.is_admin) {
    return res.status(412).json({ message: "Is Admin field is required" });
  }

  try {
    const user = await User.findById(req.params.userId);
    user.name = req.body.name;
    user.email = req.body.email;
    user.isAdmin = req.body.is_admin;
    await user.save();
    const { password, ...rest } = user._doc;

    return res.status(200).json({ message: "User updated", user: rest });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (!req.params.userId) {
    return res.status(412).json({ message: "User id is missing" });
  }

  try {
    const user = await User.findById(req.params.userId);
    if (user) {
      await user.deleteOne();
    } else {
      return res.status(412).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
