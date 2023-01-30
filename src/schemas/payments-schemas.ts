import { CardData } from "@/protocols";
import { Payment } from "@prisma/client";
import Joi from "joi";

export const createPaymentSchema = Joi.object<CreatePayment>({
  ticketId: Joi.number().required(),
  cardData: Joi.object({
    issuer: Joi.string().valid("VISA", "MASTERCARD").required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    expirationDate: Joi.string().isoDate().required(),
    cvv: Joi.number().required(),
  }).required(),
});

type CreatePayment = Pick<Payment, "ticketId" & { cardData: CardData }>;
