import { User } from '../models/user.js';
import ErrorHandler from '../utils/utilityClass.js';
import { rm } from 'fs';
import mongoose from 'mongoose';
import { hashPassword } from '../utils/password.js';
import { CLIENT_URL } from '../routes/authRoute.js';
export const registerUser = async (request, response, next) => {
    try {
        const { username, email, gender, password, dob, role } = request.body;
        const image = request.file;
        if (!username || !email || !gender || !password || !dob) {
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
            username,
            email,
            gender,
            image: image?.path || 'assets/MK.png',
            password: await hashPassword(password),
            dob: new Date(dob),
            role,
        });
        return response.status(201).json({
            success: true,
            message: `Welcome to the MKShop ${user.username.toUpperCase()}`,
        });
    }
    catch (error) {
        return next(error);
    }
};
export const updateUser = async (request, response, next) => {
    try {
        const { _id, username, email, password, dob, gender } = request.body;
        let user = await User.findById(_id);
        if (!user) {
            return next(new ErrorHandler('User not found', 404));
        }
        const image = request.file;
        if (image) {
            rm(user.image, () => {
                console.log(`${user?.username}'s old image deleted successfully`);
            });
            user.image = image.path;
        }
        if (username) {
            user.username = username;
        }
        if (email) {
            user.email = email;
        }
        if (password) {
            try {
                user.password = (await hashPassword(password));
            }
            catch (error) {
                return next(error);
            }
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
            user,
            message: `${user.username.toUpperCase()}'s profile data updated successfully.`,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllUsers = async (request, response, next) => {
    try {
        const users = await User.find({});
        const allUsers = users.map((user) => {
            return {
                username: user.username,
                email: user.email,
                image: user.image,
                gender: user.gender,
                role: user.role,
                dob: user.dob,
                _id: user._id,
                password: user.password,
            };
        });
        response.status(200).json({
            success: true,
            message: 'List of all users',
            users: allUsers,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteUser = async (request, response, next) => {
    try {
        const _id = request.params.userId;
        const user = await User.findById(new mongoose.Types.ObjectId(_id));
        if (!user) {
            return next(new ErrorHandler('Invalid id, user not found.', 404));
        }
        rm(user.image, () => {
            console.log(` ${user.username}'s image deleted successfully.`);
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
export const getLoginFailed = (request, response, next) => {
    try {
        response.redirect(`${CLIENT_URL}`);
        // return response.status(400).json({
        //   success: false,
        //   message: 'Not able to log in. Try again later.',
        // });
    }
    catch (error) {
        return next;
    }
};
export const verifyUser = async (request, response, next) => {
    try {
        const { username, email, gender, dob, password } = request.body;
        if (!username || !email || !gender || !dob) {
            return next(new ErrorHandler('Enter all the fields correctly.', 400));
        }
        const user = await User.findOne({
            username,
            email,
            dob: new Date(dob),
            gender,
        });
        if (!user) {
            return next(new ErrorHandler('No such user exists.', 404));
        }
        if (password) {
            try {
                user.password = (await hashPassword(password));
            }
            catch (error) {
                return next(error);
            }
        }
        user.save();
        return response.status(200).json({
            success: true,
            user,
            message: 'Please login with your new password.',
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getLoginSuccess = (request, response, next) => {
    try {
        console.log('login success', request.isAuthenticated());
        console.log('login success', request.user);
        console.log('Login success endpoint hit');
        console.log('Request headers:', request.headers);
        console.log('Request body:', request.body);
        if (!request.user) {
            return next(new ErrorHandler('User not logged in.', 400));
        }
        console.log(request.user);
        const { _id, username, image, role, email, password, gender, age, dob, createdAt, updatedAt, } = request.user;
        return response.status(202).json({
            success: true,
            user: {
                _id,
                username,
                image,
                role,
                email,
                password,
                gender,
                age,
                dob,
                createdAt,
                updatedAt,
            },
            message: 'Logged in successfully.',
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getLoginNotify = (request, response, next) => {
    try {
        return response.status(200).json({
            success: true,
            message: 'Please login for better experience.',
        });
    }
    catch (error) {
        return next(error);
    }
};
export const getLogout = (request, response, next) => {
    try {
        request.logout((logoutError) => {
            if (logoutError) {
                return next(logoutError);
            }
            request.session.destroy((err) => {
                if (err) {
                    return next(err);
                }
                response.clearCookie('connect.sid', { path: '/' });
                return response.status(202).json({
                    success: true,
                    message: 'Logged out successfully.',
                });
            });
        });
    }
    catch (error) {
        return next(error);
    }
};
