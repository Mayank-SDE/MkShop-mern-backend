import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema({
    googleId: String,
    githubId: String,
    githubProfileURL: String,
    username: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Pleease specify your email address'],
        validate: validator.default.isEmail,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    image: {
        type: String,
        default: 'assets/MK.png',
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Please specify your gender'],
        default: 'other',
    },
    dob: {
        type: Date,
        required: [true, 'Please enter the data of birth.'],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true,
});
userSchema.virtual('age').get(function () {
    const today = new Date();
    const dateOfBirth = this.dob;
    let age = today.getFullYear() - dateOfBirth.getFullYear();
    if (today.getMonth() < dateOfBirth.getMonth() ||
        (today.getMonth() === dateOfBirth.getMonth() &&
            today.getDate() < dateOfBirth.getDate())) {
        age--;
    }
    return age;
});
export const User = mongoose.model('User', userSchema);
