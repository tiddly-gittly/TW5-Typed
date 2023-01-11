/// <reference path="config.d.ts" />

declare module 'tiddlywiki' {
  export interface IBootFilesIndexItem {
    filepath: string;
    hasMetaFile: boolean;
    tiddlerTitle: string;
    type: string;
  }

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
  }
}
