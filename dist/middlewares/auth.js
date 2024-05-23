import ErrorHandler from '../utils/utilityClass.js';
//Middleware to make sure only admin is allowed
export const adminOnly = async (request, response, next) => {
    try {
        const user = request.user;
        if (user.role !== 'admin') {
            return next(new ErrorHandler('You are not admin.', 401));
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
};
export const loggedInOnly = (request, response, next) => {
    try {
        if (!request.isAuthenticated()) {
            return response.status(401).json({
                success: false,
                message: 'You are not logged in',
            });
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
};
