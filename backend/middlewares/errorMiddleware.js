class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        // 11000 error occurs when if any duplicacy is occurs in the data
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`; //Get the keys of the error using object.keys
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "Json Web Token is invalid, Try Again";
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Json Web Token is Expired, Try Again";
        err = new ErrorHandler(message, 400);
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }



    // err.errors: This checks if the errors property exists on the err object. This is typically used for validation errors where multiple fields might have issues.
    // Object.values(err.errors): This converts the errors object into an array of its values.
    // .map(error => error.message): This maps over the array of errors, extracting the message property from each error object.
    // .join(" "): This joins all the error messages into a single string, separated by spaces.
    // : err.message: If err.errors does not exist, it falls back to using err.message, which is a single error message string.

    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join(" ") : err.message;
    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage,
    });
};

export default ErrorHandler;





// class ErrorHandler extends Error {
//     constructor(message, statusCode) {
//         super(message);
//         this.statusCode = statusCode;
//     }
// }

// export const errorMiddleware = (err, req, res, next) => {
//     err.message = err.message || "Internal Server Error";
//     err.statusCode = err.statusCode || 500;

//     if (err.code === 11000) {
//         const message = `Duplicate ${object.keys(err, keyValue)} Entered`;
//         err = new ErrorHandler(message, 400);
//     }
//     if (err.name === "JsonWebTokenError") {
//         const message = "Json Web Token is invalid,Try Again";
//         err = new ErrorHandler(message, 400)
//     }
//     if (err.name === "TokenExpiredError") {
//         const message = "Json Web Token is Expired,Try Again";
//         err = new ErrorHandler(message, 400)
//     }
//     if (err.name === "CastError") {
//         const message = `Invalid ${err.path}`;
//         err = new ErrorHandler(message, 400)
//     }


//     const errorMessage = err.errors ?
//         Object.values(err.errors)
//             .map(error => error.message)
//             .join(" ") : errorMessage
//     return res.status(err.statusCode).json({
//         success: false,
//         message: errorMessage,
//     });
// };

// export default ErrorHandler;


//  
