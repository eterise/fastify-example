/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

import type { FastifyRequest } from 'fastify';

//TEMP: Is not safety enough
const isFastifyRequest = (val: unknown): val is FastifyRequest => {
  if (!isObject(val)) return false;

  return (
    'body' in val &&
    'compileValidationSchema' in val &&
    'headers' in val &&
    'routeSchema' in val &&
    'routeOptions' in val
  );
};

const isObject = (val: unknown): val is object => {
  return typeof val === 'object';
};

export function LogRequest<T>() {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (this: any, ...args: any[]) {
      const req = args[0];
      if (!req) throw new Error('Bad request.');

      if (!isFastifyRequest(req)) throw new Error('The first arg is not request');

      console.log(`New request: IP: ${req.ip}, RoutePath: ${req.routeOptions.url}`);

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
