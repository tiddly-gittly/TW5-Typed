/// <reference path="./navigator.d.ts" />

declare module 'tiddlywiki' {
  /**
   * Parameter of Widget.refresh
   * Key is tiddler title
   */
  export type IChangedTiddlers = Record<string, IChangedTiddlersMeta>;
  /** Only one of these fields will be `true` */
  export interface IChangedTiddlersMeta {
    deleted?: boolean;
    modified?: boolean;
  }
  export interface IWidgetVariableParam {
    name: string;
    default: string;
  }

  export interface IWidgetVariable {
    value: string;
    params?: IWidgetVariableParam[];
    isMacroDefinition: boolean;
  }

  export interface IWidgetInitialiseOptions {
    document?: TWDocument;
    parentWidget?: Widget;
    wiki?: ITiddlyWiki;
  }

  export type IWidgetInitializeOptions = IWidgetInitialiseOptions;

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

  export interface IGetWidgetVariableOptions {
    params?: IWidgetVariableParam[];
    defaultValue?: string;
    allowSelfAssigned?: boolean;
    source: (iter: SourceIterator) => void;
  }

  /**
   * @link https://tiddlywiki.com/dev/#Widgets
   *
   * Create a widget object for a parse tree node
   * * parseTreeNode: reference to the parse tree node to be rendered
   * * options: see below
   *
   * Options include:
   * * wiki: mandatory reference to wiki associated with this render tree
   * * parentWidget: optional reference to a parent renderer node for the context chain
   * * document: optional document object to use instead of global document
   */
  export class Widget {
    parseTreeNode: IParseTreeNode;

    wiki: Wiki;

    document: IFakeDocument;

    parentWidget?: Widget;

    attributes: Record<string, string>;

    domNodes: Element[];

    parentDomNode: Element;

    eventListeners: Record<string, Function>;

    /**
     * we can use $tw.rootWidget.widgetClasses.xxx to new a widget
     *
     * This is a set of all widgets defined in tiddlywiki.
     */
    widgetClasses: Record<string, typeof Widget>;

    children: Widget[];

    qualifiers?: Record<string, string>;

    ancestorCount?: number;

    /**
     * Set the value of a context variable
     * * name: name of the variable
     * * value: value of the variable
     * * params: array of {name:, default:} for each parameter
     * * isMacroDefinition: true if the variable is set via a \define macro pragma (and hence should have variable substitution performed)
     */
    variables: Record<string, IWidgetVariable>;

    constructor(
      parseTreeNode: IParseTreeNode,
      options?: IWidgetInitialiseOptions,
    );

    /**
     * @en
     * Initialise widget properties. These steps are pulled out of the constructor so that we can reuse them in subclasses
     * @zh
     * 初始化widget属性。这些步骤被拉出构造函数，以便我们可以在子类中重复使用它们
     */
    initialise(
      parseTreeNode: IParseTreeNode,
      options?: IWidgetInitialiseOptions,
    ): void;

    /**
     * @en
     * Lifecycle method: Render this widget into the DOM
     * @zh
     * 生命周期方法: 将这个微件渲染到DOM中;
     * 只会在首次渲染、销毁后重新渲染时自动调用，或者通过 refreshSelf 等方法主动调用
     */
    render(parent: Element, nextSibling: Element | null): void;

    /**
     * @en
     * Selectively refreshes the widget if needed. Returns true if the widget or any of its children needed re-rendering.
     * You can do some cleanup or buildup before return true.
     * @zh
     * 如果需要的话，有选择地刷新该微件。如果该微件或其任何子项需要重新渲染，则返回 true。
     * 你可以在返回 true 之前做一些清理或构建工作。
     * @param {IChangedTiddlers} changedTiddlers Object key is tiddler title, value is metadata about the change
     * @link https://tiddlywiki.com/dev/#Selective%20Update
     */
    refresh(changedTiddlers: IChangedTiddlers): boolean | void;

    /**
     * Compute the internal state of the widget.
     * This will be automatically called in the `render` method.
     *
     * For example, `getAttribute` and set them to class members.
     */
    execute(): void;

    /**
     * @en
     * Set the value of a context variable
     * @zh
     * 设置一个上下文变量的值
     *
     * @param {string } name name of the variable
     * @param {string} value value of the variable
     * @param {IWidgetVariableParam[]} [params=[]] array of {name:, default:} for each parameter
     * @param {boolean} [isMacroDefinition=true] true if the variable is set via a \define macro pragma (and hence should have variable substitution performed)
     */
    setVariable(
      name: string,
      value: string,
      parameters?: IWidgetVariableParam[],
      isMacroDefinition?: boolean,
    ): void;

    /**
     * Get the prevailing value of a context variable
     * @param name variable name, for example, `currentTiddler` in the widget context
     * @param options options for getVariableInfo()
     *
     * Options include
     * * params: array of {name:, value:} for each parameter
     * * defaultValue: default value if the variable is not defined
     * * source: optional source iterator for evaluating function invocations
     * * allowSelfAssigned: if true, includes the current widget in the context chain instead of just the parent
     *
     * Returns an object with the following fields:
     * * params: array of {name:,value:} of parameters passed to wikitext variables
     * * text: text of variable, with parameters properly substituted
     * * resultList: result of variable evaluation as an array
     * * srcVariable: reference to the object defining the variable
     */
    getVariableInfo(
      name: string,
      options?: IGetWidgetVariableOptions,
    ): {
      text: string;
      params?: IWidgetVariableParam[];
      srcVariable?: IWidgetVariable;
      isCacheable?: boolean;
    };

    /**
     * Simplified version of getVariableInfo() that just returns the text
     */
    getVariable(name: string, options?: IGetWidgetVariableOptions): string;

    resolveVariableParameters(
      formalParams?: IWidgetVariableParam[],
      actualParams?: IWidgetVariableParam[],
    ): IWidgetVariableParam[];

    substituteVariableReferences(
      text: string,
      options: { variables: Record<string, string> },
    ): string;

    evaluateMacroModule(
      name: string,
      actualParams: IWidgetVariableParam[],
      defaultValue: string,
    ): string;

    /**
     * @en
     * Check whether a given context variable value exists in the parent chain
     * @zh
     * 检查一个给定的上下文变量值是否存在于父链中
     *
     * @param {string} name
     * @param {string} value
     * @return {*}  {boolean}
     * @memberof Widget
     */
    hasVariable(name: string, value: string): boolean;

    /**
     * @en
     * Construct a qualifying string based on a hash of concatenating the values of a given variable in the parent chain
     * @zh
     * 在连接父链中给定变量值的哈希基础上构建一个限定字符串
     *
     * @param {string} name
     * @return {*}  {string}
     * @memberof Widget
     */
    getStateQualifier(name: string): string;

    /**
     * @en
     * Compute the current values of the attributes of the widget. Returns a hashmap of the names of the attributes that have changed
     * @zh
     * 计算微件的属性的当前值。返回一个已经改变的属性名称的哈希图
     *
     * @return {*}  {Record<string, true>}
     * @memberof Widget
     */
    computeAttributes(): Record<string, true>;

    computeAttribute(attribute: string): string;

    /**
     * @en
     * Check for the presence of an evaluated attribute on the widget. Note that attributes set to a missing variable (ie `attr=<<missing>>`) will be treated as missing
     * @zh
     * 检查微件上是否存在一个已评估的属性。请注意，设置为缺失变量的属性（即`attr=<<missing>>`）将被视为缺失。
     *
     * @param {string} attribute
     * @return {*}  {boolean}
     * @memberof Widget
     */
    hasAttribute(attribute: string): boolean;

    /**
     * @en
     * Check for the presence of a raw attribute on the widget parse tree node. Note that attributes set to a missing variable (ie `attr=<<missing>>`) will NOT be treated as missing
     * @zh
     * 检查微件解析树节点上是否存在原始属性。注意，设置为缺失变量的属性（即`ttr=<<missing>>`）不会被视为缺失。
     *
     * @param {string} attribute
     * @return {*}  {boolean}
     * @memberof Widget
     */
    hasParseTreeNodeAttribute(attribute: string): boolean;

    /**
     * @en
     * Get parameters that user set in the widget
     * @zh
     * 获取用户在小组件中设置的参数
     *
     * @param {string} name attribute name, for example, `actions` in the button widget
     * @param {string} [fallbackText] default value if the attribute is not set
     * @return {*}  {string}
     * @memberof Widget
     */
    getAttribute(name: string): string | undefined;
    getAttribute(name: string, fallbackText: string): string;

    /**
     * @en
     * Assign the computed attributes of the widget to a domNode
     * options include:
     * * `excludeEventAttributes`: ignores attributes whose name begins with "on"
     * @zh
     * 将微件的计算属性分配给一个domNode, 选项包括:
     * * `excludeEventAttributes`: 忽略名称以 "on "开头的属性
     * 一些特殊的属性：
     * * `xlink:<xlink-name>`
     * * `style.<css-style-name>`
     *
     * @param {*} domNode
     * @param {*} options
     * @memberof Widget
     */
    assignAttributes(
      domNode: Element,
      options?: { excludeEventAttributes?: boolean },
    );

    /**
     * @en
     * Get the number of ancestor widgets for this widget
     * @zh
     * 获取这个微件的祖先微件的数量
     *
     * @return {*}  {number}
     * @memberof Widget
     */
    getAncestorCount(): number;

    /**
     * Make child widgets correspondng to specified parseTreeNodes
     * And push them to `this.children`
     * @param parseTreeNodes default to `this.parseTreeNode.children`, can be undefined
     */
    makeChildWidgets(
      parseTreeNodes?: IParseTreeNode[],
      options?: { variables?: unknown },
    ): void;

    /**
     * Construct the widget object for a parse tree node, and return the new widget
     * options include:
     *   variables: optional hashmap of variables to wrap around the widget
     */
    makeChildWidget(
      parseTreeNode: IParseTreeNode,
      options?: { variables?: unknown },
    ): Widget;

    /**
     * @en
     * Get the next sibling of this widget
     *
     * @return {*}  {(Widget | null)}
     * @memberof Widget
     */
    nextSibling(): Widget | null;

    /**
     * @en
     * Get the previous sibling of this widget
     *
     * @return {*}  {(Widget | null)}
     * @memberof Widget
     */
    previousSibling(): Widget | null;

    /**
     * Render the children of this widget into the DOM
     */
    renderChildren(parent: Element, nextSibling: Element | null): void;

    /**
     * Add a list of event listeners from an array [{type:,handler:},...]
     */
    addEventListeners(
      listeners: {
        handler: (event: IWidgetEvent) => void | Promise<void>;
        type: string;
      }[],
    ): void;

    /**
     * Add an event listener
     */
    addEventListener(
      type: string,
      handler: (event: IWidgetEvent) => void | Promise<void>,
    ): void;

    /**
     * Dispatch an event to a widget. If the widget doesn't handle the event then it is also dispatched to the parent widget
     * Events added via `addEventListener`, like `tm-notify`, can be invoked by this.
     */
    dispatchEvent(typeOrEvent: string | Omit<IWidgetEvent, 'widget'>): void;

    /**
     * Rebuild a previously rendered widget
     */
    refreshSelf(): boolean | void;

    /**
     * Refresh all the children of a widget, will call `this.render`.
     * Need to call this after `setVariable`
     */
    refreshChildren(changedTiddlers?: IChangedTiddlers): boolean;

    /**
     * Find the next sibling in the DOM to this widget. This is done by scanning the widget tree through all next siblings and their descendents that share the same parent DOM node
     * @param startIndex Refer to this widget by its index within its parents children
     */
    findNextSiblingDomNode(startIndex?: number): Element | null;

    /**
     * Find the first DOM node generated by a widget or its children
     */
    findFirstDomNode(): Element | null;

    /**
     * Remove any DOM nodes created by this widget or its children
     *
     * If this widget has directly created DOM nodes, delete them and exit. This assumes that any child widgets are contained within the created DOM nodes, which would normally be the case.
     * Otherwise, ask the child widgets to delete their DOM nodes
     */
    removeChildDomNodes(): void;

    /**
     * Invoke the action associated with this widget
     *
     * No every widget has this method, but some do, like `action-xxx` widget, e.g., `action-sendmessage`
     * @param triggeringWidget
     * @param event
     * @returns handled
     */
    invokeAction?(
      triggeringWidget: Widget,
      event: IWidgetEvent,
    ): boolean | undefined;

    /**
     * @en
     * Invoke the action widgets that are descendents of the current widget.
     *
     * @param {Widget} triggeringWidget
     * @param {IWidgetEvent} event
     * @memberof Widget
     */
    invokeActions(triggeringWidget: Widget, event: IWidgetEvent): boolean;

    /**
     * @en
     * Invoke the action widgets defined in a string
     *
     * @param {string} actions
     * @param {Widget} triggeringWidget
     * @param {IWidgetEvent} event
     * @param {Record<string, IWidgetVariable>} variables
     * @return {*}  {boolean}
     * @memberof Widget
     */
    invokeActionString(
      actions: string,
      triggeringWidget: Widget,
      event: IWidgetEvent,
      variables: Record<string, IWidgetVariable>,
    ): boolean;
  }

  export type ModalWidget = {
    adjustPageClass: () => void;
    /**
     *
     * @param title
     * @param options
     * variables: optional hashmap of variables to wrap around the widget
     * downloadLink: normally is used for "Right-click to save changes"
     */
    display: (
      title: string,
      options?: {
        downloadLink?: string;
        event?: IWidgetEvent;
        variables?: unknown;
      },
    ) => void;

    new (wiki: Wiki): ModalWidget;
  };
}

declare module '$:/core/modules/widgets/widget.js' {
  import { Widget } from 'tiddlywiki';
  export { Widget as widget };
}
