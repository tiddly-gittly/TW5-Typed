/**
 * Notifier mechanism
 */
declare module 'tiddlywiki' {
  export interface Notifier {
    /**
     * Display a notification
     * * title: Title of tiddler containing the notification text
     * * options: see below
     * Options include:
     */
    display(title: string, options?: Record<string, unknown>): void;
  }
}
