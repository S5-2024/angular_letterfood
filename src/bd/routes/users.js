import express from "express";
import { addUser,getUser,updatePassword,deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUser);
router.post("/", addUser);
router.put("/:email", updatePassword);
router.delete("/:id", deleteUser);

 


export default router;
