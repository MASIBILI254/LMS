import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req,res) => {
    const {name, email, password,role} = req.body;

    try {
        if(!name || !email || !password || !role) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}


export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'User not found'});
        }

        // compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }
        // generate JWT token

        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.status(200).json({message: 'Login successful', token, user: {id: user._id, name: user.name, email: user.email, role: user.role}});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}
// get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // exclude password field
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}
// add user
export const addUser = async (req, res) => {
    const {name, email, password, role} = req.body;

    try {
        if(!name || !email || !password || !role) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        // hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            role,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({message: 'User added successfully'});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}
//delete user

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json({message: 'User deleted successfully'});

    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}
//update user
export const updateUser = async (req, res) => {
    const {id} = req.params;
    const {name, email, role} = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, {name, email, role}, {new: true});
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        } 
        res.status(200).json({message: 'User updated successfully', user});
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}
// get user by id
export const getUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const user = await User.findById(id).select('-password'); // exclude password field
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
}  