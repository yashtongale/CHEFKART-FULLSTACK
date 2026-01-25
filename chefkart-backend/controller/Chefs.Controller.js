import ChefModel from '../models/Chef.Model.js';
import { cloudinary } from '../config/cloudinary.js';
import createError from 'http-errors';

/**
 * @desc    Create a new Chef
 * @route   POST /api/v1/chef/create
 * @access  Private (Admin)
 */
export const createChef = async (req, res, next) => {
    try {
        const chefData = req.body;

        // 1. Validation for essential fields
        const requiredFields = ['name', 'Address', 'city', 'email', 'phone', 'experience'];
        for (const field of requiredFields) {
            if (!chefData[field]) {
                return next(createError.BadRequest(`${field} is required`));
            }
        }

        // 2. Check uniqueness
        const existingChef = await ChefModel.findOne({ email: chefData.email });
        if (existingChef) {
            return next(createError.Conflict("Chef with this email already exists"));
        }

        // 3. Handle Profile Picture (Using Multer-Cloudinary middleware)
        if (req.file) {
            chefData.profilepic = req.file.path;
            chefData.imagePublicId = req.file.filename; // Important for deletion logic
        }

        // 4. Save to Database
        const newChef = await ChefModel.create(chefData);

        res.status(201).json({
            status: 'success',
            message: "Chef created successfully",
            data: newChef
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all chefs with optional filtering
 * @route   GET /api/v1/chef/all
 */
export const getAllChef = async (req, res, next) => {
    try {
        // Implementation of basic filtering (e.g., by city or veg status)
        const { city, veg } = req.query;
        let filter = {};
        if (city) filter.city = new RegExp(city, 'i');
        if (veg) filter.veg = veg === 'true';

        const chefs = await ChefModel.find(filter).sort({ starRating: -1 });

        res.status(200).json({
            status: 'success',
            results: chefs.length,
            data: chefs
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get chef by ID
 * @route   GET /api/v1/chef/:id
 */
export const getById = async (req, res, next) => {
    try {
        const chef = await ChefModel.findById(req.params.id);
        if (!chef) return next(createError.NotFound("Chef not found"));

        res.status(200).json({
            status: 'success',
            data: chef
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Update chef details
 * @route   PATCH /api/v1/chef/:id
 */
export const updateChef = async (req, res, next) => {
    try {
        const { id } = req.params;
        const chef = await ChefModel.findById(id);

        if (!chef) return next(createError.NotFound("Chef not found"));

        let updateData = { ...req.body };

        // Handle Image Update
        if (req.file) {
            // Delete old image from Cloudinary to save space
            if (chef.imagePublicId) {
                await cloudinary.uploader.destroy(chef.imagePublicId);
            }
            updateData.profilepic = req.file.path;
            updateData.imagePublicId = req.file.filename;
        }

        const updatedChef = await ChefModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            message: "Chef updated successfully",
            data: updatedChef
        });

    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Delete chef profile and Cloudinary image
 * @route   DELETE /api/v1/chef/:id
 */
export const deleteCheftById = async (req, res, next) => {
    try {
        const chef = await ChefModel.findById(req.params.id);
        if (!chef) return next(createError.NotFound("Chef not found"));

        // Delete from Cloudinary
        if (chef.imagePublicId) {
            await cloudinary.uploader.destroy(chef.imagePublicId);
        }

        await ChefModel.findByIdAndDelete(req.params.id);

        res.status(200).json({
            status: 'success',
            message: "Chef deleted successfully"
        });

    } catch (error) {
        next(error);
    }
};

// Internal utility: Be careful with 'DeleteAll' in production!
export const DeleteAllChef = async (req, res, next) => {
    try {
        // Note: This won't clean up Cloudinary images. 
        // In a real app, you should iterate and delete images first.
        await ChefModel.deleteMany();
        res.status(200).json({ status: 'success', message: "All chefs deleted" });
    } catch (error) {
        next(error);
    }
};