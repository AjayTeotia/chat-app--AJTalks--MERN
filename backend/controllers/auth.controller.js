import httpStatus from "http-status";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// Signup User Route
export const signup = async (req, res) => {
  /*console.log("SIGNUP ROUTE");
  res.send("Signup User") */

  if (!req.body) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ error: "Request body is missing." });
  }

  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    // Check details are filled or not
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "Please Provide" });
    }

    // Check Password is match or not
    if (password !== confirmPassword) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Passwords do not match." });
    }

    //Check user name exist or not
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ error: "User already exists." });
    }

    // HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profil Pic for girls and boys
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    // Creating new user
    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      confirmPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    // Save new user data
    await newUser.save();

    if (newUser) {
      //Generate JWT Token here
      generateTokenAndSetCookie(newUser._id, res);

      res.status(httpStatus.CREATED).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "INTERNAL SERVER ERROR" });
    }
  } catch (error) {
    console.log(`ERROR IN SIGNUP CONTROLLER: ${error.message}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Login User Route
export const login = async (req, res) => {
  /*console.log("LOGIN ROUTE");
  res.send("Login User"); */

  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    // decrpyt password and
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    // Entered username and password are correct or not
    if (!userName || !isPasswordCorrect) {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: "Invalid username or password" });
    }

    //Generate JWT Token here
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });

    //console.log("LOGIN SUCCESSFUL");

  } catch (error) {
    console.log(`ERROR IN LOGIN CONTROLLER: ${error.message}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "INTERNAL SERVER ERROR" });
  }
};

// Logout User Route
export const logout = (req, res) => {
  /*console.log("LOGOUT ROUTE");
  res.send("Logout User");*/

  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(httpStatus.OK).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`ERROR IN LOGOUT CONTROLLER: ${error.message}`);
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: "INTERNAL SERVER ERROR" });
  }
};
