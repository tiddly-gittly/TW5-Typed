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

  export interface ITiddlyWiki {
    Story: typeof Story;
    Syncer: new() => Syncer;
    Tiddler: typeof Tiddler;
    Wiki: typeof Wiki;
    addUnloadTask(task: any);
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
    findLibraryItem(name: string, paths: string[]): string | null;
    getLibraryItemSearchPaths(libraryPath: string, environmentVariable?: string): string;
    /**
     * Global Hooks mechanism which allows plugins to modify default functionality
     */
    hooks: IHooks;
    keyboardManager: KeyboardManager;
    language: ILanguage;
    loadMetadataForFile(filepath: string): ITiddlerFields | null;
    loadPlugin(name: string, paths: string[]): void;
    loadPluginFolder(
      filepath: string,
      excludeRegExp?: RegExp,
    ): IPluginInfo | null;
    loadPlugins(plugins: string[], libraryPath: string, environmentVariable?: string): void;
    loadTiddlersBrowser(): void;
    loadTiddlersFromFile(
      filepath: string,
      defaultFields?: Record<string, unknown>,
    ): ITiddlersInFile;
    loadTiddlersFromPath(
      filepath: string,
      excludeRegExp?: RegExp,
    ): ITiddlerFields[];
    loadTiddlersFromSpecification(
      filepath: string,
      excludeRegExp?: RegExp,
    ): ITiddlerFields[];

    loadTiddlersNode(): void;

    loadWikiTiddlers(
      wikiPath: string,
      options?: { parentPaths?: string; readOnly?: boolean },
    ): IWikiInfo;

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
