import mongoose from "mongoose";
import validator from "validator";

const messageSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:[3,"First name must contain at least 3 character"]
    },
    lastName:{
        type:String,
        required:true,
        minLength:[3,"Last name must contain at least 3 character"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"Provide valid email"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"Phone-No Must Contain exact 10 digits"],
        maxLength:[10,"Phone-No Contain exact 10 digits"]
    },
    message:{
        type:String,
        required:true,
        // minLength:[10,"Must contain at least 10 character"]
    },
});
export const Message=mongoose.model("Message",messageSchema);