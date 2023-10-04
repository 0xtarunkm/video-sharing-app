import { z } from 'zod';

export const SignupInput = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please provide a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const LoginInput = z.object({
  email: z.string().email({ message: 'Please provide a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const VideoInput = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long' }),
  description: z
    .string()
    .min(2, { message: 'Description must be at least 2 characters long' }),
  url: z.string().url({ message: 'Please provide a valid URL' }),
  thumbnail: z.string().url({ message: 'Please provide a valid URL' }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const VideosObject = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string(),
  thumbnail: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  admin: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
});

export type userSignupInputType = z.infer<typeof SignupInput>;
export type userLoginInputType = z.infer<typeof LoginInput>;
export type videoInputType = z.infer<typeof VideoInput>;
export type Videos = z.infer<typeof VideosObject>;
