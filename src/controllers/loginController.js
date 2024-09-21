require('dotenv').config();
const bcrypt = require('bcrypt');
const jose = require('jose');
const logger = require("../lib/logs");
const { getUser } = require("../services/getUser");

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Bad Request",
                message: "Incorrect email or password"
            })
        }

        // Check exisitng user from the DB
        const existingUser = await getUser(email);
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                data: null,
                error: "Not found",
                message: "User not found"
            })
        }

        if (!existingUser.isActive) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Inactive Account",
                message: "Account is currently inactive"
            })
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Incorrect email or password",
                message: "Incorrect email or password"
            })
        }

        // JWT token
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = 'HS256';

        const jwt = await new jose.SignJWT({
            id: existingUser.id,
            role: existingUser.role
        })
        .setProtectedHeader({ alg })
        .setExpirationTime('2h')
        .setSubject(existingUser.id.toString())
        .sign(secret);

        const data = {
            jwt,
            user: {
                userId: existingUser.id,
                role: existingUser.role,
                email: existingUser.email,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                isActive: existingUser.isActive
            }
        }

        res.status(200).json({
            success: true,
            data,
            error: null,
            message: "Successfully logged in"
        })
    } catch (error) {
        logger.error(error);
        res.status(500).json({
            success: false,
            data: null,
            error: error.message,
            message: "Failed to login"
        })
    }
}

module.exports = {
    loginController,
}