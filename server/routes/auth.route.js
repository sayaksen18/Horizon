import express from "express";
import { auth } from "../../client/src/utils/firebase";
import { googleAuth, logout } from "../controllers/auth.controller";

const authRouter = express.Router();


authRouter.post("/google", googleAuth);
authRouter.post("/logout", logout);


export default authRouter;