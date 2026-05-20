const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // For generating secure random tokens
const nodemailer = require('nodemailer'); // For sending emails

// Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, company } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = await User.create({
            name,
            email,
            company,
            password: hashedPassword
        });

        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token, user });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Send Reset Link
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist." });
        }

        // 1. Generate secure reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 Hour validation
        await user.save();

        // 2. Create the real clickable link pointing to your frontend UI route
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // 3. Configure the Nodemailer Transporter using your .env keys
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // true for port 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // 4. Draft the HTML layout for the email inbox
        const mailOptions = {
            from: `"LeadGenie Security" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "LeadGenie - Password Reset Request",
            html: `
                <div style="font-family: sans-serif; padding: 20px; max-width: 600px; background-color: #f9f9f9; border-radius: 12px;">
                    <h2 style="color: #140b2d;">Password Reset Request</h2>
                    <p>Hello ${user.name},</p>
                    <p>We received a request to reset your LeadGenie account password. Click the secure button below to choose a new password. This link is valid for 1 hour.</p>
                    <div style="margin: 30px 0;">
                        <a href="${resetUrl}" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">Reset My Password</a>
                    </div>
                    <p style="color: #666; font-size: 12px;">If you didn't request this, you can safely ignore this email.</p>
                </div>
            `
        };

        // 5. Fire off the email execution
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "A password reset link has been dispatched to your inbox." });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Failed to dispatch recovery email. Please check server configuration." });
    }
};

// Reset the Actual Password 
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // Find user where token matches and has not expired
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Password reset token is invalid or has expired." });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear the token fields so they can't be reused
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password has been successfully reset!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};