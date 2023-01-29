import { CreateTicketParams } from "@/repositories/ticket-repository";
import Joi from "joi";

export const createTicketSchema = Joi.object<CreateTicketParams>({
  ticketTypeId: Joi.number().required(),
});
