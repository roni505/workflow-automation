import { prisma } from "@repo/db";

export async function getCredentials(credentailId: string) {
  const data = await prisma.credentials.findMany({
    where: {
      id: credentailId,
    },
  });
  //   console.log("This is the data from db", data);

  return data;
}
