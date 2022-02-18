const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 16);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = await newUser.getSignedToken(newUser._id);
    req.user = newUser;

    return res.status(201).json({
      user: newUser,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = await user.getSignedToken(user._id);
    req.user = user;

    return res.status(200).json({
      user: user,
      token: `Bearer ${token}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { register, login };
