import { prisma } from "@/config";
import { Payment } from "@prisma/client";

async function upsert(id: number, createdUpdatePayment: CreateUpdatePaymentParams): Promise<Payment> {
  return prisma.payment.upsert({
    where: {
      id,
    },
    create: createdUpdatePayment,
    update: createdUpdatePayment,
  });
}

async function findTicketPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
    include: {
      Ticket: {
        select: { Enrollment: { select: { userId: true } } },
      },
    },
  });
}

export type CreateUpdatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

const paymentRepository = {
  upsert,
  findTicketPayment,
};

export default paymentRepository;
