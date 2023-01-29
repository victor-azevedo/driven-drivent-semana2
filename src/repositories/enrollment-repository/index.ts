import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}

async function findUserEnrollmentIdAndTicketsId(userId: number): Promise<EnrollmentIdAndTicketsId> {
  const queryResult = await prisma.enrollment.findFirst({
    where: {
      userId,
    },
    select: {
      id: true,
      Ticket: { select: { id: true } },
    },
  });
  const enrollmentId = queryResult?.id ? queryResult.id : 0;
  const ticketsId = queryResult?.Ticket[0] ? queryResult.Ticket[0].id : 0;
  const enrollmentIdTicketsId = { enrollmentId, ticketsId };
  return enrollmentIdTicketsId;
}

export type CreateEnrollmentParams = Omit<Enrollment, "id" | "createdAt" | "updatedAt">;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, "userId">;
export type EnrollmentIdAndTicketsId = { enrollmentId: number; ticketsId: number };

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findUserEnrollmentIdAndTicketsId,
};

export default enrollmentRepository;
