import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token not valid" });
        }
        req.userId = user.id;

        next();
    });

}