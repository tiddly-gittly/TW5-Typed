/// <reference path="parser.d.ts" />

declare module 'tiddlywiki' {
  export interface IMakeWidgetOptions extends IRenderOptions {
    document: typeof document | IFakeDocument;
  }

  export type OutputMimeTypes = 'text/html' | 'text/plain-formatted' | 'text/plain';
  export type TextMimeTypes = 'text/html' | 'text/vnd.tiddlywiki' | 'text/plain';
  export interface IRenderOptions {
    parentWidget?: Widget;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    variables?: Record<string, any>;
  }
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
    getTiddlers(): string[];
    /**
     * Return a named global cache object. Global cache objects are cleared whenever a tiddler change.
     * You can put anything into the cache.
     * @param cacheName key of the cache
     * @param initializer when cache miss, this will be called to get initial value
     */
    getGlobalCache<T>(cacheName: string, initializer: () => T): T;
    /**
     * Return the named cache object for a tiddler. If the cache doesn't exist then the initializer function is invoked to create it
     * @param cacheName key of the cache
     * @param initializer when cache miss, this will be called to get initial value
     */
    getCacheForTiddler<T>(title: string, cacheName: string, initializer: () => T): T;
    /**
     * clear all cache, will be called when a tiddler is changed
     */
    clearGlobalCache(): void;
    /**
     * Compile filter string to be a function that execute the filter in the wiki.
     * You can pass an optional iterator that provide the input to the returned function. If no iterator is provided, filter will use first operator to get input.
     * 
     * @returns a function with the signature fn(source,widget) where:
        source: an iterator function for the source tiddlers, called source(iterator), where iterator is called as iterator(tiddler,title)
        widget: an optional widget node for retrieving the current tiddler etc.
     */
    compileFilter(filterString: string): (source?: SourceIterator, widget?: Widget) => string[];
    /**
     *
     * @param filterString
     * @param widget an optional widget node for retrieving the current tiddler etc.
     * @param source an iterator function for the source tiddlers, called source(iterator), where iterator is called as iterator(tiddler,title)
     */
    filterTiddlers(filterString: string, widget?: Widget, source?: SourceIterator): string[];
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
    setText: (title: string, field?: string, index?: string | undefined, value?: string, options?: { suppressTimestamp?: boolean }) => void;
    /**
      Parse a tiddler according to its MIME type
    */
    parseTiddler(title: string, options?: IParserOptions): WikiParser;
    /**
      Parse a block of text of a specified MIME type
      @param {string} type: content type of text to be parsed
      @param {string} text: text
      @param {object}options: see below

    Options include:
      - parseAsInline: if true, the text of the tiddler will be parsed as an inline run
      - _canonical_uri: optional string of the canonical URI of this content
    */
    parseText(type: string, text: string, options?: IParserOptions): WikiParser;
    /**
      Parse text from a tiddler and render it into another format
        outputType: content type for the output
        title: title of the tiddler to be rendered
        options: see below
      Options include:
      variables: hashmap of variables to set
      parentWidget: optional parent widget for the root node
      */
    renderTiddler(outputType: OutputMimeTypes, title: string, options?: IRenderOptions): string;
    /**
      Parse text in a specified format and render it into another format
       @param outputType content type for the output
       @param textType content type of the input text
       @param text input text
       @param options see below, Options includes:
      - variables: hashmap of variables to set
      - parentWidget: optional parent widget for the root node
    */
    renderText(outputType: OutputMimeTypes, textType: TextMimeTypes, text: string, options?: Partial<IMakeWidgetOptions> & IParserOptions): string;
    /**
      Make a widget tree for a parse tree
      @params parser: parser object
      @params options: see below
      Options include:
      document: optional document to use
      variables: hashmap of variables to set
      parentWidget: optional parent widget for the root node
    */
    makeWidget(parser: WikiParser, options?: IMakeWidgetOptions): Widget;
    /**
      Make a widget tree for transclusion
      @params title: target tiddler title
      @params options: as for wiki.makeWidget() plus:

      - options.field: optional field to transclude (defaults to "text")
      - options.mode: transclusion mode "inline" or "block"
      - options.recursionMarker : optional flag to set a recursion marker, defaults to "yes"
      - options.children: optional array of children for the transclude widget
      - options.importVariables: optional importvariables filter string for macros to be included
      - options.importPageMacros: optional boolean; if true, equivalent to passing "[[$:/core/ui/PageMacros]] [all[shadows+tiddlers]tag[$:/tags/Macro]!has[draft.of]]" to options.importVariables
      */
    makeTranscludeWidget(
      title: string,
      options: {
        /**  optional array of children for the transclude widget */
        children?: Widget[];
        /** optional field to transclude (defaults to "text") */
        field?: string;
        /**  optional boolean; if true, equivalent to passing "[[$:/core/ui/PageMacros]] [all[shadows+tiddlers]tag[$:/tags/Macro]!has[draft.of]]" to options.importVariables */
        importPageMacros?: boolean;
        /**  optional importvariables filter string for macros to be included */
        importVariables?: string;
        /**  transclusion mode "inline" or "block" */
        mode?: 'inline' | 'block';
        /**  optional flag to set a recursion marker, defaults to "yes" */
        recursionMarker?: 'yes' | 'no';
      } & IMakeWidgetOptions,
    ): Widget;
  }
}
