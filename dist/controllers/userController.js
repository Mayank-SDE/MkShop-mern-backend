import { User } from '../models/user.js';
import { TryCatch } from '../middlewares/error.js';
import bcrypt from 'bcrypt';
export const registerUser = TryCatch(async (request, response, next) => {
    const { name, email, gender, image, password, dob } = request.body;
    let user = await User.findOne({ email });
    if (user) {
        return response.status(409).json({
            success: false,
            message: 'Email already exists',
        });
    }
    user = await User.create({
        name,
        email,
        gender,
        image,
        password: bcrypt.hashSync(password, 10),
        dob: new Date(dob),
    });
    response.status(201).json({
        success: true,
        message: `Welcome to the MKShop ${user.name}`,
        user,
    });
});
export const loginUser = TryCatch(async (request, response, next) => {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user) {
        return response.status(404).json({
            success: false,
            message: 'Email is not registered.',
        });
    }
    const passwordMatching = bcrypt.compareSync(password, user.password);
    if (!passwordMatching) {
        return response.status(401).json({
            success: false,
            message: 'Invalid password',
        });
    }
    return response.status(200).json({
        success: true,
        message: `Welcome back ${user.name}`,
    });
});
