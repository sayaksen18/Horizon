import express from "express";
import {isAuth} from "../middlewares/isAuth.js";
import {upload} from "../middlewares/multer.js";
import { analyzeResume } from "../controllers/interview.controller.js";
import { generateQuestion } from "../controllers/interview.controller.js";
import { submitAnswer } from "../controllers/interview.controller.js";
import {finishInterview} from "../controllers/interview.controller.js";
const interviewRouter = express.Router();

interviewRouter.post("/resume", isAuth, upload.single("resume"), analyzeResume);
interviewRouter.post("/generate-questions", isAuth,generateQuestion);
interviewRouter.post("/submit-answer", isAuth,submitAnswer);
interviewRouter.post("/finish", isAuth,finishInterview);
export default interviewRouter;