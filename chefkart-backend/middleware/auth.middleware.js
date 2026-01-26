import jwt from 'jsonwebtoken';
import createError from 'http-errors';

const JWT_SECRET = process.env.JWT_SECRET || "belowisasecretkey";

/**
 * @desc    Middleware to verify JWT and attach user to the request
 */
export const verifyToken = (req, res, next) => {
    // 1. Get token from header
    const authHeader = req.headers.authorization;

    // 2. Check if header exists and starts with 'Bearer'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(createError.Unauthorized('Access denied, token missing or malformed'));
    }

    // 3. Extract the actual token string
    const token = authHeader.split(' ')[1];

    try {
        // 4. Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // 5. Attach user info to request (matches the ID field in our User model refactor)
        req.user = { id: decoded.id };

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);

        // Handle specific JWT errors for clearer frontend feedback
        if (error.name === 'TokenExpiredError') {
            return next(createError.Unauthorized('Your session has expired. Please log in again.'));
        }

        return next(createError.BadRequest('Invalid or tampered token'));
    }
};