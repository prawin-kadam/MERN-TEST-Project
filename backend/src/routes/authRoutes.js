import express from "express";

import { login,logout,register,fetchAllUser } from "../Controller/authController.js";

const router = express.Router();

router.post("/login",login);
router.post("/logout",logout);
router.post("/register",register);
router.get("/users",fetchAllUser);


export default router ;