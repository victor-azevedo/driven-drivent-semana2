import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository, { CreateTicketParams, UpdateTicketParams } from "@/repositories/ticket-repository";
import { exclude } from "@/utils/prisma-utils";
import { Ticket } from "@prisma/client";

async function createOrUpdateTicket(params: CreateOrUpdateTicket) {
  const ticketTypeId = params.ticketTypeId;
  const status = "RESERVED";

  const enrollmentIdTicketsId = await enrollmentRepository.findUserEnrollmentIdAndTicketsId(params.userId);

  if (!enrollmentIdTicketsId.enrollmentId) {
    throw notFoundError();
  }

  const { enrollmentId, ticketsId } = enrollmentIdTicketsId;
  const id = ticketsId;

  const ticketToCreate: CreateTicketParams = { ticketTypeId, enrollmentId, status };
  const ticketToUpdate: UpdateTicketParams = { ticketTypeId, status };

  return ticketRepository.upsert(id, ticketToCreate, ticketToUpdate);
}

async function findTicketsTypes() {
  const ticketsTypes = await ticketRepository.findTicketsTypes();
  return ticketsTypes;
}

async function findUserTicket(userId: number) {
  const userTicket = await ticketRepository.findUserTicket(userId);

  if (!userTicket) {
    throw notFoundError();
  }

  return exclude(userTicket, "Payment", "Enrollment");
}

export type CreateOrUpdateTicket = Pick<Ticket, "ticketTypeId"> & { userId: number };

const ticketsService = {
  createOrUpdateTicket,
  findTicketsTypes,
  findUserTicket,
};

export default ticketsService;
