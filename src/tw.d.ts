declare module 'tiddlywiki' {
  export interface ITiddler {
    cache: ITiddlerCache;
    fields: ITiddlerFields;
  }

  export interface ITiddlerFields {
    created: string;
    list: string[];
    modified: string;
    tags: string[];
    text: string;
    title: string;
    type: string;
    [anyKey: string]: unknown;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ITiddlerCache {}

  /**
   * filepath: '/Users/linonetwo/xxxx/wiki/Meme-of-LinOnetwo/tiddlers/tiddlerTitle.tid',
   * hasMetaFile: false
   * tiddlerTitle: string,
   * type: 'application/x-tiddler',
   */
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

  export interface I$TW {
    boot: { argv: string[]; files: IBootFilesIndex; startup: (options: { callback?: () => unknown }) => void };
    hooks: { addHook: (hookName: string, callback: (...arguments_: any[]) => unknown) => void };
    wiki: {
      getTiddler: (title: string) => ITiddler | undefined;
      /**
       * Get full list of tiddler titles in the wiki
       */
      getTiddlers: () => string[];
    };
    utils: Record<string, any>;
  }
  export function TiddlyWiki(): I$TW;

  global {
    var $tw: I$TW;
  }
}
