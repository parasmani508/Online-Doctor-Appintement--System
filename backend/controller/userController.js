import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from '../utils/jwtToken.js';
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender
        || !dob || !nic || !role
    ) {
        return next(new ErrorHandler("Please Fill Full Form"), 400);
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already register"), 400);
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role,
    });
    generateToken(user, "User Register", 200, res);
    // res.status(200).json({
    //     sucess: true,
    //     message: "User Register"
    // })


})


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password and Confirm Password do not match", 400))
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password or Email", 400))
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Password or Email"), 400);
    }
    if (role !== user.role) {
        return next(new ErrorHandler("User with this role not found"), 400);
    }
    // res.status(200).json({
    //     sucess: true,
    //     message: "User Login Sucessfully"
    // })
    generateToken(user, "Login Sucessfully", 200, res)
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,

    } = req.body;
    if (!firstName || !lastName || !email || !phone || !password || !gender
        || !dob || !nic
    ) {
        return next(new ErrorHandler("Please Fill Full Form"), 400);
    }
    const isRegister = await User.findOne({ email });
    if (isRegister) {
        return next(new ErrorHandler(`${isRegister.role} Already Exist with this Mail`));
    }
    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role: "Admin"
    })
    res.status(200).json({
        success: true,
        message: "New Admin Register",
    })
});
export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });
    res.status(200).json({
        success: true,
        doctors,
    })
})
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({ success: true, user })
})


export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("adminToken", "",
        {
            httpOnly: true,
            expires: new Date(Date.now()),
        }
    ).json({
        success: true,
        message: "Admin Log Out Successfully!"
    })
})

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("patientToken", "",
        {
            httpOnly: true,
            expires: new Date(Date.now()),
        }
    ).json({
        success: true,
        message: "User Log Out Successfully!"
    })
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Doctor Avatar Required", 400));
    }
    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File format not supported", 400));

    }
    const
        {
            firstName,
            lastName,
            email,
            phone,
            password,
            gender,
            dob,
            nic,
            doctorDepartement,
            
        } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nic ||
        !doctorDepartement||
        !docAvatar
    ) {
        return next(new ErrorHandler("Please Provide all Details", 400))
    }
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already register with this email!`, 400));
    }

    // Post image on cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
        docAvatar.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.error("Cloudinary Error", cloudinaryResponse.error || "Unknown cloudinary error")
    }
    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        doctorDepartement,
        role: "Doctor",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
        },
    });

    res.status(200).json({
        success: true,
        message: "New Doctor Register",
        doctor
    })


});