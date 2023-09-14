/* eslint-disable @typescript-eslint/no-explicit-any */
export class Container {
  private instances: { [key: string]: any } = {};

  register<T>(key: string, instance: T): void {
    this.instances[key] = instance;
  }

  resolve<T>(key: string): T | undefined {
    return this.instances[key];
  }
}
