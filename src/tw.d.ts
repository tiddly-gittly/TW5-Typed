declare module 'tiddlywiki' {
  export interface ITiddler {
    constructor(...fields: (Record<string, unknown> | ITiddler)[]);
    readonly cache: ITiddlerCache;
    readonly fields: ITiddlerFields;
    // static fieldModules: IModule;
    hasField(field: string): boolean;
    isEqual(tiddler: ITiddler, excludeFields: string[]): boolean;
  }

  export interface ITiddlerFields {
    readonly created: Date;
    readonly list: string[];
    readonly modified: Date;
    readonly tags: string[];
    readonly text: string;
    readonly title: string;
    readonly type: string;
    readonly color: string;
    readonly [anyKey: string]: unknown;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ITiddlerCache {}

  /**
   * filepath: '/Users/linonetwo/xxxx/wiki/Meme-of-LinOnetwo/tiddlers/tiddlerTitle.tid',
   * hasMetaFile: false
   * tiddlerTitle: string,
   * type: 'application/x-tiddler',
   */
  export interface IBootFilesIndexItem {
    filepath: string;
    hasMetaFile: boolean;
    tiddlerTitle: string;
    type: string;
  }
  /**
   * Record<tiddlerTitle, IBootFilesIndexItem>
   */
  export type IBootFilesIndex = Partial<Record<string, IBootFilesIndexItem>>;

  export interface IModule {
    moduleType: string;
    definition: unknown;
    exports: object | null;
  }

  export interface TiddlyWiki {
    boot: {
      argv: string[];
      files: IBootFilesIndex;
      startup(options: { callback?: () => unknown }): void;
      /** Default boot tasks */
      tasks: {
        trapErrors: boolean;
        readBrowserTiddlers: boolean;
      };
      logMessages: string[];
      log(str: string): void;
    };

    /** Broswer features, if tw isn't running on a browser environment, the value will be `null` */
    browser: null | object;
    /** NodeJS features, if tw isn't running on a NodeJS environment, the value will be `null` */
    node: null | object;
    nodeWebKit: null | object;

    /**
     * Information about each module is kept in an object with these members:
     *
     * * moduleType: type of module
     * * definition: object, function or string defining the module; see below
     * * exports: exports of the module, filled in after execution
     *
     * The `definition` can be of several types:
     *
     * * An object can be used to directly specify the exports of the module
     * * A function with the arguments `module,require,exports` that returns `exports`
     * * A string function body with the same arguments
     *
     * Each moduleInfo object is stored in two hashmaps: $tw.modules.titles and $tw.modules.types. The first is indexed by title and the second is indexed by type and then title
     */
    modules: {
      /** hashmap by module name of moduleInfo */
      titles: Record<string, IModule>;
      /** hashmap by module type and then name of moduleInfo */
      types: Record<string, Record<string, IModule>>;
      /**
       * Define a JavaScript tiddler module for later execution
       * @param {string} moduleName name of module being defined
       * @param {string} moduleType type of module
       * @param {unknown} definition module definition; see discussion above
       */
      define(moduleName: string, moduleType: string, definition: unknown): void;
    };

    /** External JavaScript can populate this array before calling boot.js in order to preload tiddlers */
    preloadTiddlers: Record<string, Record<string, unknown>>;
    /** Convenience function for pushing a tiddler onto the preloading array */
    preloadTiddler(fields: Record<string, unknown>): void;
    /** Convenience function for pushing an array of tiddlers onto the preloading array */
    preloadTiddlerArray(fieldsArray: Record<string, unknown>[]): void;

    hooks: {
      addHook: (hookName: string, callback: (...arguments_: any[]) => unknown) => void;
    };
    wiki: {
      getTiddler: (title: string) => ITiddler | undefined;
      /**
       * Get full list of tiddler titles in the wiki
       */
      getTiddlers: () => string[];
    };
    utils: {
      /** Check if an object has a property. */
      hop(object: object, property: string): boolean;
      /** Determine if a value is an array. */
      isArray(value: unknown): boolean;
      /** Check if an array is equal by value and by reference. */
      isArrayEqual(array1: unknown[], array2: unknown[]): boolean;
      /**
       * Push entries onto an array, removing them first if they already exist in the array
       *
       * * array: array to modify (assumed to be free of duplicates)
       * * value: a single value to push or an array of values to push
       */
      pushTop(array: unknown[], value: unknown): void;
      /** Determine if a value is a date */
      isDate(value: unknown): void;
      /**
       * Iterate through all the own properties of an object or array.
       *
       * Callback is invoked with (element, index, object), if callback returns false, then the each loop will be terminated.
       * */
      each<T = object | unknown[]>(object: T, callback: (element?: unknown, index?: string | number, object?: T) => boolean | void);
      /**
       * Helper for making DOM elements
       * Options include:
       * * namespace:
       * * attributes: hashmap of attribute values
       * * style: hashmap of styles
       * * text: text to add as a child node
       * * children: array of further child nodes
       * * innerHTML: optional HTML for element
       * * class: class name(s)
       * * document: defaults to current document
       * * eventListeners: array of event listeners (this option won't work until `$tw.utils.addEventListeners()` has been loaded)
       *
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
       *         }} options
       * @returns {Element}
       */
      domMaker(
        tag: string,
        options: {
          namespace?: string;
          attributes?: Record<string, unknown>;
          style?: Record<string, string>;
          text?: string;
          children?: Element[];
          innerHTML?: string;
          class?: string;
          document?: Document;
          eventListeners?: EventListener[];
        },
      ): Element;
    };
  }

  export function TiddlyWiki(): TiddlyWiki;

  global {
    const $tw: TiddlyWiki;
  }
}
