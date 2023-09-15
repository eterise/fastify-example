/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';

export function LogMethod<T extends object>() {
  return function (target: T, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    console.log(target)
    console.log(propertyKey)
    console.log(descriptor)

    descriptor.value = function (this: any, ...args: any[]) {
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
