import express from "express";
import score from "./score/score.routes";

const router = express.Router();

router.use("/score", score);

export default router;
