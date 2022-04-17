/// <reference path="parser.d.ts" />

declare module 'tiddlywiki' {
  export class Wiki {
    /**
     * Wiki constructor. State is stored in private members that only a small number of privileged accessor methods have direct access. Methods added via the prototype have to use these accessors and cannot access the state data directly.
     * @param {{ enableIndexers: unknown[] }} options options include:
     * * enableIndexers - Array of indexer names to enable, or null to use all available indexers
     * @memberof Wiki
     */
    constructor(options: { enableIndexers: unknown[] });
    addIndexer(indexer: unknown, name: string): void;
    getTiddler: <T extends Tiddler>(title: string) => T | undefined;
    /**
     * Get full list of tiddler titles in the wiki
     */
    getTiddlers: () => string[];
    /**
     * Compile filter string to be a function that execute the filter in the wiki.
     * You can pass an optional iterator that provide the input to the returned function. If no iterator is provided, filter will use first operator to get input.
     */
    compileFilter: (filterString: string) => (iterator?: SourceIterator) => string[];
    /**
     * Set JSON tiddler, Object in data field will be JSON.stringify and put into the text.
     * This will make tiddler to be JSON data tiddler `"type":"application/json"`, so if you just want to modify existed tiddler's data, use `addTiddler` instead.
     */
    setTiddlerData: (title: string, data?: object, fields?: ITiddlerFields, options?: any) => void;
    /**
     * Create or update tiddler.
     * Update existed tiddler based on the title field.
     */
    addTiddler: (tiddler: Tiddler | Partial<ITiddlerFields>) => void;
    /**
     * Call `addTiddler` for each iton of the list, but should passing `tiddler.fields`, directly passing tiddler object may failed to add in some cases.
     */
    addTiddlers: (tiddler: Array<Partial<ITiddlerFields>>) => void;
    /**
     * Get tiddler's text field, with an optional default text.
     * If have _is_skinny field, will just return null (this is a rare case, so not put in the return type for now).
     *
     * @param title will return undefined (or fallback) if the tiddler isn't found
     * @param fallbackText default text when text field is empty or undefined
     */
    getTiddlerText(title: string, fallbackText: string): string;
    getTiddlerText(title: string, fallbackText?: string): string | undefined;
    /**
      Get the content of a tiddler as a JavaScript object. How this is done depends on the type of the tiddler:

      application/json: the tiddler JSON is parsed into an object
      application/x-tiddler-dictionary: the tiddler is parsed as sequence of name:value pairs

      Other types currently just return undefined or as same as fallbackData.

      titleOrTiddler: string tiddler title or a tiddler object
      defaultData: default data to be returned if the tiddler is missing or doesn't contain data

      Alternative, uncached version of getTiddlerDataCached(). The return value can be mutated freely and reused
    */
    getTiddlerData<D extends Record<string, unknown> | undefined>(titleOrTiddler: string, fallbackData?: D): D;
    getTiddlerData<D extends Record<string, unknown> | undefined>(titleOrTiddler: Tiddler, fallbackData?: D): D;
    /**
      Get the content of a tiddler as a JavaScript object. How this is done depends on the type of the tiddler:

      application/json: the tiddler JSON is parsed into an object
      application/x-tiddler-dictionary: the tiddler is parsed as sequence of name:value pairs

      Other types currently just return undefined or as same as fallbackData.

      titleOrTiddler: string tiddler title or a tiddler object
      defaultData: default data to be returned if the tiddler is missing or doesn't contain data

      Note that the same value is returned for repeated calls for the same tiddler data. The value is frozen to prevent modification; otherwise modifications would be visible to all callers
    */
    getTiddlerDataCached<D extends Record<string, unknown> | undefined>(titleOrTiddler: string, fallbackData?: D): D;
    getTiddlerDataCached<D extends Record<string, unknown> | undefined>(titleOrTiddler: Tiddler, fallbackData?: D): D;
    /**
     * Set tiddler text of any field.
     *
     * @param {string} title title of tiddler
     * @param {string} field field name to set
     * @param {string | undefined} index data index(key) to set, if you are setting a JSON data tiddler. Be `undefined` if you are just setting a normal tiddler's field, this will be most of the case.
     * @param {string} value text content to set
     * @param {object} options options, see tiddlywiki dev doc for details
     */
    setText: (title: string, field?: string, index?: string | undefined, value?: string, options?: any) => void;
    parseTiddler(title: string, options?: IParserOptions): WikiParser;
    parseText(type: string, text: string, options?: IParserOptions): WikiParser;
    /*
      Parse text from a tiddler and render it into another format
        outputType: content type for the output
        title: title of the tiddler to be rendered
        options: see below
      Options include:
      variables: hashmap of variables to set
      parentWidget: optional parent widget for the root node
      */
    renderTiddler(
      outputType: 'text/html' | 'text/plain-formatted' | 'text/plain',
      title: string,
      options?: { parentWidget?: Widget; variables?: Record<string, any> },
    ): string;
  }
}
