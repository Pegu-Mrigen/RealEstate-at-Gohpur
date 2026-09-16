import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (req.user && req.user.isBlocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked, contact support team!",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token invalid!",
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: "Access denied! You don't have permission.",
      });
    }
    next();
  };
};
