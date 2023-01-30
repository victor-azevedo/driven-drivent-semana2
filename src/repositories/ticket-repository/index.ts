import { prisma } from "@/config";
import { Ticket, TicketStatus, TicketType } from "@prisma/client";

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
    include: { TicketType: true, Payment: true, Enrollment: true },
  });
}

async function findTicketById(id: number) {
  return prisma.ticket.findFirst({
    where: {
      id: {
        equals: id,
      },
    },
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

async function updateTicketStatus(id: number, status: TicketStatus) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data: { status },
  });
}

export type CreateTicketParams = Omit<Ticket, "id" | "createdAt" | "updatedAt">;
export type UpdateTicketParams = Omit<CreateTicketParams, "enrollmentId">;

const ticketRepository = {
  findTicketsTypes,
  findUserTicket,
  findTicketById,
  upsert,
  updateTicketStatus,
};

export default ticketRepository;
