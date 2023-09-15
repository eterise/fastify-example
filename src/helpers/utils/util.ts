import type { FastifyRequest } from 'fastify';

//TEMP: Is not safety enough
export const isFastifyRequest = (val: unknown): val is FastifyRequest => {
  if (!isObject(val)) return false;

  return (
    'body' in val &&
    'compileValidationSchema' in val &&
    'headers' in val &&
    'routeSchema' in val &&
    'routeOptions' in val
  );
};

export const isObject = (val: unknown): val is object => {
  return typeof val === 'object';
};
