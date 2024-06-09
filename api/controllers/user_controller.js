import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {

  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
}

export const getUser = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {password,avatar, ...inputs} = req.body;  
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "You can only update your own user" });
    }
    try {
        let updatedPassword = null;
        if(password){
          const salt = bcrypt.genSaltSync(10);
          const updatedPassword = bcrypt.hashSync(password, salt);
          inputs.password = updatedPassword;
        }
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: { 
            ...inputs,
            ...(updatedPassword && {password: updatedPassword}),
            ...(avatar && {avatar})
        },
      });

      const {password: userPassword, ...rest} = updatedUser

      res.status(200).json(rest);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    if (id !== tokenUserId) {
        return res.status(403).json({ message: "You can only delete your own user" });
      }
    try {
      const users = await prisma.user.delete({
        where: {
            id: id,
            },
      });
      res.status(200).json({ message: "User Deleted" });
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }