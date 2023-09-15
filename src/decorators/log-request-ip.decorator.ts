/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

import { isFastifyRequest } from '#src/helpers/utils/util.js';

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
