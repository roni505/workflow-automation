// import { prisma } from "@repo/db";
// import { Credentials } from "@repo/types/workflow";

// export async function getCredentials(credentailId: string) {
//   const data = await prisma.credentials.findMany({
//     where: {
//       id: credentailId,
//     },
//   });
//   // console.log("This is the data from db", data);

//   if (!data) {
//     return null;
//   }

//   const formattedData: Credentials[] = data.map((c) => ({
//     id: c.id,
//     name: c.name,
//     user_Id: c.user_Id,
//     platform: c.platform,
//     data: c.data as Record<string, string>,
//   }));

//   return formattedData;
// }
