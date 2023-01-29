import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { getTicketsTypes, getUserTicket, postCreateOrUpdateTicket } from "@/controllers";
import { createTicketSchema } from "@/schemas";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createTicketSchema), postCreateOrUpdateTicket)
  .get("/types", getTicketsTypes)
  .get("/", getUserTicket);

export { ticketsRouter };
