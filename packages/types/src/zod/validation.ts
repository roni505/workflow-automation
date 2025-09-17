import z from "zod";

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
});

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

// static type from schema definition
export type SignUpType = z.infer<typeof SignUpSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
