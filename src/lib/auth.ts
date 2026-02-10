import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import config from "../config";
import { prisma } from "./prisma";
import { UserRole } from "../constants/user";

export const auth = betterAuth({
  baseURL: config.auth.better_auth_base_url || "http://localhost:3000",
  trustedOrigins: [config.app_url!],
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: config.auth.google_client_id!,
      clientSecret: config.auth.google_client_secret,
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: UserRole.CUSTOMER,
        required: false,
      },
      phone: {
        type: "string",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
});
