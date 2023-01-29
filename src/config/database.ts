import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient({ log: ["warn", "error"] });
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
