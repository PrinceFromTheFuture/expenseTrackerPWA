import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.log("jwt secret is not defined!");
        return;
    }
    const token = req.cookies.token;
    if (!token) {
        res.json({ success: false, messages: "access denied acess token must be provided" });
        return;
    }
    const decodedToken = jwt.verify(token, jwtSecret);
    req.userId = decodedToken.userId;
    next();
};
export default authMiddleware;
