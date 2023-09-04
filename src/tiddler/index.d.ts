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

    hasTag(field: string): boolean;
    hasField(): boolean;
    isPlugin(): boolean;
    isDraft(): boolean;
    /**
     * Stringify the field with the associated tiddler field module (if any)
     */
    getFieldString(field: string, defaultValue?: string): string;
    /**
      Get all the fields as a hashmap of strings. Options:
      exclude: an array of field names to exclude
    */
    getFieldStrings(options?: { exclude?: string[] }): string;
    getFieldDay(field: string): string;
    /**
      Get the value of a field as a list
    */
    getFieldList(field: string, defaultValue?: string): string[];
    /**
    Get all the fields as a name:value block.
    @param options:
      - exclude: an array of field names to exclude
    */
    getFieldStringBlock(options: { exclude?: string[] }): string;

    isEqual(tiddler: Tiddler, excludeFields?: string[]): boolean;
  }
}
