declare module 'tiddlywiki' {
  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class variablesConstructor {}

  export class Widget {
    constructor(parseTreeNode: unknown, options: unknown);
    initialize: (parseTreeNode: unknown, options: unknown) => void;
    parseTreeNode: unknown;
    wiki: unknown;
    parentWidget?: Widget;
    variablesConstructor: variablesConstructor;
    variables: unknown;
    domNodes: Node[];
    /**
    Add an event listener
  */
    addEventListener(type: string, handler: (arguments_: unknown[]) => void): void;
    /**
    Dispatch an event to a widget. If the widget doesn't handle the event then it is also dispatched to the parent widget
  */
    dispatchEvent(type: string): void;
    /**
    Add a list of event listeners from an array [{type:,handler:},...]
  */
    addEventListeners(listeners: Array<{ handler: (arguments_: unknown[]) => void; type: string }>): void;

    parentDomNode: Node;
    execute: () => void;

    /**
     * Lifecycle method: Render this widget into the DOM
     */
    render(parent: Node, nextSibling: Node): void;
    computeAttributes(): void;
    /**
     * Get parameters that user set in the widget
     * @param name attribute name, for example, `actions` in the button widget
     */
    getAttribute(name: string): string;
  }
}
