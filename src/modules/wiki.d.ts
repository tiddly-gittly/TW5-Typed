declare module 'tiddlywiki' {
  export interface IMakeWidgetOptions {
    document?: TWDocument;
    variables?: Record<string, string>;
    parentWidget?: Widget;
  }
  export type IRenderOptions = IMakeWidgetOptions & IParseOptions;

  export type OutputMimeTypes =
    | 'text/html'
    | 'text/plain-formatted'
    | 'text/plain';
  export type TextMimeTypes =
    | 'text/html'
    | 'text/vnd.tiddlywiki'
    | 'text/plain';
  export type ITiddlerFieldsParameter =
    & Omit<
      Partial<ITiddlerFields>,
      'created' | 'modified'
    >
    & { created?: string; modified?: string };
  export type ITiddlerJSONResult =
    & Omit<
      Partial<ITiddlerFieldsParameter>,
      'list' | 'tags'
    >
    & { list?: string; tags?: string };
  export class Wiki {
    /**
     * Wiki constructor. State is stored in private members that only a small number of privileged accessor methods have direct access. Methods added via the prototype have to use these accessors and cannot access the state data directly.
     * @param {{ enableIndexers: unknown[] }} options options include:
     * * enableIndexers - Array of indexer names to enable, or null to use all available indexers
     * @memberof Wiki
     */
    constructor(options: { enableIndexers: unknown[] });
    addIndexer(indexer: unknown, name: string): void;
    getTiddler(title: string): Tiddler | undefined;
    /**
     * Get full list of tiddler titles in the wiki
     */
    getTiddlers(): string[];
    /**
     * Get JSON string of tiddlers. Note that this will make lists like tags/list to be string, instead of array. And result is a string, not an array.
     * @param filter Filter string
     * @param spaces Last arg of `JSON.stringify`, default is `'  '`
     * @returns a stringified JSON with type ITiddlerJSONResult. You will need to use `JSON.parse` on it.
     */
    getTiddlersAsJson(filter: string, spaces?: string): string;
    /**
     * Get JSON string of tiddler. Note that this will make lists like tags/list to be string, instead of array. And result is a string, not an object.
     * @param title
     * @returns a stringified JSON with type ITiddlerJSONResult. You will need to use `JSON.parse` on it.
     */
    getTiddlerAsJson(title: string): string;
    deleteTiddler(title: string): void;
    each(callback: (tiddler: Tiddler, title: string) => void): void;
    /**
     * For every tiddler invoke a callback(title,tiddler) with `this` set to the wiki object.
     * @param options Options include sortField, excludeTag, includeSystem
     * @param callback Function to be called for each tiddler
     */
    forEachTiddler(options: { sortField?: string; excludeTag?: string; includeSystem?: boolean }, callback: (title: string, tiddler: Tiddler) => void): void;
    forEachTiddler(callback: (title: string, tiddler: Tiddler) => void): void;
    /**
     * Sort an array of tiddler titles by a specified field
     * @param titles Array of titles (sorted in place)
     * @param sortField Name of field to sort by
     * @param isDescending True if the sort should be descending
     * @param isCaseSensitive True if the sort should consider upper and lower case letters to be different
     * @param isNumeric True if the sort should be numeric
     * @param isAlphaNumeric True if the sort should be alphanumeric
     */
    sortTiddlers(titles: string[], sortField: string, isDescending?: boolean, isCaseSensitive?: boolean, isNumeric?: boolean, isAlphaNumeric?: boolean): void;
    /**
     * Return an array of tiddler titles that match a search string
     * @param text The text string to search for
     * @param options Search options
     */
    search(text: string, options?: {
      /** An iterator function for the source tiddlers */
      source?: (callback: (tiddler: Tiddler, title: string) => void) => void;
      /** An array of tiddler titles to exclude from the search */
      exclude?: string[];
      /** If true returns tiddlers that do not contain the specified string */
      invert?: boolean;
      /** If true forces a case sensitive search */
      caseSensitive?: boolean;
      /** If specified, restricts the search to the specified field, or an array of field names */
      field?: string | string[];
      /** If true, forces all but regexp searches to be anchored to the start of text */
      anchored?: boolean;
      /** If true, the field options are inverted to specify the fields that are not to be searched */
      excludeField?: boolean;
      /** Searches for literal string */
      literal?: boolean;
      /** Same as literal except runs of whitespace are treated as a single space */
      whitespace?: boolean;
      /** Treats the search term as a regular expression */
      regexp?: boolean;
      /** Treats search string as a list of tokens, and matches if all tokens are found */
      words?: boolean;
      /** Treats search string as a list of tokens, and matches if at least ONE token is found */
      some?: boolean;
    }): string[];
    /**
     * Check whether the text of a tiddler matches a given value
     * @param title Tiddler title
     * @param targetText Text to compare with
     * @param options Comparison options
     */
    checkTiddlerText(title: string, targetText: string, options?: { noTrim?: boolean; caseSensitive?: boolean }): boolean;
    /**
     * Return the content of a tiddler as an array containing each line
     * @param title Title of the tiddler
     * @param field Field name (defaults to "list")
     * @param index Data index (key) to get, if you are getting a JSON data tiddler
     * @returns Array of strings parsed from the field/index value
     */
    getTiddlerList(title: string, field?: string, index?: string): string[];
    /**
     * Get the value of a text reference. Text references can have any of these forms:
     * - <tiddlertitle>
     * - <tiddlertitle>!!<fieldname>
     * - !!<fieldname> - specifies a field of the current tiddlers
     * - <tiddlertitle>##<index>
     * @param textRef The text reference string
     * @param defaultText Default text to return if the reference is not found
     * @param currTiddlerTitle Current tiddler title for relative references
     */
    getTextReference(textReference: string, defaultText?: string, currentTiddlerTitle?: string): string | undefined;
    /**
     * Set the value of a text reference
     * @param textRef The text reference string
     * @param value The value to set
     * @param currTiddlerTitle Current tiddler title for relative references
     */
    setTextReference(textReference: string, value: string, currentTiddlerTitle?: string): void;
    /**
     * Delete a text reference
     * @param textRef The text reference string
     * @param currTiddlerTitle Current tiddler title for relative references
     */
    deleteTextReference(textReference: string, currentTiddlerTitle?: string): void;
    /**
     * Count the number of tiddlers in the wiki
     * @param excludeTag Optional tag to exclude from the count
     */
    countTiddlers(excludeTag?: string): number;
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
    getCacheForTiddler<T>(
      title: string,
      cacheName: string,
      initializer: () => T,
    ): T;
    /**
     * clear all cache, will be called when a tiddler is changed
     */
    clearGlobalCache(): void;
    /**
     * Clear all caches associated with a particular tiddler, or if the title is null, clear all caches for all tiddlers
     * @param title Tiddler title or null to clear all caches
     */
    clearCache(title?: string | null): void;
    /**
     * Compile filter string to be a function that execute the filter in the wiki.
     * You can pass an optional iterator that provide the input to the returned function. If no iterator is provided, filter will use first operator to get input.
     *
     * @returns a function with the signature fn(source,widget) where:
        source: an iterator function for the source tiddlers, called source(iterator), where iterator is called as iterator(tiddler,title)
        widget: an optional widget node for retrieving the current tiddler etc.
     */
    compileFilter(
      filterString: string,
    ): (
      source?: ((iterator: SourceIterator) => void) | string[] | Record<string, unknown>,
      widget?: Widget,
    ) => string[];
    /**
     * @param filterString
     * @param widget an optional widget node for retrieving the current tiddler etc.
     * @param source an iterator function for the source tiddlers, called source(iterator), where iterator is called as iterator(tiddler,title)
     */
    /**
     * Returns a function iterator(callback) that iterates through the specified titles, and invokes the callback with callback(tiddler,title)
     */
    makeTiddlerIterator(titles: string[]): SourceIterator;
    /**
     * You can use this with `makeTiddlerIterator`:
     *
     * ```js
     * $tw.wiki.filterTiddlers(filter, undefined, $tw.wiki.makeTiddlerIterator(['title']))
     * ```
     *
     * This calls `compileFilter`
     * @param filterString
     * @param widget
     * @param source
     */
    filterTiddlers(
      filterString: string,
      widget?: Widget,
      source?: SourceIterator,
    ): string[];
    /**
     * Set JSON tiddler, Object in data field will be JSON.stringify and put into the text.
     * This will make tiddler to be JSON data tiddler `"type":"application/json"`, so if you just want to modify existed tiddler's data, use `addTiddler` instead.
     */
    setTiddlerData(
      title: string,
      data?: object,
      fields?: ITiddlerFieldsParameter,
      options?: { suppressTimestamp?: boolean },
    ): void;
    /**
     * Create or update tiddler.
     * Update existed tiddler based on the title field.
     */
    addTiddler(
      tiddler: Tiddler | Partial<ITiddlerFieldsParameter> | Partial<ITiddlerFields>,
    ): void;
    /**
     * Call `addTiddler` for each iton of the list, but should passing `tiddler.fields`, directly passing tiddler object may failed to add in some cases.
     */
    addTiddlers(
      tiddler: Array<Partial<ITiddlerFieldsParameter> | Partial<ITiddlerFields>>,
    ): void;
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
    getTiddlerData<D extends Record<string, unknown> | unknown[] | undefined>(
      titleOrTiddler: string | Tiddler,
      fallbackData?: D,
    ): D;
    /**
     * D is any JSON, like JSON object or JSON array
     *
     * Get the content of a tiddler as a JavaScript object. How this is done depends on the type of the tiddler:

      application/json: the tiddler JSON is parsed into an object
      application/x-tiddler-dictionary: the tiddler is parsed as sequence of name:value pairs

      Other types currently just return undefined or as same as fallbackData.

      titleOrTiddler: string tiddler title or a tiddler object
      defaultData: default data to be returned if the tiddler is missing or doesn't contain data

      Note that the same value is returned for repeated calls for the same tiddler data. The value is frozen to prevent modification; otherwise modifications would be visible to all callers
    */
    getTiddlerDataCached<D>(
      titleOrTiddler: string | Tiddler,
      fallbackData?: D,
    ): D;
    /**
     * Set tiddler text of any field.
     *
     * @param {string} title title of tiddler
     * @param {string} field field name to set
     * @param {string | undefined} index data index(key) to set, if you are setting a JSON data tiddler. Be `undefined` if you are just setting a normal tiddler's field, this will be most of the case.
     * @param {string} value text content to set
     * @param {object} options options, see tiddlywiki dev doc for details
     */
    setText(
      title: string,
      field?: string,
      index?: string,
      value?: string,
      options?: { suppressTimestamp?: boolean },
    ): void;
    /**
      Parse a tiddler according to its MIME type
    */
    parseTiddler(title: string, options?: IParseOptions): WikiParser;
    /**
      Parse a block of text of a specified MIME type
      @param {string} type: MIME content type of text to be parsed
      @param {string} text: text
      @param {object}options: see below

    Options include:
      - parseAsInline: if true, the text of the tiddler will be parsed as an inline run
      - _canonical_uri: optional string of the canonical URI of this content
    */
    parseText(type: string, text: string, options?: IParseOptions): WikiParser;
    /**
     * Extracts tiddlers from a typed block of text, specifying default field values
     * @param {string} type: MIME content type of text to be parsed
     * @param {string} text: text
     * @param {object} srcFields: default field values
     * @param {object} options: see below
     *
     * Options include:
     *  - deserializer: string, key of `$tw.Wiki.tiddlerDeserializerModules`
     */
    deserializeTiddlers(
      type: string,
      text: string,
      sourceFields?: ITiddlerFieldsParameter,
      options?: IParseOptions,
    ): ITiddlerFieldsParameter[];
    /**
      Parse text from a tiddler and render it into another format
        outputType: content type for the output
        title: title of the tiddler to be rendered
        options: see below
      Options include:
      variables: hashmap of variables to set
      parentWidget: optional parent widget for the root node
      */
    renderTiddler(
      outputType: OutputMimeTypes,
      title: string,
      options?: IRenderOptions,
    ): string;
    /**
      Parse text in a specified format and render it into another format
       @param outputType content type for the output
       @param textType content type of the input text
       @param text input text
       @param options see below, Options includes:
      - variables: hashmap of variables to set
      - parentWidget: optional parent widget for the root node
    */
    renderText(
      outputType: OutputMimeTypes,
      textType: string,
      text: string,
      options?: Partial<IMakeWidgetOptions> & IParseOptions,
    ): string;
    /**
      Make a widget tree for a parse tree
      @params parser: parser object
      @params options: see below
      Options include:
      document: optional document to use
      variables: hashmap of variables to set
      parentWidget: optional parent widget for the root node
    */
    makeWidget(
      parser: { tree: IParseTreeNode[] },
      options?: IMakeWidgetOptions,
    ): Widget;
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
    /** Test for the existence of a tiddler (excludes shadow tiddlers) */
    tiddlerExists(title: string): boolean;
    /** Determines if a tiddler is a shadow tiddler, regardless of whether it has been overridden by a real tiddler */
    isShadowTiddler(title: string): boolean;
    isBinaryTiddler(title: string): boolean;
    isImageTiddler(title: string): boolean;
    isSystemTiddler(title: string): boolean;
    isTemporaryTiddler(title: string): boolean;
    isVolatileTiddler(title: string): boolean;
    /**
     * Like addTiddler() except it will silently reject any plugin tiddlers that are older than the currently loaded version. Returns true if the tiddler was imported
     */
    importTiddler(title: string): boolean;
    /** return shadowTiddlers[title].source; */
    getShadowSource(title: string): string | null;
    getTiddlerBacklinks(targetTitle: string): string[];
    getTiddlerLinks(title: string): string[];
    /**
     * Return an array of tiddler titles that are directly linked within the given parse tree
     * @param parseTreeRoot The parse tree root node
     */
    extractLinks(parseTreeRoot: IParseTreeNode[]): string[];
    /**
     * Return an array of tiddler titles that are directly transcluded within the given parse tree
     * @param parseTreeRoot The parse tree root node
     * @param title The tiddler being parsed (to ignore self-referential transclusions)
     */
    extractTranscludes(parseTreeRoot: IParseTreeNode[], title?: string): string[];
    /**
     * Return an array of tiddler titles that are transcluded from the specified tiddler
     * @param title Tiddler title
     */
    getTiddlerTranscludes(title: string): string[];
    /**
     * Return an array of tiddler titles that transclude to the specified tiddler
     * @param targetTitle Target tiddler title
     */
    getTiddlerBacktranscludes(targetTitle: string): string[];
    /**
     * Lookup a given tiddler and return a list of all the tiddlers that include it in the specified list field
     * @param targetTitle Target tiddler title
     * @param fieldName Field name (defaults to "list")
     */
    findListingsOfTiddler(targetTitle: string, fieldName?: string): string[];
    getPluginInfo(title: string): { tiddlers: Record<string, ITiddlerFields> };
    getChangeCount(title: string): number;
    /**
      Generate an unused title from the specified base
      options.prefix must be a string
    */
    generateNewTitle(baseTitle: string, options: { prefix?: string }): string;
    /**
     * Get a subtiddler from a plugin or data tiddler
     * @param title Title of the plugin or data tiddler
     * @param subTiddlerTitle Title of the subtiddler within the bundle
     */
    getSubTiddler(title: string, subTiddlerTitle: string): Tiddler | null;
    /**
     * Return a hashmap of tiddler titles that are referenced but not defined
     */
    /**
     * Return a hashmap of the fields that should be set when a tiddler is created
     */
    getCreationFields(): { created?: Date; creator?: string };
    /**
     * Return a hashmap of the fields that should be set when a tiddler is modified.
     * This is used for generating `modified` field when modify tiddler using actions like `action-setmultiplefields`
     */
    getModificationFields(): { modified?: Date; modifier?: string };
    /**
     * Retrieves a list of the tiddler titles that are tagged with a given tag
     */
    getTiddlersWithTag(tag: string): string[];

    getMissingTitles(): string[];
    /**
     * Return an array of tiddler titles that are not linked from any other tiddler
     */
    getOrphanTitles(): string[];
    /**
     * Sorts an array of tiddler titles according to an ordered list
     * @param array Array of tiddler titles to sort
     * @param listTitle Title of tiddler containing the ordered list
     */
    sortByList(array: string[], listTitle: string): string[];
    /**
     * Get a hashmap by tag of arrays of tiddler titles
     */
    getTagMap(): Record<string, string[]>;
    /**
     * Find any existing draft of a specified tiddler
     * @param targetTitle Title of the target tiddler
     */
    findDraft(targetTitle: string): string | undefined;
    /**
     * Check whether the specified draft tiddler has been modified
     * @param title Title of the draft tiddler
     */
    isDraftModified(title: string): boolean;
    /**
     * Add a new tiddler to the story river
     * @param title A title string or an array of title strings
     * @param fromTitle The title of the tiddler from which the navigation originated
     * @param storyTitle Title of story tiddler (defaults to $:/StoryList)
     * @param options Additional options
     * @deprecated Use story.addToStory() from the story object instead
     */
    addToStory(title: string | string[], fromTitle?: string, storyTitle?: string, options?: { openLinkFromInsideRiver?: boolean; openLinkFromOutsideRiver?: boolean }): void;
    /**
     * Add a new record to the top of the history stack
     * @param title A title string or an array of title strings
     * @param fromPageRect Page coordinates of the origin of the navigation
     * @param historyTitle Title of history tiddler (defaults to $:/HistoryList)
     * @deprecated Use story.addToHistory() from the story object instead
     */
    addToHistory(title: string | string[], fromPageRect?: unknown, historyTitle?: string): void;
    /**
     * Generate a draft title for a given tiddler
     * @param title Title of the tiddler to create a draft for
     */
    generateDraftTitle(title: string): string;
    /**
     * Convert a title to a URL-friendly slug
     * @param title Title to slugify
     * @param options Options (currently unused)
     */
    slugify(title: string, options?: { separator?: string }): string;
    /**
     * Invoke the available upgrader modules
     * @param titles Array of tiddler titles to be processed
     * @param tiddlers Hashmap by title of tiddler fields of pending import tiddlers
     */
    invokeUpgraders(titles: string[], tiddlers: Record<string, ITiddlerFields>): Record<string, string>;
    /**
     * Determine whether a plugin by title is dynamically loadable
     * @param title Plugin title
     */
    doesPluginRequireReload(title: string): boolean;
    /**
     * Determine whether a plugin info structure is dynamically loadable
     * @param pluginInfo Plugin info object
     */
    doesPluginInfoRequireReload(pluginInfo: IPluginInfo): boolean | null;
    /**
     * Execute an action string without an associated context widget
     * @param actions Action string to execute
     * @param event Event object
     * @param variables Variables hashmap
     * @param options Options including parentWidget
     */
    invokeActionString(actions: string, event?: IWidgetEvent | null, variables?: Record<string, string>, options?: { parentWidget?: Widget }): void;
    /**
     * Read an array of browser File objects
     * @param files Array of File objects
     * @param options Options or callback function
     */
    readFiles(files: File[], options?: { callback?: (tiddlerFieldsArray: ITiddlerFields[]) => void } | ((tiddlerFieldsArray: ITiddlerFields[]) => void)): number;
    /**
     * Read a browser File object
     * @param file File object
     * @param options Options or callback function
     */
    readFile(file: File, options?: { callback?: (tiddlerFieldsArray: ITiddlerFields[]) => void; deserializer?: string } | ((tiddlerFieldsArray: ITiddlerFields[]) => void)): void;
    /**
     * Lower level utility to read the content of a browser File object
     * @param file File object
     * @param type MIME type
     * @param isBinary Whether the file is binary
     * @param deserializer Deserializer name
     * @param callback Callback function
     */
    readFileContent(file: File, type: string, isBinary: boolean, deserializer: string | undefined, callback: (tiddlerFieldsArray: ITiddlerFields[]) => void): void;
    /**
     * Get substituted text with variable and filter replacements
     * @param text Text to perform substitutions on
     * @param widget Widget for context
     * @param options Options including substitutions array
     */
    getSubstitutedText(text: string, widget: Widget, options?: { substitutions?: Array<{ name: string; value: string }> }): string;
    /**
     * Parse a text reference and get parser info
     * @param title Title of tiddler
     * @param field Field name
     * @param index Index name
     * @param options Options including subTiddler and defaultType
     */
    getTextReferenceParserInfo(
      title: string,
      field?: string,
      index?: string,
      options?: { subTiddler?: string; defaultType?: string },
    ): { parserType: string | null; sourceText: string | null };
    /**
     * Parse a text reference
     * @param title Title of tiddler
     * @param field Field name
     * @param index Index name
     * @param options Parse options
     */
    parseTextReference(title: string, field?: string, index?: string, options?: IParseOptions): WikiParser | null;
    /**
     * Get the size of tiddler event queue
     */
    getSizeOfTiddlerEventQueue(): number;
    /**
     * Clear the tiddler event queue
     */
    clearTiddlerEventQueue(): void;
    /**
     * Enqueue a tiddler event (internal method)
     * @param title Tiddler title
     * @param isDeleted Whether the tiddler was deleted
     * @param isShadow Whether this is a shadow tiddler change
     */
    enqueueTiddlerEvent(title: string, isDeleted?: boolean, isShadow?: boolean): void;
    /**
     * Initialize parsers (internal method)
     * @param moduleType Module type
     */
    initParsers(moduleType?: string): void;
    /**
     * Add indexers to this wiki (internal method)
     */
    addIndexersToWiki(): void;

    removeEventListener(
      type: string,
      handler: (event: unknown) => void | Promise<void>,
    ): void;

    addEventListener(
      type: string,
      handler: (event: unknown) => void | Promise<void>,
    ): void;
    addEventListener(
      type: 'change',
      handler: (change: IChangedTiddlers) => void | Promise<void>,
    ): void;
    addEventListener(
      type: 'lazyLoad',
      handler: (title: string) => void | Promise<void>,
    ): void;

    dispatchEvent(
      type: string,
      dataOrEvent: unknown,
    ): void;
    dispatchEvent(
      type: 'change',
      change: IChangedTiddlers,
    ): void;
    dispatchEvent(
      type: 'lazyLoad',
      title: string,
    ): void;
  }
}
