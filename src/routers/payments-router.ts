import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPaymentSchema } from "@/schemas";
import { getUserPayment, postCreateOrUpdatePayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateBody(createPaymentSchema), postCreateOrUpdatePayment)
  .get("/", getUserPayment);

export { paymentsRouter };
