import { CreatePatientController } from "@/controllers/CreatePatientController";
import { DeletePatientController } from "@/controllers/DeletePatientController";
// import { GetPatientController } from "@/controllers/GetPatientController";
// import { ListPatientController } from "@/controllers/ListPatientController";
import { UpdatePatientController } from "@/controllers/UpdatePatientController";
import { Router } from "express";

const router = Router();
const createPatient = new CreatePatientController();
const updatePatient = new UpdatePatientController();
const deletePatient = new DeletePatientController();
// const listPatient = new ListPatientController();
// const getPatient = new GetPatientController();

// router.get("/", listPatient.execute);
// router.get("/:id", getPatient.execute);
router.post("/", createPatient.execute);
router.put("/:id", updatePatient.execute);
router.delete("/:id", deletePatient.execute);

export default router;
