import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 character"]
    },
    lastName: {
        type: String,
        required: true,
        minLength: [3, "Last name must contain at least 3 character"]
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide valid email"]
    },
    phone: {
        type: String,
        required: true,
        minLength: [10, "Must Contain exact 10 digits"],
        maxLength: [10, "Must Contain exact 10 digits"]
    },
    nic: {
        type: String,
        required: true,
        minLength: [10, "Nic must contain at least 10 character"]
    },
    dob:
    {
        type: Date,
        required: [true, "DOB is required"]
    },
    gender:
    {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    password:
    {
        type: String,
        minLength: [8, "Passwod must contain at least 8 character!"],
        required: true,
        select: false //Get all the details of user except password 
    },
    role:
    {
        type: String,
        required: true,
        enum: ["Admin", "Patient", "Doctor"],
    },
    doctorDepartement:
    {
        type: String
    },
    docAvatar:
    {
        public_id: String,
        url: String,
    }
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

// Login: When a user logs in, the server generates a session token or authentication token and sends it to the client as a cookie. 
// This token is used to identify the user in subsequent requests.
userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES,
    });
};





export const User = mongoose.model("User", userSchema);