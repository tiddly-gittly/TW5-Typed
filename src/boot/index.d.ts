/// <reference path="config.d.ts" />

declare module 'tiddlywiki' {
  export interface IBootFilesIndexItem {
    filepath: string;
    hasMetaFile: boolean;
    isEditableFile: boolean;
    type: string;
  }

  /**
   * Key is `tiddlerTitle: string;`
   */
  export type IBootFilesIndex = Record<string, IBootFilesIndexItem>;

  export interface IStartUpOption {
    bootPath?: string;
    callback?: () => unknown;
  }

  export interface IBoot {
    argv: string[];
    boot: (callback?: () => void) => void;
    files: IBootFilesIndex;
    log: (logString: string) => void;
    logMessages: string[];
    startup: (options: IStartUpOption) => void;
    /** Default boot tasks */
    tasks: {
      readBrowserTiddlers: boolean;
      trapErrors: boolean;
    };
    excludeRegExp: RegExp;
    /** Exist in nodejs wiki, Load the tiddlers from the wiki directory */
    wikiInfo?: ITiddlyWikiInfoJSON;
    /** Exist in nodejs wiki, absolute path of wiki root folder */
    wikiPath?: string;
    /** Exist in nodejs wiki, usually is `./tiddlers` */
    wikiTiddlersPath?: string;
  }
}
