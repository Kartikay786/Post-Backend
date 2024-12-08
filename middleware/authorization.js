import jwt from 'jsonwebtoken'

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Note: lowercase 'authorization'
    if (!token) {
        console.log(token);
        return res.status(401).json({ message: "Unauthorized" });
    }
   
    try {
        const decoded = jwt.verify(token, process.env.Secret_key);
        req.user ={
            userId : decoded._id,
            image : decoded.image,
            name : decoded.name
        };
         // Attach the decoded user data to req.user
         next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

export default authenticate;
