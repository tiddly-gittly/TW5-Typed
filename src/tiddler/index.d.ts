declare module 'tiddlywiki' {
  export type ITiddlerCache = Record<string, unknown>;

  export interface ITiddlerFields {
    readonly [anyKey: string]: unknown;
    readonly color?: string;
    readonly created: Date;
    readonly list?: string[];
    readonly modified: Date;
    readonly tags: string[];
    readonly text: string;
    readonly title: string;
    readonly type: string;
  }

  export class Tiddler {
    static fieldModules: Record<string, IModuleInfo>;

    readonly cache: ITiddlerCache;

    readonly fields: ITiddlerFields;

    /**
     *
     * @param tiddlers multiple tiddler fields or instances, will merge them to create a new one
     */
    constructor(...tiddlers: Array<Record<string, unknown> | Tiddler>);

    hasField(field: string): boolean;

    isEqual(tiddler: Tiddler, excludeFields: string[]): boolean;
  }
}
