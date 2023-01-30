import { prisma } from "@/config";
import { Ticket, TicketType } from "@prisma/client";

async function findTicketsTypes(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

async function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: { equals: userId },
      },
    },
    include: { TicketType: true, Payment: true },
  });
}

async function upsert(
  id: number,
  createdTicket: CreateTicketParams,
  updatedTicket: UpdateTicketParams,
): Promise<Ticket & { TicketType: TicketType }> {
  return prisma.ticket.upsert({
    where: {
      id,
    },
    create: createdTicket,
    update: updatedTicket,
    include: { TicketType: true },
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;
export type UpdateTicketParams = Omit<CreateTicketParams, "enrollmentId">;

const ticketRepository = {
  findTicketsTypes,
  findUserTicket,
  upsert,
};

export default ticketRepository;
