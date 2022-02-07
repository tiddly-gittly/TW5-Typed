declare module "tiddlywiki" {
  export type TWDocument = Document;
  export type TWDOMElement = Element;
  interface ITWUtils {
    PasswordPrompt: typeof PasswordPrompt;
    Crypto: typeof Crypto;
    /** Check if an object has a property. */
    hop(object: object, property: string): boolean;
    /** Determine if a value is an array. */
    isArray(value: unknown): boolean;
    /** Check if an array is equal by value and by reference. */
    isArrayEqual(array1: unknown[], array2: unknown[]): boolean;
    /**
     * Push entries onto an array, removing them first if they already exist in the array
     * * array: array to modify (assumed to be free of duplicates)
     * * value: a single value to push or an array of values to push
     */
    pushTop(array: unknown[], value: unknown): void;
    /** Determine if a value is a date */
    isDate(value: unknown): void;
    /**
     * Iterate through all the own properties of an object or array.
     * Callback is invoked with (element, index, object), if callback returns false, then the each loop will be terminated.
     */
    each<T = object | unknown[]>(
      object: T,
      callback: (
        element?: unknown,
        index?: string | number,
        object?: T
      ) => boolean | void
    ): void;
    /**
     * Helper for making DOM elements
     * @param {string} tag tag name
     * @param {{
     *           namespace?: string;
     *           attributes?: Record<string, unknown>;
     *           style?: Record<string, string>;
     *           text?: string;
     *           children?: Element[];
     *           innerHTML?: string;
     *           class?: string;
     *           document?: Document;
     *           eventListeners?: EventListener[];
     *         }} options Options include:
     * * namespace: defaults to http://www.w3.org/1999/xhtml
     * * attributes: hashmap of attribute values
     * * style: hashmap of styles
     * * text: text to add as a child node
     * * children: array of further child nodes
     * * innerHTML: optional HTML for element
     * * class: class name(s)
     * * document: defaults to current document
     * * eventListeners: array of event listeners (this option won't work until `$tw.utils.addEventListeners()` has been loaded)
     * @returns {Element}
     */
    domMaker(
      tag: string,
      options: {
        namespace?: string;
        attributes?: Record<string, unknown>;
        style?: Record<string, string>;
        text?: string;
        children?: TWDOMElement[];
        innerHTML?: string;
        class?: string;
        document?: TWDocument;
        eventListeners?: EventListener[];
      }
    ): TWDOMElement;
    /** Display an error and exit */
    error(err: Event | string): void;
    /** Extend an object with the properties from a list of source objects */
    extend(object: object, ...sourceObjectList: object[]): object;
    /** Fill in any null or undefined properties of an object with the properties from a list of source objects. Each property that is an object is called recursively */
    deepDefaults(object: object, ...sourceObjectList: object[]): object;
    /** Convert a URIComponent encoded string to a string safely */
    decodeURIComponentSafe(uri: string): string;
    /** Convert a URI encoded string to a string safely */
    decodeURISafe(uri: string): string;
    /** Convert "&amp;" to &, "&nbsp;" to nbsp, "&lt;" to <, "&gt;" to > and "&quot;" to " */
    htmlDecode(text: string): string;
    /** Get the browser location.hash. We don't use location.hash because of the way that Firefox auto-urldecodes it (see http://stackoverflow.com/questions/1703552/encoding-of-window-location-hash) */
    getLocationHash(): string;
    /** Pad a string to a given length with "0"s. Length defaults to 2 */
    pad(value: number, length?: number): string;
    /** Convert a date into UTC YYYYMMDDHHMMSSmmm format */
    stringifyDate(value: Date): string;
    /** Parse a date from a UTC YYYYMMDDHHMMSSmmm format string */
    parseDate(value: string | Date): Date;
    /** Stringify an array of tiddler titles into a list string */
    stringifyList(value: string[]): string;
    /** Parse a string array from a bracketted list. For example "OneTiddler [[Another Tiddler]] LastOne" */
    parseStringArray(
      value: string | string[],
      allowDuplicate?: boolean
    ): string[];
    /** Parse a block of name:value fields. The `fields` object is used as the basis for the return value */
    parseFields(text: string, fields?: object): object;
    /**
     * Resolves a source filepath delimited with `/` relative to a specified absolute root filepath.
     * In relative paths, the special folder name `..` refers to immediate parent directory, and the
     * name `.` refers to the current directory
     */
    resolvePath(sourcepath: string, rootpath: string): string;
    /** Parse a semantic version string into its constituent parts -- see https://semver.org */
    parseVersion(version: string): {
      version: string;
      major: number;
      minor: number;
      patch: number;
      prerelease?: string;
      build?: string;
    } | null;
    /**
     * Returns +1 if the version string A is greater than the version string B, 0 if they are the same, and +1 if B is greater than A.
     * Missing or malformed version strings are parsed as 0.0.0
     */
    compareVersions(versionStringA: string, versionStringB: string): -1 | 0 | 1;
    /** Returns true if the version string A is greater than the version string B. Returns true if the versions are the same */
    checkVersions(versionStringA: string, versionStringB: string): boolean;
    /**
     * Register file type information
     * @param {string} contentType
     * @param {string} encoding
     * @param {(string | string[])} extension
     * @param {{
     *           flags: string[];
     *           deserializerType: string;
     *         }} [options] Options includes:
     * * flags:"image" for image types
     * * deserializerType: defaults to type if not specified
     */
    registerFileType(
      contentType: string,
      encoding: string,
      extension: string | string[],
      options?: {
        flags?: string[];
        deserializerType?: string;
      }
    ): void;
    /** Given an extension, always access the $tw.config.fileExtensionInfo using a lowercase extension only. */
    getFileExtensionInfo(extension: string): IFileExtensionInfo | null;
    /** Given an extension, get the correct encoding for that file. defaults to utf8 */
    getTypeEncoding(extension: string): string;
    /** Run code globally with specified context variables in scope */
    evalGlobal(
      code: string,
      context: IModuleSandbox,
      filename: string
    ): unknown;
    /** Run code in a sandbox with only the specified context variables in scope */
    evalSandboxed(
      code: string,
      context: IModuleSandbox,
      filename: string
    ): unknown;
  }
}
