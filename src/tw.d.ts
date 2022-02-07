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
    encoding: string;
    extension: string;
    flags: string[];
    deserializerType: string;
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

    version: string;
    /** Broswer features, if tw isn't running on a browser environment, the value will be `null` */
    browser: null | object;
    /** NodeJS features, if tw isn't running on a NodeJS environment, the value will be `null` */
    node: null | object;
    nodeWebKit: null | object;
    modules: ITWModules;

    /** External JavaScript can populate this array before calling boot.js in order to preload tiddlers */
    preloadTiddlers: Record<string, Record<string, unknown>>;
    /** Convenience function for pushing a tiddler onto the preloading array */
    preloadTiddler(fields: Record<string, unknown>): void;
    /** Convenience function for pushing an array of tiddlers onto the preloading array */
    preloadTiddlerArray(fieldsArray: Record<string, unknown>[]): void;

    hooks: {
      addHook: (hookName: string, callback: (...arguments_: any[]) => unknown) => void;
    };
    wiki: Wiki;
    utils: ITWUtils;
    config: ITWConfig;
    Tiddler: typeof Tiddler;
    Wiki: typeof Wiki;
  }

  export function TiddlyWiki(): TiddlyWiki;

  global {
    const $tw: TiddlyWiki;
  }
}
