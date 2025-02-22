const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Get all users
// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.status(200).json({
//             success: true,
//             count: users.length,
//             data: users
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             error: 'Server Error'
//         });
//     }
// };

// Get single user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.id });
        // .select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};


exports.updateUserScore = async (req, res) => {
    try {
        const { score } = req.body;
        const userId = parseInt(req.params.id); // Convert to number
        console.log("Score type:", typeof score);
        console.log("User ID type:", typeof userId);

        if (isNaN(userId)) {
            return res.status(400).json({
                success: false,
                error: "Invalid user ID format"
            });
        }

        // Ensure score is a number
        const scoreNumber = parseFloat(score);
        if (isNaN(scoreNumber)) {
            return res.status(400).json({
                success: false,
                error: "Invalid score format"
            });
        }

        const user = await User.findOneAndUpdate(
            { id: userId },  // Find user by numeric ID
            { $set: { score: scoreNumber } }, // Update only the score field
            { new: true, runValidators: true } // Return updated user, apply schema validation
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};


// Create user
exports.createUser = async (req, res) => {
    try {
        const { name, userName, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email already registered'
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        // Remove password from response
        user.password = undefined;

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update user
exports.updateUser = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
};
