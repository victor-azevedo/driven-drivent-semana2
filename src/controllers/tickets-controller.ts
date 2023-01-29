import { AuthenticatedRequest } from "@/middlewares";
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

    return res.send(newTicket);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketsTypes = await ticketsService.findTicketsTypes();

    return res.send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const ticketsTypes = await ticketsService.findUserTicket(userId);

    return res.send(ticketsTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

type postCreateOrUpdateTicketBody = Pick<Ticket, "ticketTypeId">;
