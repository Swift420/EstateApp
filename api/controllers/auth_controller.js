import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const registerController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // hash password with bcrypt

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    console.log(newUser);

    // create a new user and save to db

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User creation failed" });
  }
};

export const loginController = async (req, res) => {
  const { username, password } = req.body;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    // if user does not exist, return error
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // check if password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: 3600000000,
    });

    const {password: userPassword, ...userinfo} = user;

    // send token to user
    res.cookie("token", token, {
      httpOnly: true,
    //   sameSite: "strict",
      maxAge: 3600000000,
    }).status(200).json({ message: userinfo});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login failed" });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "Logout successful" });
};
