import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; 
    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "UNAUTHORIZED - Token is not provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ error: "UNAUTHORIZED - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({error: "USER NOT FOUND"});
    }

    req.user = user

    next();

  } catch (error) {
    console.log(`ERROR IN PROTECT ROUTE MIDDLEWARE: ${error.message}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "INTERNAL SERVER ERROR" });
  }
};

export default protectRoute;