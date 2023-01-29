import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { createPaymentSchema } from "@/schemas";

const paymentsRouter = Router();

paymentsRouter.all("/*", authenticateToken).post("/process", validateBody(createPaymentSchema));

export { paymentsRouter };
