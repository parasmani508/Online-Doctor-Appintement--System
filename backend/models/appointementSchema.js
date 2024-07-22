import mongoose from "mongoose";
import validator from "validator";


const appointementSchema= new mongoose.Schema({
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
    appointement_date:
    {
        type: String,
        required: true,
    },
    departement:
    {
        type: String,
        required: true,
    },
    doctor:
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    hasVisited:
    {
      type:Boolean,
      default:false,
    },
    doctorId:
    {
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    patientId:
    {
        type:mongoose.Schema.ObjectId,
        required:true,
    },
    address:
    {
        type:String,
        required:true,
    },
    status:
    {
     type:String,
     enum:["Pending","Accepted","Rejected"],
     default:"Pending",
    }
});

export const Appointement=mongoose.model("Appointement",appointementSchema);