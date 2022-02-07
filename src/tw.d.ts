declare module 'tiddlywiki' {
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

  export interface IPluginInfo {
    tiddlers: ITiddlerFields[];
  }

  export interface IFileExtensionInfo {
    type: string;
  }

  export interface IContentTypeInfo {
    deserializerType: string;
    encoding: string;
    extension: string;
    flags: string[];
  }

  export interface TiddlyWiki {
    Tiddler: typeof Tiddler;
    Wiki: typeof Wiki;

    boot: {
      argv: string[];
      files: IBootFilesIndex;
      log(logString: string): void;
      logMessages: string[];
      startup(options: { callback?: () => unknown }): void;
      /** Default boot tasks */
      tasks: {
        readBrowserTiddlers: boolean;
        trapErrors: boolean;
      };
    };

    browser: null | object;

    config: ITWConfig;

    hooks: {
      addHook: (hookName: string, callback: (...arguments_: unknown[]) => unknown) => void;
    };

    modules: ITWModules;
    /** NodeJS features, if tw isn't running on a NodeJS environment, the value will be `null` */
    node: null | object;
    /** Broswer features, if tw isn't running on a browser environment, the value will be `null` */
    nodeWebKit: null | object;

    /** Convenience function for pushing a tiddler onto the preloading array */
    preloadTiddler(fields: Record<string, unknown>): void;
    /** Convenience function for pushing an array of tiddlers onto the preloading array */
    preloadTiddlerArray(fieldsArray: Array<Record<string, unknown>>): void;
    /** External JavaScript can populate this array before calling boot.js in order to preload tiddlers */
    preloadTiddlers: Record<string, Record<string, unknown>>;

    utils: ITWUtils;

    version: string;

    wiki: Wiki;
  }

  export function TiddlyWiki(): TiddlyWiki;

  global {
    const $tw: TiddlyWiki;
  }
}
