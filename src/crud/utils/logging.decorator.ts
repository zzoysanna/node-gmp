import logger from './logger';

export const Loggable = () => (target: Function) => {
  for (const propertyName of Object.getOwnPropertyNames(target)) {
    const descriptor = Object.getOwnPropertyDescriptor(target, propertyName);
    if (!descriptor) {
      continue;
    }
    const originalMethod = descriptor.value;
    const isMethod = originalMethod instanceof Function;
    if (!isMethod) {
      continue;
    }
    descriptor.value = function (...args: unknown[]) {
      logger.info(`${target.name}.${propertyName} called with [${args.map((arg) => JSON.stringify(arg))}]`);

      const now = Date.now();
      const result = originalMethod.apply(this, args);

      const exitLog = () => {
        logger.info(`${target.name}.${propertyName}, exiting ${Date.now() - now}ms`);
      };
      exitLog();
      return result;
    };
    Object.defineProperty(target, propertyName, descriptor);
  }
};

export default Loggable;
