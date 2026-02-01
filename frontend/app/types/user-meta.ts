import { z } from "zod";

// Base schema matching the user_meta table
const userMetaBase = {
  graduationYear: z.string().max(4).nullable(),
  courses: z.array(z.string()).nullable(),
  interests: z.array(z.string()).nullable(),
  clubs: z.array(z.string()).nullable(),
  lookingFor: z.array(z.string()).nullable(),
  bio: z.string().nullable(),
};

// GET response — full record from the database
export const userMetaGetSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  ...userMetaBase,
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

// POST request — creating a new user_meta record
const optionalStringArray = z.array(z.string()).optional();
const graduationYearSchema = z
    .string()
    .trim()
    .regex(/^\d{4}$/, "graduationYear must be a 4-digit year")
    .optional();

export const userMetaPostSchema = z.object({
    graduationYear: graduationYearSchema,
    courses: optionalStringArray,
    interests: optionalStringArray,
    clubs: optionalStringArray,
    lookingFor: optionalStringArray,
    bio: z.string().nullable(),
});

export type UserMetaGet = z.infer<typeof userMetaGetSchema>;
export type UserMetaPost = z.infer<typeof userMetaPostSchema>;
export type UserMetaPut = z.infer<typeof userMetaPostSchema>;
