/// <reference path="hooks.d.ts" />
/// <reference path="boot/index.d.ts" />
/// <reference path="wiki/index.d.ts" />
/// <reference path="utils/index.d.ts" />
/// <reference path="tiddler/index.d.ts" />
/// <reference path="modules/index.d.ts" />
/// <reference path="plugins/index.d.ts" />

declare module 'tiddlywiki' {
  export interface IPluginInfo {
    version: string;
    'plugin-type': string;
    dependents: string;
    type: 'application/json';
    text: string;
    [pluginProperty: string]: string;
  }

  export interface ILanguage {
    getString(key: string, options: { variables: { title: string } }): string;
  }

  export type IWikiInfo = Record<string, unknown>;

  export interface ITiddlyWiki {
    Wiki: typeof Wiki;
    Story: typeof Story;
    Tiddler: typeof Tiddler;

    wiki: Wiki;
    boot: IBoot;
    crypto: Crypto;
    utils: IUtils;
    version: string;
    safeMode: boolean;
    config: IConfig;
    rootWidget: Widget;
    notifier: Notifier;
    language: ILanguage;
    modules: IModules;
    locationHash: string;
    passwordPrompt: PasswordPrompt;
    packageInfo: Record<string, unknown>;

    /**
     * Check for this window being the source of the drag. If true, some drop target widget will stop responding to the drop event, so you can handle drop event in your own widget.
     * Used by `DropZoneWidget.prototype.handleDropEvent`
     */
    dragInProgress?: boolean;

    /**
     * Global Hooks mechanism which allows plugins to modify default functionality
     */
    hooks: IHooks;

    addUnloadTask(task: any);

    /** Convenience function for pushing a tiddler onto the preloading array */
    preloadTiddler(fields: Record<string, unknown>);
    /** Convenience function for pushing an array of tiddlers onto the preloading array */
    preloadTiddlerArray(fieldsArray: Array<Record<string, unknown>>): void;
    /** External JavaScript can populate this array before calling boot.js in order to preload tiddlers */
    preloadTiddlers: Record<string, Record<string, unknown>>;

    getLibraryItemSearchPaths(libraryPath: string, envVar?: string): string;
    findLibraryItem(name: string, paths: string[]): string | null;
    loadPluginFolder(
      filepath: string,
      excludeRegExp?: RegExp,
    ): IPluginInfo | null;
    loadPlugin(name: string, paths: string[]): void;
    loadPlugins(plugins: string[], libraryPath: string, envVar?: string): void;
    loadWikiTiddlers(
      wikiPath: string,
      options?: { parentPaths?: string; readOnly?: boolean },
    ): IWikiInfo;
    loadTiddlersNode(): void;
    loadTiddlersBrowser(): void;
    loadTiddlersFromFile(
      filepath: string,
      defaultFields?: Record<string, unknown>,
    ): {
      filepath: string;
      type: string;
      tiddlers: ITiddlerFields[];
      hasMetaFile: boolean;
    };
    loadMetadataForFile(filepath: string): ITiddlerFields | null;
    loadTiddlersFromPath(
      filepath: string,
      excludeRegExp?: RegExp,
    ): ITiddlerFields[];
    loadTiddlersFromSpecification(
      filepath: string,
      excludeRegExp?: RegExp,
    ): ITiddlerFields[];

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
    /** NodeJS features, if tw isn't running on a NodeJS environment, the value will be `null` */
    node: null | Record<string, any>;
    /** Broswer features, if tw isn't running on a browser environment, the value will be `null` */
    nodeWebKit: null | Record<string, any>;
  }
}
