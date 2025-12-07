declare module '$:/core/modules/utils/performance.js' {
  import { Logger } from '$:/core/modules/utils/logger.js';
  /**
   * A performance measurement utility.
   * @param enabled - Whether performance measurements are enabled.
   * @description 性能测量实用程序。
   */
  export class Performance {
    /**
     * Whether performance measurements are enabled.
     */
    enabled: boolean;
    /**
     * Hashmap by measurement name of `{time:, invocations:}`.
     */
    measures: Record<string, { invocations: number; time: number }>;
    /**
     * A logger instance.
     */
    logger: Logger;
    constructor(enabled: boolean);
    /**
     * Displays a greeting message.
     * @description 显示问候消息。
     */
    showGreeting(): void;
    /**
     * Wraps performance reporting around top level functions.
     * @param name - The name of the function being wrapped.
     * @param fn - The function to wrap.
     * @returns The wrapped function.
     * @description 在顶层函数周围包装性能报告。
     */
    report<T extends (...arguments_: unknown[]) => unknown>(name: string, function_: T): T;
    /**
     * Logs performance measurements.
     * @description 记录性能测量。
     */
    log(): void;
    /**
     * Wraps performance measurements around a subfunction.
     * @param name - The name of the measurement.
     * @param fn - The function to wrap.
     * @returns The wrapped function.
     * @description 在子函数周围包装性能测量。
     */
    measure<T extends (...arguments_: unknown[]) => unknown>(name: string, function_: T): T;
  }
}
