import { COOKIE_NAME } from "@shared/const";
import { ENV } from "./_core/env";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { deleteUserById, listUserActivities, listUsers, logUserActivity, updateUserActive, updateUserProfile, updateUserRole } from "./db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(async ({ ctx }) => {
      if (ctx.user) await logUserActivity({ userId: ctx.user.id, action: "Logout", description: "Sessão encerrada" });
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  profile: router({
    update: protectedProcedure.input(z.object({ name: z.string().trim().min(1).max(120), profilePhoto: z.string().max(2_000_000).nullable().optional() })).mutation(async ({ ctx, input }) => {
      const user = await updateUserProfile(ctx.user.id, input);
      await logUserActivity({ userId: ctx.user.id, action: "Perfil atualizado", description: "Nome ou foto de perfil atualizados" });
      return user;
    }),
  }),

  activity: router({
    list: protectedProcedure.query(({ ctx }) => listUserActivities(ctx.user.id)),
    record: protectedProcedure.input(z.object({ action: z.string().min(1).max(80), description: z.string().min(1).max(500) })).mutation(async ({ ctx, input }) => { await logUserActivity({ userId: ctx.user.id, action: input.action, description: input.description }); return { success: true } as const; }),
  }),

  users: router({
    list: adminProcedure.query(() => listUsers()),
    setRole: adminProcedure.input(z.object({ id: z.number().int().positive(), role: z.enum(["user", "admin"]) })).mutation(async ({ ctx, input }) => {
      const target = (await listUsers()).find((user) => user.id === input.id);
      if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "Usuário não encontrado" });
      if (target.openId === ENV.ownerOpenId && input.role !== "admin") throw new TRPCError({ code: "FORBIDDEN", message: "A conta proprietária deve continuar administradora" });
      const updated = await updateUserRole(input.id, input.role);
      await logUserActivity({ userId: ctx.user.id, action: "Cargo alterado", description: `Cargo de ${target.name ?? target.email ?? "usuário"} alterado para ${input.role === "admin" ? "Administrador" : "Usuário"}` });
      return updated;
    }),
    setActive: adminProcedure.input(z.object({ id: z.number().int().positive(), active: z.boolean() })).mutation(async ({ ctx, input }) => {
      const target = (await listUsers()).find((user) => user.id === input.id);
      if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "Usuário não encontrado" });
      if (target.openId === ENV.ownerOpenId && !input.active) throw new TRPCError({ code: "FORBIDDEN", message: "A conta proprietária deve continuar ativa" });
      const updated = await updateUserActive(input.id, input.active);
      await logUserActivity({ userId: ctx.user.id, action: input.active ? "Usuário ativado" : "Usuário desativado", description: `${target.name ?? target.email ?? "Usuário"} foi ${input.active ? "ativado" : "desativado"}` });
      return updated;
    }),
    remove: adminProcedure.input(z.object({ id: z.number().int().positive() })).mutation(async ({ ctx, input }) => {
      const target = (await listUsers()).find((user) => user.id === input.id);
      if (!target) throw new TRPCError({ code: "NOT_FOUND", message: "Usuário não encontrado" });
      if (target.openId === ENV.ownerOpenId || target.id === ctx.user.id) throw new TRPCError({ code: "FORBIDDEN", message: "A conta proprietária ou a própria conta não pode ser removida" });
      await deleteUserById(input.id);
      await logUserActivity({ userId: ctx.user.id, action: "Usuário removido", description: `${target.name ?? target.email ?? "Usuário"} foi removido da operação` });
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
