import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import createError from "http-errors";

const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key_2026";

/**
 * @desc    Generate a secure JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" }); // Extended to 7 days for better UX
};

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/signup
 */
export const UserSignup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // 1. Validation
    if (!name || !email || !password) {
      return next(createError.BadRequest("Please provide name, email, and password."));
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError.Conflict("An account with this email already exists."));
    }

    // 3. Create User 
    // (Bcrypt hashing is handled automatically by the pre-save hook in User.model.js)
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // 4. Generate Token
    const token = generateToken(newUser._id);

    res.status(201).json({
      status: "success",
      message: "Registration successful",
      token,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/v1/auth/login
 */
export const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // 1. Validation
    if (!email || !password) {
      return next(createError.BadRequest("Please provide email and password."));
    }

    // 2. Find user & include password (since we set select: false in the model)
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return next(createError.Unauthorized("Invalid email or password."));
    }

    // 3. Generate Token
    const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      message: "Login successful",
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};
