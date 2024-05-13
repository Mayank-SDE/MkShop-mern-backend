import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import ErrorHandler from '../utils/utilityClass.js';
import { rm } from 'fs';
export const registerUser = async (request, response, next) => {
    try {
        const { name, email, gender, password, dob, role } = request.body;
        const image = request.file;
        if (!name || !email || !gender || !password || !dob) {
            rm(image?.path, () => {
                console.log('File deleted');
            });
            return next(new ErrorHandler('Please add the required fields', 400));
        }
        let user = await User.findOne({ email });
        if (user) {
            rm(image?.path, () => {
                console.log('File deleted');
            });
            return next(new ErrorHandler('Email already exists', 409));
        }
        user = await User.create({
            name,
            email,
            gender,
            image: image?.path,
            password: bcrypt.hashSync(password, 10),
            dob: new Date(dob),
            role,
        });
        return response.status(201).json({
            success: true,
            message: `Welcome to the MKShop ${user.name.toUpperCase()}`,
            user,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const loginUser = async (request, response, next) => {
    try {
        const { email, password } = request.body;
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler('Email is not registered', 404));
        }
        const passwordMatching = bcrypt.compareSync(password, user.password);
        if (!passwordMatching) {
            return next(new ErrorHandler('Invalid password', 401));
        }
        return response.status(200).json({
            success: true,
            message: `Welcome back ${user.name.toUpperCase()}`,
            user,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const updateUser = async (request, response, next) => {
    try {
        const { name, email, password, dob, gender } = request.body;
        const _id = request.params.userId;
        let user = await User.findById(_id);
        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }
        const image = request.file;
        if (image) {
            rm(user.image, () => {
                console.log(`${user?.name}'s old image deleted successfully`);
            });
        }
        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            user.password = bcrypt.hashSync(password, 10);
        }
        if (dob) {
            user.dob = dob;
        }
        if (gender) {
            user.gender = gender;
        }
        await user.save();
        return response.status(201).json({
            success: true,
            message: `${user.name.toUpperCase()}'s profile data updated successfully.`,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllUsers = async (request, response, next) => {
    try {
        const users = await User.find({});
        response.status(200).json({
            success: true,
            message: 'List of all users',
            users,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteUser = async (request, response, next) => {
    try {
        const _id = request.params.userId;
        const user = await User.findById(_id);
        if (!user) {
            return next(new ErrorHandler('Invalid id, user not found.', 404));
        }
        rm(user.image, () => {
            console.log(` ${user.name}'s image deleted successfully.`);
        });
        await user.deleteOne();
        return response.status(202).json({
            success: true,
            message: 'User Deleted successfully.',
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getSingleUser = async (request, response, next) => {
    try {
        const _id = request.params.userId;
        const user = await User.findById(_id);
        if (!user) {
            return next(new ErrorHandler('User not found.', 404));
        }
        return response.status(200).json({
            success: true,
            message: 'user profile',
            user,
        });
    }
    catch (error) {
        return next(error);
    }
};
