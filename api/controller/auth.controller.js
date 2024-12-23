import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  const { email, password, name, avatar } = req.body;
  try {
    if (!email || !password || !name) {
      res.status(400).json({ message: "Not all fields are filled" });
    }
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(500).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = new User({ email, password: hash, name, avatar });
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: "Registration error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const candidate = await User.findOne({ email });
    if (!candidate) {
      res.status(404).json({ message: "User not found" });
    }
    const validatePassword = await bcrypt.compare(password, candidate.password);
    if (!validatePassword) {
      res.status(404).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: candidate._id }, "secret", {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      token,
      user: {
        id: candidate._id,
        email: candidate.email,
        name: candidate.name,
        avatar: candidate.avatar,
      },
    });
  } catch (e) {
    res.status(500).json({ message: "Login error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout success" });
  } catch (e) {
    res.status(500).json({ message: "Logout error" });
  }
};
