import ErrorHandler from "./errorMiddleware.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";



export const isAdminAuthentication = catchAsyncErrors(async(req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHandler("Admin not Authenticated", 400));

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);


    // Authorization
    if (req.user.role !== "Admin") {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorised for this resources`, 403
            )
        );
    }
    next();
});


export const isPatientAuthentication = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHandler("Patient not Authenticated", 400));

    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);

    // Authorization

    if (req.user.role !== "Patient") {
        return next(
            new ErrorHandler(
                `${req.user.role} not authorised for this resources`, 403
            )
        );
    }
    next();
});
