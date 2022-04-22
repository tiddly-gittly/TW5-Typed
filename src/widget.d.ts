declare module 'tiddlywiki' {
  /**
   * Parameter of Widget.refresh
   * Key is tiddler title
   */
  export type IChangedTiddlers = Record<string, IChangedTiddlersMeta>;
  export interface IChangedTiddlersMeta {
    modified: boolean;
  }

  export interface IWidgetEvent {
    /** maybe a DOM click event, if trigger by button click */
    event: Event;
    navigateFromTitle?: string;
    /**
     * Get `$param`
     */
    param?: string | undefined;
    /** Optional hashmap of additional tiddler fields. Widget event can carry any other parameters
     *
     * For example, `<$action-sendmessage $message="tw-mobile-sync-set-active-server-and-sync" title={{!!title}} />` will produce `paramObject: { title: "xxxx" }`
     */
    paramObject?: {
      [othersParamKeys: string]: unknown;
    };
    /** the first parameter of addEventListener
     *
     * For example, the `'open-command-palette'` in `$tw.rootWidget.addEventListener('open-command-palette', (e: IWidgetEvent) => this.openPalette(e));`
     */
    type: string;
    widget: Widget;
  }

  // eslint-disable-next-line @typescript-eslint/no-extraneous-class
  class variablesConstructor {}

  /**
   * @link https://tiddlywiki.com/dev/#Widgets
   */
  export class Widget {
    constructor(parseTreeNode: IParseTreeNode, options?: unknown);
    initialize: (parseTreeNode: IParseTreeNode, options?: unknown) => void;
    parseTreeNode: IParseTreeNode;
    wiki: ITiddlyWiki;
    parentWidget?: Widget;
    children: Widget[];
    /*
Make child widgets correspondng to specified parseTreeNodes
*/
    makeChildWidgets(parseTreeNodes: IParseTreeNode[], options?: { variables?: unknown }): void;
    /**
      Construct the widget object for a parse tree node
      options include:
        variables: optional hashmap of variables to wrap around the widget
    */
    makeChildWidget(parseTreeNode: IParseTreeNode, options?: { variables?: unknown }): void;
    variablesConstructor: variablesConstructor;
    variables: unknown;
    domNodes: Node[];
    /**
      Add an event listener
    */
    addEventListener(type: string, handler: (event: IWidgetEvent) => void | Promise<void>): void;
    /**
      Dispatch an event to a widget. If the widget doesn't handle the event then it is also dispatched to the parent widget
    */
    dispatchEvent(typeOrEvent: string | Omit<IWidgetEvent, 'widget'>): void;
    /**
      Add a list of event listeners from an array [{type:,handler:},...]
    */
    addEventListeners(listeners: Array<{ handler: (event: IWidgetEvent) => void | Promise<void>; type: string }>): void;

    parentDomNode: Node;
    execute: () => void;

    /**
     * Lifecycle method: Render this widget into the DOM
     */
    render(parent: Node, nextSibling: Node | null): void;
    /**
     * Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering.
     * You can do some cleanup or buildup before return true.
     * @param changedTiddlers Object key is tiddler title, value is metadata about the change
     * @link https://tiddlywiki.com/dev/#Selective%20Update
     */
    refresh(changedTiddlers: IChangedTiddlers): boolean;
    /**
      Refresh all the children of a widget
      will call `this.render`
    */
    refreshChildren(changedTiddlers: IChangedTiddlers): boolean;
    /**
      Rebuild a previously rendered widget
    */
    refreshSelf(): boolean;
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

  export interface IFakeDocument {
    compatMode: string;
    createElement: (tag: string) => TW_Element;
    createElementNS: (namespace: string, tag: string) => TW_Element;
    createTextNode: (text: string) => TW_TextNode;
    isTiddlyWikiFakeDom: boolean;
    setSequenceNumber: (value: any) => void;
  }
  export class TW_Element {
    isTiddlyWikiFakeDom: boolean;
    tag: string;
    attributes: Record<string, unknown>;
    isRaw: boolean;
    children: Array<TW_Element | TW_TextNode>;
    _style: Record<string, unknown>;
    namespaceURI: string;
  }
  export class TW_TextNode {
    textContent: string;
  }
}
