import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email.'],
        unique: [true, 'Email already exists'],
        validate: validator.default.isEmail,
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
    },
    image: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: [true, 'Please enter your gender.'],
    },
    dob: {
        type: Date,
        required: [true, 'Please enter your date of birth'],
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
