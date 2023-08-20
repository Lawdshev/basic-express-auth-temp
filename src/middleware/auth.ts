const jwt = require('jsonwebtoken');
import { Request, Response } from "express";
import User from "../schemas/userSchema";

module.exports = async function authenticateToken(req: Request, res: Response, next:() => void) {
  // Get the token from the request headers
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token is missing.' });
  }

  try {
    // Verify the token with your access token secret
    const decoded = jwt.verify(token, 'your_access_token_secret');

    // Check if the user exists and is not revoked
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }

    // Attach the user object to the request for use in protected routes
    (req as any).user = user;

    next(); // Continue to the protected route
  } catch (error) {
    return res.status(403).json({ message: 'Access denied. Invalid token.' });
  }
};
