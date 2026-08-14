import { COOKIE_NAME } from "@shared/const";
import { ENV } from "./_core/env";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { deleteUserById, listUsers, updateUserActive, updateUserRole } from "./db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  users: router({
    list: adminProcedure.query(() => listUsers()),
    setRole: adminProcedure.input(z.object({ id: z.number().int().positive(), role: z.enum(["user", "admin"]) })).mutation(async ({ ctx, input }) => {
      const target = (await listUsers()).find((user) => user.id === input.id);
      if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "Usuário não encontrado" });
      if (target.openId === ENV.ownerOpenId && input.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "A conta proprietária deve continuar administradora" });
      return updateUserRole(input.id, input.role);
    }),
    setActive: adminProcedure.input(z.object({ id: z.number().int().positive(), active: z.boolean() })).mutation(async ({ input }) => {
      const target = (await listUsers()).find((user) => user.id === input.id);
      if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "Usuário não encontrado" });
      if (target.openId === ENV.ownerOpenId && !input.active) throw new TRPCError({ code: "FORBIDDEN", message: "A conta proprietária deve continuar ativa" });
      return updateUserActive(input.id, input.active);
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const target = (await listUsers()).find((user) => user.id === input.id);
      if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "Usuário não encontrado" });
      if (target.openId === ENV.ownerOpenId || target.id === ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "A conta proprietária ou a própria conta não pode ser removida" });
      await deleteUserById(input.id);
      return { success: true } as const;
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
