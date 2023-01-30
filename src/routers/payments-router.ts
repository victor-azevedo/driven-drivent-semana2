import { Router } from "express";
import { authenticateToken, validateBody, validateQuery } from "@/middlewares";
import { createPaymentSchema, queryPaymentSchema } from "@/schemas";
import { getUserPayment, postCreateOrUpdatePayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", validateBody(createPaymentSchema), postCreateOrUpdatePayment)
  .get("/", validateQuery(queryPaymentSchema), getUserPayment);

export { paymentsRouter };
