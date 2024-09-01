import httpStatus from "http-status";
import User from "../models/user.model.js";
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user?._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(httpStatus.OK).json(filteredUsers);

  } catch (error) {
    console.log(`ERROR IN GET USERS FOR SIDEBAR CONTROLLER: ${error.message}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "INTERNAL SERVER ERROR" });
  }
};
