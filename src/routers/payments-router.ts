import { Router } from "express";
import { authenticateToken, validateQuery } from "@/middlewares";
import { queryPaymentSchema } from "@/schemas";
import { getUserPayment, postCreateOrUpdatePayment } from "@/controllers/payments-controller";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .post("/process", postCreateOrUpdatePayment)
  .get("/", validateQuery(queryPaymentSchema), getUserPayment);

export { paymentsRouter };
