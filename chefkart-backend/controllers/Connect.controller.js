import Connect from "../models/Connect.model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Create a new Connect post
 * @route   POST /api/v1/connect/create
 * @access  Private
 */
export const createConnect = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // 1. Validation
    if (!title || !content) {
      return next(createError.BadRequest("Title and content are required"));
    }

    // 2. Check existence
    const existingData = await Connect.findOne({ title });
    if (existingData) {
      return next(createError.Conflict("This post already exists"));
    }

    // 3. Handle Image (Multer-Cloudinary middleware handles the upload)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    } else {
      return next(createError.BadRequest("Post image is required"));
    }

    // 4. Save to DB
    const newPost = await Connect.create({
      title,
      content,
      image: imageUrl,
      imagePublicId, // For future deletion
    });

    res.status(201).json({
      status: "success",
      message: "Connect post created successfully",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all Connect posts
 * @route   GET /api/v1/connect/all
 */
export const getallConnect = async (req, res, next) => {
  try {
    const posts = await Connect.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single Connect post
 * @route   GET /api/v1/connect/:id
 */
export const getConnectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Connect.findById(id);

    if (!post) {
      return next(createError.NotFound("Post not found"));
    }

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update Connect post
 * @route   PATCH /api/v1/connect/:id
 */
export const updateConnect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Connect.findById(id);

    if (!post) {
      return next(createError.NotFound("Post not found"));
    }

    let updateData = { ...req.body };

    // Handle Image Update
    if (req.file) {
      // Remove old image from Cloudinary
      if (post.imagePublicId) {
        await cloudinary.uploader.destroy(post.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedPost = await Connect.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete Connect post
 * @route   DELETE /api/v1/connect/:id
 */
export const deleteConnect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Connect.findById(id);

    if (!post) {
      return next(createError.NotFound("Post not found"));
    }

    // Clean up Cloudinary storage
    if (post.imagePublicId) {
      await cloudinary.uploader.destroy(post.imagePublicId);
    }

    await Connect.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
