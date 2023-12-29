declare module '$:/core/modules/utils/logger.js' {
  /**
   * A logger utility.
   * @description 日志记录实用程序。
   */
  export class Logger {
    /**
     * The name of the component.
     */
    componentName: string;
    /**
     * The color of the logger.
     */
    colour: string;
    /**
     * Whether the logger is enabled.
     */
    enable: boolean;
    /**
     * Whether to save the log.
     */
    save: boolean;
    /**
     * The save limit of the logger.
     */
    saveLimit: number;
    /**
     * The logger to save the buffer.
     */
    saveBufferLogger: Logger;
    /**
     * The buffer of the logger.
     */
    buffer: string;
    /**
     * The alert count of the logger.
     */
    alertCount: number;
    constructor(
      componentName?: string,
      options?: {
        colour?: string;
        enable?: boolean;
        save?: boolean;
        saveLimit?: number;
      },
    );
    /**
     * Set the logger to save the buffer.
     * @param logger - The logger to save the buffer.
     * @description 设置记录器以保存缓冲区。
     */
    setSaveBuffer(logger: Logger): void;
    /**
     * Log a message.
     * @param args - The arguments to log.
     * @description 记录消息。
     */
    log(...args: any[]): void;
    /**
     * Get the message buffer.
     * @returns The message buffer.
     * @description 获取消息缓冲区。
     */
    getBuffer(): string;
    /**
     * Log a structure as a table.
     * @param value - The value to log.
     * @description 将结构记录为表格。
     */
    table(value: any): void;
    /**
     * Alert a message.
     * @param args - The arguments to alert.
     * @description 警报消息。
     */
    alert(...args: any[]): void;
    /**
     * Clear outstanding alerts.
     * @description 清除未处理的警报。
     */
    clearAlerts(): void;
  }
  // This part is important for TypeScript to understand the constructor signature
  // fixes `Property 'prototype' is missing in type 'Logger' but required in type 'typeof Logger'.ts(2741)`
  export interface Logger {
    new (
      componentName?: string,
      options?: {
        colour?: string;
        enable?: boolean;
        save?: boolean;
        saveLimit?: number;
      }
    ): Logger;
  }
}
