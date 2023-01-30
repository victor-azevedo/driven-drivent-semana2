import { unauthorizedError } from "@/errors";
import paymentRepository, { CreateUpdatePaymentParams } from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import { exclude } from "@/utils/prisma-utils";

async function createOrUpdatePayment(params: CreateOrUpdatePaymentParams) {
  const { userId } = params;
  const { cardData } = params;
  const cardLastDigits = cardData.number.toString().slice(-4);

  const userTicket = await ticketRepository.findUserTicket(userId);

  const id = userTicket.Payment[0] ? userTicket.Payment[0].id : 0;

  const paymentData: CreateUpdatePaymentParams = {
    ticketId: userTicket.id,
    value: userTicket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits,
  };

  return paymentRepository.upsert(id, paymentData);
}

async function findUserTicketPayment(params: FindTicketPaymentParams) {
  const { userId } = params;
  const { ticketId } = params;

  const ticketPayment = await paymentRepository.findTicketPayment(ticketId);

  if (ticketPayment.Ticket.Enrollment.userId !== userId) {
    throw unauthorizedError();
  }
  return exclude(ticketPayment, "Ticket");
}

export type CreateOrUpdatePaymentBody = {
  ticketId: number;
  cardData: {
    issuer: string;
    number: number;
    name: string;
    expirationDate: Date;
    cvv: number;
  };
};

type CreateOrUpdatePaymentParams = Required<CreateOrUpdatePaymentBody> & { userId: number };
type FindTicketPaymentParams = { ticketId: number; userId: number };

const paymentsService = {
  createOrUpdatePayment,
  findUserTicketPayment,
};

export default paymentsService;
