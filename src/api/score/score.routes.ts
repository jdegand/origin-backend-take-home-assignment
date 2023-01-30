import { Response, Request } from "express";
import { ApplicantDataSchema } from "../../../interfaces/ApplicantData";
import { validate } from "../../middlewares";
import { Router } from "express";
import { getScore } from "../../utils/functions";
import { RiskProfile } from "../../../interfaces/RiskProfile";

const router = Router();

// if more routes - could make separate score.handlers.ts

router.post(
  "/",
  validate(ApplicantDataSchema),
  (req: Request, res: Response): Response<RiskProfile> => {
    return res.json(getScore(req.body));
  }
);

export default router;
