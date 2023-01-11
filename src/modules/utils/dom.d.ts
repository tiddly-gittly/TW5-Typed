declare const addClass: (element: Element, className: string) => void;
declare const addEventListeners: (
  domNode: Node,
  events: {
    handlerFunction?: (event: MouseEvent) => void;
    handlerMethod?: string;
    handlerObject?: Widget;
    name: string;
  }[],
) => void;

declare class Notifier {
  /**
   * Display a notification
   * * title: Title of tiddler containing the notification text
   * * options: see below
   * Options include:
   */
  display(title: string, options?: Record<string, unknown>): void;
}

declare module 'tiddlywiki' {
  interface IUtils {
    /**
     * Alternative to `element.classList.add`, add a css class name to an element, see issue for detail.
     * @link https://github.com/Jermolene/TiddlyWiki5/issues/6475
     * @param element
     * @param className
     */
    addClass: typeof addClass;
    /**
     * Attach specified event handlers to a DOM node
     * @param domNode: where to attach the event handlers
     * @param events: array of event handlers to be added (see below)
     * Each entry in the events array is an object with these properties:
     * * name: event name of `addEventListener`
     * * handlerFunction: optional event handler function
     * * handlerObject: optional event handler object
     * * handlerMethod: optionally specifies object handler method name (defaults to `handleEvent`)
     */
    addEventListeners: typeof addEventListeners;
    /**
     * Notifier mechanism
     */
    Notifier: typeof Notifier;
  }
}

declare module '$:/core/modules/utils/dom.js' {
  export { addClass, addEventListeners, Notifier };
}
