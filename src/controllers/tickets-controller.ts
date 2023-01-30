import { AuthenticatedRequest, handleApplicationErrors } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Ticket } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";

export async function postCreateOrUpdateTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const newTicket = await ticketsService.createOrUpdateTicket({
      ...(req.body as postCreateOrUpdateTicketBody),
      userId: req.userId,
    });

    return res.status(httpStatus.CREATED).send(newTicket);
  } catch (err) {
    return handleApplicationErrors(err, req, res);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.findTicketsTypes();

    return res.send(ticketsTypes);
  } catch (err) {
    return handleApplicationErrors(err, req, res);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const UserTicket = await ticketsService.findUserTicket(userId);

    return res.send(UserTicket);
  } catch (err) {
    return handleApplicationErrors(err, req, res);
  }
}

type postCreateOrUpdateTicketBody = Pick<Ticket, "ticketTypeId">;
