export const errorMiddleware = (error, request, response, next) => {
    error.message || (error.message = 'Internal server error.');
    error.statusCode || (error.statusCode = 500);
    return response.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
};
/*
export const TryCatch = (controllerFunction: ControllerType) => {
  return (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(controllerFunction(request, response, next)).catch(
      (error) => {
        next(error);
      }
    );
  };
};
*/
