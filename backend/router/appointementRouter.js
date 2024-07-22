import express from "express";
import { deleteAppointements, getallAppointements, postAppointement, updateAppointements } from "../controller/appointementController.js";
import { isAdminAuthentication,isPatientAuthentication } from "../middlewares/auth.js";

const router=express.Router();
 

router.post("/post",isPatientAuthentication,postAppointement);
router.get("/getall",isAdminAuthentication,getallAppointements);
router.put("/update/:id",isAdminAuthentication,updateAppointements);
router.delete('/delete/:id',isAdminAuthentication,deleteAppointements);
export default router;