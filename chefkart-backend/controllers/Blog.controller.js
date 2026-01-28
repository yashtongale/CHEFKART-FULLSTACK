import Blog from '../models/Blog.Model.js';
import { cloudinary } from '../config/cloudinary.js';

/**
 * @desc    Create a new blog post
 * @route   POST /api/v1/blog/create
 * @access  Private (Admin)
 */
export const createBlog = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;

    // 1. Validation
    if (!title || !content || !category) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide title, content, and category.'
      });
    }

    // 2. Check Duplicates
    const existingBlog = await Blog.findOne({ title });
    if (existingBlog) {
      return res.status(409).json({
        status: 'fail',
        message: 'A blog with this title already exists.'
      });
    }

    // 3. Handle Image Upload (Multer Middleware puts file in req.file)
    let imageUrl = '';
    let imagePublicId = '';

    if (req.file) {
      // The file is ALREADY uploaded to Cloudinary by the route middleware
      imageUrl = req.file.path;
      imagePublicId = req.file.filename; // We save this to delete it later if needed
    } else {
      return res.status(400).json({
        status: 'fail',
        message: 'Blog image is required.'
      });
    }

    // 4. Create Blog
    const newBlog = await Blog.create({
      title,
      content,
      category,
      image: imageUrl,
      imagePublicId, // Store this so we can delete the image from Cloudinary later
    });

    res.status(201).json({
      status: 'success',
      message: 'Blog created successfully',
      data: newBlog,
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

/**
 * @desc    Get all blogs
 * @route   GET /api/v1/blog/getall
 * @access  Public
 */
// export const getAllBlogs = async (req, res, next) => {
//   try {
//     // Optional: Add pagination later (page, limit)
//     // const blogs = await Blog.find().sort({ createdAt: -1 }); // Newest first

//     // res.status(200).json({
//     //   status: 'success',
//     //   results: blogs.length,
//     //   data: blogs,
//     // });
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // 2. Fetch from DB
//     // Use .lean() for faster GET requests (it returns plain JS objects)
//     const blogs = await Blog.find()
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .lean();

//     // 3. Get total count for frontend pagination logic
//     const totalBlogs = await Blog.countDocuments();

//     // 4. Robust Response
//     res.status(200).json({
//       status: 'success',
//       results: blogs.length,
//       total: totalBlogs,
//       pagination: {
//         current_page: page,
//         total_pages: Math.ceil(totalBlogs / limit)
//       },
//       data: blogs,
//     });
//   } catch (error) {
//     console.error("🔥 Error in getAllBlogs:", error.message);
//     next(error);
//   }
// };
// backend/controllers/Blog.controller.js

// backend/controllers/Blog.controller.js
export const getAllBlogs = async (req, res, next) => {
  try {
    console.log("Attempting to fetch blogs...");
    const blogs = await Blog.find();
    console.log("Blogs found:", blogs.length);

    res.status(200).json({
      status: 'success',
      data: blogs,
    });
  } catch (error) {
    // This will print the EXACT reason for the 500 error in your terminal
    console.error("CRITICAL BACKEND ERROR:", error);
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

/**
 * @desc    Get single blog
 * @route   GET /api/v1/blog/get/:id
 * @access  Public
 */
export const getBlogById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog post not found.'
      });
    }
    console.log(blog);

    res.status(200).json({
      status: 'success',
      data: blog,
    });
  } catch (error) {
    console.error("🔥 Error in getBlogById:", error.message);
    next(error);
  }
};

/**
 * @desc    Update a blog
 * @route   PUT /api/v1/blog/update/:id
 * @access  Private (Admin)
 */
export const updateBlog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    // 1. Find existing blog
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog post not found.'
      });
    }

    // 2. Prepare Update Object
    const updateData = { title, content, category };

    // 3. Handle Image Update (If new file uploaded)
    if (req.file) {
      // OPTIONAL: Delete old image from Cloudinary to save space
      if (blog.imagePublicId) {
        await cloudinary.uploader.destroy(blog.imagePublicId);
      }

      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    // 4. Update
    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Blog updated successfully',
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a blog
 * @route   DELETE /api/v1/blog/delete/:id
 * @access  Private (Admin)
 */
export const deleteBlog = async (req, res, next) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        status: 'fail',
        message: 'Blog post not found.'
      });
    }

    // 1. Delete Image from Cloudinary (Clean up storage)
    if (blog.imagePublicId) {
      await cloudinary.uploader.destroy(blog.imagePublicId);
    }

    // 2. Delete from DB
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
