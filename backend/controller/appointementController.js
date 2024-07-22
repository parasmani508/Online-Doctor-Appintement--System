import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Appointement } from "../models/appointementSchema.js";
import { User } from "../models/userSchema.js";

export const postAppointement = catchAsyncErrors(async (req, res, next) => {
    const{
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointement_date,
        departement,
        doctor_firstName,
        doctor_lastName,
        hasVisited,
        address
    } = req.body;
    if (
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !nic ||
        !dob ||
        !gender ||
        !appointement_date ||
        !departement ||
        !doctor_firstName ||
        !doctor_lastName ||
        !address
    ) {
        return next(new ErrorHandler("Please provide full form", 400));
    }
    const isConflict = await User.find({
        firstName: doctor_firstName,
        lastName: doctor_lastName,
        role: "Doctor",
        doctorDepartement: departement,
    });
    if (isConflict.length === 0) {
        return next(new ErrorHandler("Doctor not found", 400));
    }
    if (isConflict.length > 1) {
        return next(new ErrorHandler("Doctor Conflict Please Contact through Phone or Email",400));
    }
    const doctorId=isConflict[0]._id;
    const patientId=req.user._id;
    const appointement=await Appointement.create({
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        appointement_date,
        departement,
        doctor:
        {
            firstName:doctor_firstName,
            lastName:doctor_lastName,
        },
        hasVisited,
        address,
        doctorId,
        patientId,
    });
    res.status(200).json({
        success:true,
        message:"Appointement Sent Successfully",
        appointement
    });
});

export const getallAppointements=catchAsyncErrors(async(req,res,next)=>
{
    const appointements=await Appointement.find();
    res.status(200).json({
        success:true,
        appointements,
    })
});

export const updateAppointements=catchAsyncErrors(async(req,res,next)=>
{
    const {id}=req.params;
    let appointement=await Appointement.findById(id);
    if(!appointement)
        {
            return next (new ErrorHandler("Appointement Not found",404));
        }
        appointement=await Appointement.findByIdAndUpdate(id,req.body,
            {
                new:true,
                runValidators:true,
                useFindAndModify:false,
            }
        );
        res.status(200).json({
            success:true,
            message:"Appointement Status Updated",
            appointement
        })
});

export const deleteAppointements=catchAsyncErrors(async(req,res,next)=>
{
    const{id}=req.params;
    let appointement=await Appointement.findById(id);
    if(!appointement)
        {
            return next(new ErrorHandler("Appointement Not found",404));
        }
        await appointement.deleteOne();
        res.status(200).json({
            success:true,
            message:"Appointement deleted Successfully!",
            appointement

        })
})