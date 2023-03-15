import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany({
      where: {
        businessId: +ctx.session.user.businessId,
      },
      include: {
        addresses: true,
      },
    });
  }),
});
