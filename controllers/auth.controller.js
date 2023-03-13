const jwt = require("jsonwebtoken");
require("dotenv").config();

const newToken = (user) => {
  const accessToken = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7m",
  });
  const refreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
};

const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    // console.log(req.body.email);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send("User already exists");
    }
    // Mailer(req.body.email);
    user = await User.create(req.body);
    return res.status(201).send(user);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("User does not exist, please sign up");
    }

    let match = user.comparePassword(req.body.password);
    // if (user.password !== req.body.password) {
    if (!match) {
      return res
        .status(400)
        .send("email and password do not match, please try again");
    }
    let token = newToken(user);
    res.status(200).send({ user, token });
  } catch (error) {
    // console.log(error);
    res.status(500).send(error.message);
  }
};

const RefreshToken = (req, res) => {
  const refreshToken = req.body.token;
  if (!refreshToken)
    return res.status(401).send({ message: "token refresh failed" });

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const tokens = newToken(user);
    res.status(201).send({ message: "token refreshed successfully", tokens });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = { register, login, RefreshToken };
