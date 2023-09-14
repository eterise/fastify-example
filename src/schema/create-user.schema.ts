//import { S } from "fluent-json-schema";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

/*
export const createUserSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("password", S.string().minLength(5).maxLength(30).required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
*/

const userCore = {
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email(),
};

const createUserSchema = z.object({
  ...userCore,
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password must be a string",
  }),
});

const createUserResponseSchema = z.object({
  id: z.number(),
  ...userCore,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: createUserSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  createUserResponseSchema
});
