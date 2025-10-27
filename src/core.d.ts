/// <reference path="hooks.d.ts" />
/// <reference path="boot/index.d.ts" />
/// <reference path="wiki/index.d.ts" />
/// <reference path="utils/index.d.ts" />
/// <reference path="tiddler/index.d.ts" />
/// <reference path="modules/index.d.ts" />
/// <reference path="plugins/index.d.ts" />
/// <reference path="modules/utils/dom/index.d.ts" />

declare module 'tiddlywiki' {
  export interface IPluginInfo {
    [pluginProperty: string]: string;
    dependents: string;
    'plugin-type': string;
    text: string;
    type: 'application/json';
    version: string;
  }

  export interface ILanguage {
    getString(key: string, options: { variables: { title: string } }): string;
  }

  export interface IMacro {
    name: string;
    params: any[][];
    // eslint-disable-next-line @typescript-eslint/ban-types
    run: Function;
  }

  export type IWikiInfo = Record<string, unknown>;

  export interface ITiddlersInFile {
    filepath: string;
    hasMetaFile: boolean;
    tiddlers: ITiddlerFields[];
    type: string | null;
  }

  export interface ITiddlyWiki {
    Story: typeof Story;
    Syncer: new() => Syncer;
    Tiddler: typeof Tiddler;
    Wiki: typeof Wiki;
    /**
     * Add another unload task
     * @param task - Function to be called on unload
     */
    addUnloadTask(task: any): void;
    boot: IBoot;

    browser: null | {
      is?: {
        android?: boolean;
        bada?: boolean;
        blackberry?: boolean;
        chrome?: boolean;
        firefox?: boolean;
        firefoxos?: boolean;
        gecko?: boolean;
        ios?: boolean;
        ipad?: boolean;
        iphone?: boolean;
        mobile?: boolean;
        name?: boolean;
        opera?: boolean;
        phantomjs?: boolean;
        safari?: boolean;
        sailfish?: boolean;
        seamonkey?: boolean;
        silk?: boolean;
        tizen?: boolean;
        version?: boolean;
        webkit?: boolean;
        webos?: boolean;
        windowsphone?: boolean;
      };
      /**
       * @deprecated
       * Install `$:/plugins/tiddlywiki/browser-sniff` to use `browser.is`
       */
      isFirefox: boolean;
      /**
       * @deprecated
       * Install `$:/plugins/tiddlywiki/browser-sniff` to use `browser.is`
       */
      isIE: boolean;
    };
    config: IConfig;
    crypto: Crypto;
    /**
     * Check for this window being the source of the drag. If true, some drop target widget will stop responding to the drop event, so you can handle drop event in your own widget.
     * Used by `DropZoneWidget.prototype.handleDropEvent`
     */
    dragInProgress?: boolean;
    fakeDocument: IFakeDocument;
    /**
     * Find a library item (plugin/theme/language) by name in the given search paths
     * @param name - Name of the library item to find
     * @param paths - Array of file paths to search for it
     * @returns The path of the library item folder, or null if not found
     */
    findLibraryItem(name: string, paths: string[]): string | null;
    /**
     * Get the search paths for library items (plugins/themes/languages)
     * @param libraryPath - Path of library folder relative to core path
     * @param environmentVariable - Optional environment variable name for additional paths
     * @returns Array of search paths
     */
    getLibraryItemSearchPaths(libraryPath: string, environmentVariable?: string): string[];
    /**
     * Global Hooks mechanism which allows plugins to modify default functionality
     */
    hooks: IHooks;
    keyboardManager: KeyboardManager;
    language: ILanguage;
    /**
     * Load the metadata fields in the .meta file corresponding to a particular file
     * @param filepath - The path to the file
     * @returns The metadata fields or null if no .meta file exists
     */
    loadMetadataForFile(filepath: string): ITiddlerFields | null;
    /**
     * Load a plugin by name from the given search paths
     * @param name - Name of the plugin (e.g., "tiddlywiki/filesystemadaptor")
     * @param paths - Array of file paths to search for it
     */
    loadPlugin(name: string, paths: string[]): void;
    /**
     * Load the tiddlers from a plugin folder, and package them up into a proper JSON plugin tiddler
     * @param filepath - Path to the plugin folder
     * @param excludeRegExp - Optional regex for files to exclude
     * @returns Plugin info object or null if not a valid plugin
     */
    loadPluginFolder(
      filepath: string,
      excludeRegExp?: RegExp,
    ): IPluginInfo | null;
    /**
     * Load multiple plugins
     * @param plugins - Array of plugin names (e.g., ["tiddlywiki/filesystemadaptor"])
     * @param libraryPath - Path of library folder for these plugins (relative to core path)
     * @param environmentVariable - Environment variable name for these plugins
     */
    loadPlugins(plugins: string[], libraryPath: string, environmentVariable?: string): void;
    /**
     * Load tiddlers in browser environment
     */
    loadTiddlersBrowser(): void;
    /**
     * Load the tiddlers contained in a particular file (and optionally extract fields from the accompanying .meta file)
     * @param filepath - The path to the file to load
     * @param defaultFields - Optional default fields to apply to loaded tiddlers
     * @returns Object containing filepath, type, tiddlers array, and hasMetaFile flag
     */
    loadTiddlersFromFile(
      filepath: string,
      defaultFields?: Record<string, unknown>,
    ): ITiddlersInFile;
    /**
     * Load all the tiddlers recursively from a directory, including honouring `tiddlywiki.files` files for drawing in external files
     * @param filepath - The path to load from
     * @param excludeRegExp - Optional regex for files to exclude
     * @returns Array of objects containing filepath, type, tiddlers array, and hasMetaFile flag
     * @description Note that no file information is returned for externally loaded tiddlers, just the `tiddlers` property.
     */
    loadTiddlersFromPath(
      filepath: string,
      excludeRegExp?: RegExp,
    ): ITiddlersInFile[];
    /**
     * Load all the tiddlers defined by a `tiddlywiki.files` specification file
     * @param filepath - Pathname of the directory containing the specification file
     * @param excludeRegExp - Optional regex for files to exclude
     * @returns Array of objects containing filepath, type, tiddlers array, and hasMetaFile flag
     */
    loadTiddlersFromSpecification(
      filepath: string,
      excludeRegExp?: RegExp,
    ): ITiddlersInFile[];

    /**
     * Load tiddlers in Node.js environment
     * @description Load boot tiddlers, core tiddlers, extra plugins, and wiki tiddlers
     */
    loadTiddlersNode(): void;

    /**
     * Load wiki tiddlers from a wiki directory
     * @param wikiPath - Path to the wiki directory
     * @param options - Options for loading
     * @param options.parentPaths - Array of parent paths that we mustn't recurse into
     * @param options.readOnly - True if the tiddler file paths should not be retained
     * @returns Wiki info object or null if no tiddlywiki.info file exists
     */
    loadWikiTiddlers(
      wikiPath: string,
      options?: { parentPaths?: string[]; readOnly?: boolean },
    ): IWikiInfo | null;

    locationHash: string;

    macros: Record<string, IMacro>;

    modal: Modal;

    modules: IModules;

    /** NodeJS features, if tw isn't running on a NodeJS environment, the value will be `null` */
    node: null | Record<string, any>;
    /** Broswer features, if tw isn't running on a browser environment, the value will be `null` */
    nodeWebKit: null | Record<string, any>;
    notifier: Notifier;
    packageInfo: Record<string, unknown>;
    passwordPrompt: PasswordPrompt;
    platform: {
      isLinux: boolean;
      isMac: boolean;
      isWindows: boolean;
    };
    /**
     * Convenience function for pushing a tiddler onto the preloading array.
     * @param fields - The fields of the tiddler to push.
     * @description 方便地将一个 tiddler 推入预加载数组中。
     */
    preloadTiddler(fields: Record<string, unknown>): void;
    /**
     * Convenience function for pushing an array of tiddlers onto the preloading array.
     * @param fieldsArray - The array of tiddlers to push.
     * @description 方便地将若干 tiddler 数组推入预加载数组中。
     */
    preloadTiddlerArray(fieldsArray: Array<Record<string, unknown>>): void;
    /** External JavaScript can populate this array before calling boot.js in order to preload tiddlers */
    preloadTiddlers: Record<string, Record<string, unknown>>;
    rootWidget: Widget;
    safeMode: boolean;
    syncadaptor?: SyncAdaptor;

    /**
     * Presents when we have $tw.syncadaptor
     */
    syncer?: Syncer;
    utils: IUtils;
    version: string;
    wiki: Wiki;
  }
}
