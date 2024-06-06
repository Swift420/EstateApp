import express from 'express';
import jwt from 'jsonwebtoken';


export const shouldbeLoggedIn = (req, res) => {
            console.log(req.userId);
        res.status(200).json({ message: "User is authenticated" });


}

export const shouldbeAdmin = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token not valid" });
        }
        if (!user.isAdmin) {
            return res.status(403).json({ message: "User is not admin" });
        }
        res.status(200).json({ message: "User is authenticated" });
    });
}