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
    [extraKeys: string]: unknown;
    /** maybe a DOM click event, if trigger by button click */
    event: UIEvent | Event;
    name: string;
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
    tiddlerTitle?: string;
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
    initialize(parseTreeNode: IParseTreeNode, options?: unknown): void;
    parseTreeNode: IParseTreeNode;
    wiki: ITiddlyWiki;
    document: IFakeDocument;
    parentWidget?: Widget;
    /** we can use $tw.rootWidget.widgetClasses.widget to new a widget
     *
     * This is a set of all widgets defined in tiddlywiki.
     */
    widgetClasses: Record<string, Widget>;
    /** we can use $tw.rootWidget.widgetClasses.widget to new a widget
     *
     * Like `new widget.widget(widgetNode,{` in `$tw.wiki.makeWidget`
     */
    widget: new (parseTreeNode: IParseTreeNode, options?: unknown) => Widget;
    children: Widget[];
    /**
      Make child widgets correspondng to specified parseTreeNodes
      And push them to `this.children`
      @param parseTreeNodes default to `this.parseTreeNode.children`, can be undefined
    */
    makeChildWidgets(parseTreeNodes?: IParseTreeNode[], options?: { variables?: unknown }): void;
    /**
     * Remove any DOM nodes created by this widget or its children
     *
     * If this widget has directly created DOM nodes, delete them and exit. This assumes that any child widgets are contained within the created DOM nodes, which would normally be the case.
     * Otherwise, ask the child widgets to delete their DOM nodes
     */
    removeChildDomNodes(): void;
    /**
      Construct the widget object for a parse tree node, and return the new widget
      options include:
        variables: optional hashmap of variables to wrap around the widget
    */
    makeChildWidget(parseTreeNode: IParseTreeNode, options?: { variables?: unknown }): Widget;
    variablesConstructor: variablesConstructor;
    variables: unknown;
    domNodes: Node[];
    /**
      Add an event listener
    */
    addEventListener(type: string, handler: (event: IWidgetEvent) => void | Promise<void>): void;
    /**
      Dispatch an event to a widget. If the widget doesn't handle the event then it is also dispatched to the parent widget

      Events added via `addEventListener`, like `tm-notify`, can be invoked by this.
    */
    dispatchEvent(typeOrEvent: string | Omit<IWidgetEvent, 'widget'>): void;
    /**
      Add a list of event listeners from an array [{type:,handler:},...]
    */
    addEventListeners(listeners: Array<{ handler: (event: IWidgetEvent) => void | Promise<void>; type: string }>): void;

    parentDomNode: Node;
    /**
      Compute the internal state of the widget.
      This will be automatically called in the `render` method.

      For example, `getAttribute` and set them to class members.
      
    */
    execute(): void;
    /**
     * Invoke the action widgets that are descendents of the current widget. Will call child widget's invokeAction recursively.
     *
     * @param triggeringWidget
     * @param event
     * @returns handled by any children
     */
    invokeActions(triggeringWidget: Widget, event: IWidgetEvent): boolean;
    /**
     * Invoke the action associated with this widget
     *
     * No every widget has this method, but some do, like `action-xxx` widget, e.g., `action-sendmessage`
     * @param triggeringWidget
     * @param event
     * @returns handled
     */
    invokeAction: (triggeringWidget: Widget, event: IWidgetEvent) => boolean | undefined;

    /**
     * Lifecycle method: Render this widget into the DOM
     */
    render(parent: Node, nextSibling: Node | null): void;
    /**
     * Render the children of this widget into the DOM
     */
    renderChildren(parent: Node, nextSibling: Node | null): void;
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
     * Rebuild a previously rendered widget
     */
    refreshSelf(): boolean | void;
    /**
     * Find the next sibling in the DOM to this widget. This is done by scanning the widget tree through all next siblings and their descendents that share the same parent DOM node
     * @param startIndex Refer to this widget by its index within its parents children
     */
    findNextSiblingDomNode(startIndex?: number): Node | null;
    /**
     * Find the first DOM node generated by a widget or its children
     */
    findFirstDomNode(): Node | null;
    computeAttributes(): Record<string, IParseTreeAttribute>;
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
  export interface TW_Element extends HTMLElement {
    _style: Record<string, unknown>;
    appendChild: <T extends TW_Element | TW_TextNode | Node>(node: T) => T;
    isRaw: boolean;
    isTiddlyWikiFakeDom: boolean;
    namespaceURI: string;
    tag: string;
  }
  export interface TW_TextNode extends Node {
    textContent: string;
  }

  export interface ModalWidget {
    new(wiki: Wiki): ModalWidget;
    adjustPageClass(): void;
    /**
     * Display a dialog with mask
     * @param title
     * @param options
     * variables: optional hashmap of variables to wrap around the widget
     * downloadLink: normally is used for "Right-click to save changes"
     */
    display(title: string, options?: { downloadLink?: string; event?: IWidgetEvent; variables?: unknown }): void;
  }
}
