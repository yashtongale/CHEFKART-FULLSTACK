import Join from "../models/Join.model.js";
import { cloudinary } from "../config/cloudinary.js";
import createError from "http-errors";

/**
 * @desc    Create a new recruitment/careers post
 * @route   POST /api/v1/join/create
 * @access  Private (Admin)
 */
export const createJoin = async (req, res, next) => {
  try {
    const { title, content } = req.body;

    // 1. Validation
    if (!title || !content) {
      return next(createError.BadRequest("Title and content are required."));
    }

    // 2. Check existence
    const existingData = await Join.findOne({ title });
    if (existingData) {
      return next(createError.Conflict("A recruitment post with this title already exists."));
    }

    // 3. Handle Image (processed via Multer middleware)
    let imageUrl = "";
    let imagePublicId = "";

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    } else {
      return next(createError.BadRequest("An image is required for this post."));
    }

    // 4. Save to DB
    const newPost = await Join.create({
      title,
      content,
      image: imageUrl,
      imagePublicId
    });

    res.status(201).json({
      status: "success",
      message: "Join post created successfully",
      data: newPost,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all recruitment posts
 * @route   GET /api/v1/join/all
 */
export const getallJoins = async (req, res, next) => {
  try {
    const posts = await Join.find().sort({ createdAt: -1 });

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
 * @desc    Get single recruitment post by ID
 * @route   GET /api/v1/join/:id
 */
export const getJoinById = async (req, res, next) => {
  try {
    const post = await Join.findById(req.params.id);
    if (!post) return next(createError.NotFound("Post not found."));

    res.status(200).json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update recruitment post
 * @route   PATCH /api/v1/join/:id
 */
export const updateJoins = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Join.findById(id);

    if (!post) return next(createError.NotFound("Post not found."));

    let updateData = { ...req.body };

    // Handle Image Update
    if (req.file) {
      // Delete old image from Cloudinary
      if (post.imagePublicId) {
        await cloudinary.uploader.destroy(post.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedPost = await Join.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      message: "Recruitment post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete recruitment post and clean storage
 * @route   DELETE /api/v1/join/:id
 */
export const deleteJoin = async (req, res, next) => {
  try {
    const post = await Join.findById(req.params.id);
    if (!post) return next(createError.NotFound("Post not found."));

    // Cleanup Cloudinary storage
    if (post.imagePublicId) {
      await cloudinary.uploader.destroy(post.imagePublicId);
    }

    await Join.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Post deleted successfully from database and cloud storage.",
    });
  } catch (error) {
    next(error);
  }
};