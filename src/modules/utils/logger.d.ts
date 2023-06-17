declare module 'tiddlywiki' {
  export class Logger {
    new (): Logger;
    setSaveBuffer(logger: Logger): void;
    /**
      Log a message
    */
    log: typeof console.log;
    clearAlerts(): void;
    getBuffer(): string;
    table: typeof console.table;
    /**
      Alert a message
    */
    alert(...args: any[]): void;
  }
  interface IUtils {
    /**
     * A basic logging implementation
     */
    Logger: Logger;
  }
}
