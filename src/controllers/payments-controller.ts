import { AuthenticatedRequest } from "@/middlewares";
import paymentsService, { CreateOrUpdatePaymentBody } from "@/services/payments-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateOrUpdatePayment(req: AuthenticatedRequest, res: Response) {
  try {
    const newPayment = await paymentsService.createOrUpdatePayment({
      ...(req.body as CreateOrUpdatePaymentBody),
      userId: req.userId,
    });

    return res.status(httpStatus.CREATED).send(newPayment);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
