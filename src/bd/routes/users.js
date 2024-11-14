import express from "express";
import { addUser,getUser,updatePassword,deleteUser,login } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", addUser);
router.put("/:email", updatePassword);
router.delete("/:id", deleteUser);
router.login("/email", getUser);

 


export default router;
