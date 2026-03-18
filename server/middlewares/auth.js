import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    let decodeData = jwt.verify(token,process.env.KEY);
    req.userId = decodeData?.id;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default auth;