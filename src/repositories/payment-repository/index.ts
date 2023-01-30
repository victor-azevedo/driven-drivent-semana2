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

export type CreateUpdatePaymentParams = Omit<Payment, "id" | "createdAt" | "updatedAt">;

const paymentRepository = {
  upsert,
};

export default paymentRepository;
