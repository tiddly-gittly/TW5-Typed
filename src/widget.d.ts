declare module 'tiddlywiki' {
  /**
   * Parameter of Widget.refresh
   * Key is tiddler title
   */
  export type IChangedTiddlers = Record<string, IChangedTiddlersMeta>;
  export interface IChangedTiddlersMeta {
    modified: boolean;
  }

  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class variablesConstructor {}

  /**
   * @link https://tiddlywiki.com/dev/#Widgets
   */
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
    /**
     * Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering.
     * You can do some cleanup or buildup before return true.
     * @param changedTiddlers Object key is tiddler title, value is metadata about the change
     * @link https://tiddlywiki.com/dev/#Selective%20Update
     */
    refresh(changedTiddlers: IChangedTiddlers): boolean;
    computeAttributes(): void;
    /**
     * Get parameters that user set in the widget
     * @param name attribute name, for example, `actions` in the button widget
     * @param fallbackText default value if the attribute is not set
     */
    getAttribute(name: string, fallbackText?: string): string;
    /**
     * Get variable in the context of the widget.
     * Simplified version of getVariableInfo() that just returns the text.
     * @param name variable name, for example, `currentTiddler` in the widget context
     * @param options options for getVariableInfo()
     * 
     * Options include
        params: array of {name:, value:} for each parameter
        defaultValue: default value if the variable is not defined

        Returns an object with the following fields:

        params: array of {name:,value:} of parameters passed to wikitext variables
        text: text of variable, with parameters properly substituted
     */
    getVariable(name: string, options?: object): string;
  }
}
