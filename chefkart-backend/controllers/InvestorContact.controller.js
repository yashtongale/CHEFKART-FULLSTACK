import InvestorContact from "../models/InvestorContact.Model.js";
import createError from "http-errors";

/**
 * @desc    Submit a new investor inquiry
 * @route   POST /api/v1/investor-contact/create
 * @access  Public
 */
export const createInvestContact = async (req, res, next) => {
  try {
    const { fullname, email, city, message } = req.body;

    // 1. Validation
    if (!fullname || !email || !city || !message) {
      return next(createError.BadRequest("All fields are required."));
    }

    // 2. Check for existing inquiry using Email
    const existingInquiry = await InvestorContact.findOne({ email });
    if (existingInquiry) {
      return next(createError.Conflict("We have already received an inquiry from this email address."));
    }

    // 3. Save to Database (Using .create for cleaner code)
    const newInquiry = await InvestorContact.create({
      fullname,
      email,
      city,
      message,
    });

    res.status(201).json({
      status: "success",
      message: "Investor inquiry submitted successfully",
      data: newInquiry,
    });
  } catch (error) {
    next(error); // Passes MongoDB validation errors (like invalid email) to global handler
  }
};

/**
 * @desc    Get all investor inquiries
 * @route   GET /api/v1/investor-contact/all
 * @access  Private (Admin Only)
 */
export const getallInvestorContact = async (req, res, next) => {
  try {
    // Sort by newest first so admins see the latest inquiries at the top
    const inquiries = await InvestorContact.find().sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: inquiries.length,
      data: inquiries,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete an inquiry
 * @route   DELETE /api/v1/investor-contact/:id
 * @access  Private (Admin Only)
 */
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await InvestorContact.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      return next(createError.NotFound("Inquiry not found."));
    }

    res.status(200).json({
      status: "success",
      message: "Inquiry record deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};
