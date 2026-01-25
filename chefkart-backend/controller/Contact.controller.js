import Contact from "../models/Contact.Models.js";
import createError from "http-errors";

/**
 * @desc    Submit a new contact/inquiry form
 * @route   POST /api/v1/investor-contact/create
 * @access  Public
 */
export const createContact = async (req, res, next) => {
  try {
    const { name, phone, email, city, area } = req.body;

    // 1. Strict Validation
    if (!name || !phone || !email || !city || !area) {
      return next(createError.BadRequest("All fields (name, phone, email, city, area) are required."));
    }

    // 2. Check for existing inquiry (Prevents double submissions)
    // We check by email to ensure we don't spam the database with the same user
    const existingInquiry = await Contact.findOne({ email });
    if (existingInquiry) {
      return next(createError.Conflict("We have already received an inquiry from this email address."));
    }

    // 3. Create new Contact (Fixed the 'new Blog' bug from original code)
    const newContact = await Contact.create({
      name,
      phone,
      email,
      city,
      area
    });

    res.status(201).json({
      status: "success",
      message: "Your inquiry has been submitted successfully. Our team will contact you soon.",
      data: newContact,
    });
  } catch (error) {
    // Passes database validation errors (like invalid email format) to the global handler
    next(error);
  }
};

/**
 * @desc    Get all contact inquiries
 * @route   GET /api/v1/investor-contact/all
 * @access  Private (Admin Only)
 */
export const getallContact = async (req, res, next) => {
  try {
    // Sort by newest first so admins see the latest leads at the top
    const contacts = await Contact.find().sort({ createdAt: -1 });

    if (!contacts.length) {
      return res.status(200).json({
        status: "success",
        message: "No contact inquiries found at the moment.",
        data: []
      });
    }

    res.status(200).json({
      status: "success",
      results: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a contact inquiry
 * @route   DELETE /api/v1/investor-contact/:id
 * @access  Private (Admin Only)
 */
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return next(createError.NotFound("Inquiry record not found."));
    }

    res.status(200).json({
      status: "success",
      message: "Inquiry record deleted successfully."
    });
  } catch (error) {
    next(error);
  }
};