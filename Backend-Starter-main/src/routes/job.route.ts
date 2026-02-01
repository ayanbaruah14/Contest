import express from "express";
import { addJob, recommendJobs, applyJob, getAllJobs, getJobApplicants } from "../controllers/job.controller.js";

const router = express.Router();

router.post("/add", addJob);
router.get("/", getAllJobs);
router.get("/recommend/:userId", recommendJobs);
router.get("/:jobId/applicants", getJobApplicants);
router.post("/apply", applyJob);

export default router;

