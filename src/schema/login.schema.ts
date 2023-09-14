import { S } from "fluent-json-schema";

export const loginSchema = {
  body: S.object()
    .prop("email", S.string().required())
    .prop("password", S.string().minLength(5).maxLength(30).required()),
  queryString: S.object(),
  params: S.object(),
  headers: S.object(),
};
