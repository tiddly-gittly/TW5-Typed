declare module '$:/core/modules/utils/dom.js' {
  /**
   * Alternative to `element.classList.add`, add a css class name to an element, see issue for detail.
   * @link https://github.com/Jermolene/TiddlyWiki5/issues/6475
   * @param element
   * @param className
   */
  export function addClass(element: Element, className: string): void;

  /**
   * Alternative to `element.classList.remove`, remove a css class name from an element, see issue for detail.
   * @link https://github.com/Jermolene/TiddlyWiki5/issues/6475
   * @param element
   * @param className
   */
  export function removeClass(element: Element, className: string): void;

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
  export function addEventListeners(
    domNode: Element,
    events: Array<{
      handlerFunction?: (event: MouseEvent) => void;
      handlerMethod?: string;
      handlerObject?: Widget;
      name: string;
    }>,
  ): void;

  /**
   * Determines whether element 'a' contains element 'b'.
   * @param a The parent element.
   * @param b The child element.
   * @returns True if 'a' contains 'b', otherwise false.
   */
  export function domContains(a: Element, b: Element): boolean;

  /**
   * Checks if a node matches a specific CSS selector.
   * @param node The DOM node to check.
   * @param selector The CSS selector to match against.
   * @returns True if the node matches the selector, otherwise false.
   */
  export function domMatchesSelector(node: Element, selector: string): boolean;

  /**
   * Safely sets the selection range in an input or textarea element.
   * @param node The DOM node (input or textarea).
   * @param start The start position of the selection.
   * @param end The end position of the selection.
   * @param direction The direction of the selection.
   */
  export function setSelectionRangeSafe(
    node: HTMLInputElement | HTMLTextAreaElement,
    start: number,
    end: number,
    direction?: 'forward' | 'backward' | 'none',
  ): void;

  /**
   * Selects text in an input or textarea by position.
   * @param node The DOM node (input or textarea).
   * @param selectFromStart Position from the start of the text.
   * @param selectFromEnd Position from the end of the text.
   */
  export function setSelectionByPosition(
    node: HTMLInputElement | HTMLTextAreaElement,
    selectFromStart: number,
    selectFromEnd: number,
  ): void;

  /**
   * Removes all child nodes of a given DOM node.
   * @param node The parent DOM node.
   */
  export function removeChildren(node: Node): void;

  /**
   * Checks if an element has a specific class.
   * @param el The element to check.
   * @param className The class name to look for.
   * @returns True if the element has the class, otherwise false.
   */
  export function hasClass(element: Element, className: string): boolean;

  /**
   * Toggles a class on an element based on a given condition.
   * @param el The element to toggle the class on.
   * @param className The class name to toggle.
   * @param status If true, adds the class; if false, removes it. If undefined, toggles based on current state.
   */
  export function toggleClass(
    element: Element,
    className: string,
    status?: boolean,
  ): void;

  /**
   * Gets the first parent element that has scrollbars or uses the body as a fallback.
   * @param el The starting element to search from.
   * @returns The first scrollable parent element, or the body if none are found.
   */
  export function getScrollContainer(element: Element): Element;

  /**
   * Get the scroll position of the viewport.
   * @param srcWindow The source window to get the scroll position from, defaults to the current window if not specified.
   * @returns An object with 'x' and 'y' properties representing the horizontal and vertical scroll positions in pixels.
   */
  export function getScrollPosition(sourceWindow?: Window): {
    x: number;
    y: number;
  };

  /**
   * Adjusts the height of a textarea to fit its content, preserving scroll position, and returns the new height.
   * @param domNode The DOM node (textarea) to resize.
   * @param minHeight The minimum height to use for the textarea.
   * @returns The new height of the textarea.
   */
  export function resizeTextAreaToFit(
    domNode: HTMLTextAreaElement,
    minHeight: string,
  ): number;

  /**
   * Gets the bounding rectangle of an element in absolute page coordinates.
   * @param element The element to get the bounding rectangle for.
   * @returns An object representing the bounding rectangle with properties: left, width, right, top, height, bottom.
   */
  export function getBoundingPageRect(element: Element): {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
  };

  /**
   * Saves a named password in the browser.
   * @param name The name for the password.
   * @param password The password to save.
   */
  export function savePassword(name: string, password: string): void;

  /**
   * Retrieves a named password from the browser.
   * @param name The name of the password to retrieve.
   * @returns The password, or an empty string if not found.
   */
  export function getPassword(name: string): string;

  /**
   * Forces layout of a DOM node and its descendants.
   * @param element The DOM element to force layout on.
   */
  export function forceLayout(element: Element): void;

  /**
   * Pulses an element for debugging purposes.
   * @param element The element to pulse.
   */
  export function pulseElement(element: Element): void;

  /**
   * Get the computed styles applied to an element as an array of strings of individual CSS properties.
   * @param domNode The DOM node to get the computed styles for.
   * @returns An array of strings, each representing an individual CSS property and its value.
   */
  export function getComputedStyles(domNode: Element): string[];

  /**
   * Applies a set of styles to a DOM node, passed as an array of strings of individual CSS properties.
   * @param domNode The DOM node to apply the styles to.
   * @param styleDefs An array of strings, each representing an individual CSS property and its value.
   */
  export function setStyles(domNode: Element, styleDefs: string[]): void;

  /**
   * Copies the computed styles from a source element to a destination element.
   * @param srcDomNode The source DOM node.
   * @param dstDomNode The destination DOM node.
   */
  // eslint-disable-next-line unicorn/prevent-abbreviations
  export function copyStyles(sourceDomNode: Element, dstDomNode: Element): void;

  /**
   * Copies plain text to the clipboard on browsers that support it.
   * @param text The text to copy.
   * @param options Options for copying, including 'doNotNotify' to suppress notifications.
   * @returns True if the operation succeeded, otherwise false.
   */
  export function copyToClipboard(
    text: string,
    options?: {
      doNotNotify?: boolean;
      successNotification?: string; // default is $:/language/Notifications/CopiedToClipboard/Succeeded
      failureNotification?: string;
    },
  ): boolean;

  /**
   * Gets the path part of the current location.
   * @returns The path part of the current location URL.
   */
  export function getLocationPath(): string;

  /**
   * Collects DOM variables from an event.
   * @param selectedNode The node selected.
   * @param domNode The DOM node catching the event.
   * @param event The event object.
   * @returns An object containing variables derived from the DOM and event.
   */
  export function collectDOMVariables(
    selectedNode: Element,
    domNode: Element,
    event: Event,
  ): Record<string, string>;

  /**
   * Safely executes a querySelector, avoiding exceptions on invalid selectors.
   * @param selector The CSS selector to query.
   * @param baseElement The base element to start the query from, defaults to document.
   * @returns The first element matching the selector, or null if none are found or the selector is invalid.
   */
  export function querySelectorSafe(
    selector: string,
    baseElement?: Element,
  ): Element | null;

  /**
   * Safely executes a querySelectorAll, avoiding exceptions on invalid selectors.
   * @param selector The CSS selector to query.
   * @param baseElement The base element to start the query from, defaults to document.
   * @returns A NodeList of elements matching the selector, or an empty NodeList if none are found or the selector is invalid.
   */
  export function querySelectorAllSafe(
    selector: string,
    baseElement?: Element,
  ): NodeList;
}
