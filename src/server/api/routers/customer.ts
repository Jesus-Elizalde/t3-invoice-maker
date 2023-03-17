import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const customerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.customer.findMany({
      where: {
        businessId: +ctx.session.user.businessId,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        postalCode: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.customer.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          businessId: +ctx.session.user.businessId,
          address: input.address,
          city: input.city,
          state: input.state,
          postalCode: input.postalCode,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.customer.delete({
        where: {
          id: +input.id,
        },
      });
    }),
});
