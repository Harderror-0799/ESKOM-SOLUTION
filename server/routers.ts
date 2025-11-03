import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUserByPhone, createPhoneUser, updateUserLastSignedIn } from "./db";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

// Helper function to generate invite code
function generateInviteCode(): string {
  return Math.random().toString(36).substring(2, 15).toUpperCase();
}

// Helper function to validate phone number
function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{10,15}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
}

export const appRouter = router({
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

    // Phone/Password Registration
    register: publicProcedure
      .input(z.object({
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string(),
        inviteCode: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // Validate inputs
          if (!isValidPhone(input.phone)) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Invalid phone number format",
            });
          }

          if (input.password !== input.confirmPassword) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Passwords do not match",
            });
          }

          // Check if user already exists
          const existingUser = await getUserByPhone(input.phone);
          if (existingUser) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Phone number already registered",
            });
          }

          // Hash password
          const passwordHash = await bcrypt.hash(input.password, 10);

          // Generate invite code
          const inviteCode = generateInviteCode();

          // Create user
          await createPhoneUser(input.phone, passwordHash, inviteCode);

          return {
            success: true,
            message: "Account created successfully",
          };
        } catch (error) {
          if (error instanceof TRPCError) {
            throw error;
          }
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Registration failed",
          });
        }
      }),

    // Phone/Password Login
    login: publicProcedure
      .input(z.object({
        phone: z.string(),
        password: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        try {
          // Validate inputs
          if (!input.phone || !input.password) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Phone and password are required",
            });
          }

          // Find user by phone
          const user = await getUserByPhone(input.phone);
          if (!user || !user.passwordHash) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Login failed: You don't have an account. Please register.",
            });
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(input.password, user.passwordHash);
          if (!isPasswordValid) {
            throw new TRPCError({
              code: "UNAUTHORIZED",
              message: "Invalid phone number or password",
            });
          }

          // Update last signed in
          await updateUserLastSignedIn(user.id);

          // Create session token
          const token = jwt.sign(
            {
              userId: user.id,
              phone: user.phone,
              role: user.role,
            },
            ENV.jwtSecret,
            { expiresIn: "7d" }
          );

          // Set session cookie
          const cookieOptions = getSessionCookieOptions(ctx.req);
          ctx.res.cookie(COOKIE_NAME, token, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          return {
            success: true,
            message: "Login successful",
            user: {
              id: user.id,
              phone: user.phone,
              name: user.name,
              role: user.role,
            },
          };
        } catch (error) {
          if (error instanceof TRPCError) {
            throw error;
          }
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Login failed",
          });
        }
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
