// eslint-disable-next-line @typescript-eslint/no-extraneous-class
declare class variablesConstructor {}

declare module 'tiddlywiki' {
  export class Widget {
    constructor(parseTreeNode: unknown, options: unknown);
    initialize: (parseTreeNode: unknown, options: unknown) => void;
    parseTreeNode: unknown;
    wiki: unknown;
    parentWidget?: Widget;
    variablesConstructor: variablesConstructor;
    variables: unknown;
    /**
      Add an event listener
    */
    addEventListener: (type: string, handler: (args: any[]) => void) => void;
    /**
      Dispatch an event to a widget. If the widget doesn't handle the event then it is also dispatched to the parent widget
    */
    dispatchEvent: (type: string) => void;
    /**
      Add a list of event listeners from an array [{type:,handler:},...]
    */
    addEventListeners: (listeners: { type: string; handler: (args: any[]) => void }[]) => void;
  }
}
