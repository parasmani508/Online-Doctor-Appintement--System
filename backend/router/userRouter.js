import express from "express";
import { addNewDoctor, getAllDoctors,logoutAdmin,logoutPatient,patientRegister } from "../controller/userController.js";
import { login } from "../controller/userController.js";
import { addNewAdmin } from "../controller/userController.js";
import { isAdminAuthentication,isPatientAuthentication } from "../middlewares/auth.js";
import { getUserDetails } from "../controller/userController.js";

const router=express.Router();

router.post("/patient/register",patientRegister);
router.post("/login",login);
router.post("/admin/addnew",isAdminAuthentication,addNewAdmin);
router.get("/doctors",getAllDoctors);
router.get("/admin/me",isAdminAuthentication,getUserDetails);
router.get("/patient/me",isPatientAuthentication,getUserDetails);
router.get("/admin/logout",isAdminAuthentication,logoutAdmin);
router.get("/patient/logout",isPatientAuthentication,logoutPatient);
router.post("/doctor/addnew",isAdminAuthentication,addNewDoctor)
export default router;