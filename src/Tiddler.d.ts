declare module "tiddlywiki" {
  export class Tiddler {
    constructor(...fields: (Record<string, unknown> | Tiddler)[]);
    readonly cache: ITiddlerCache;
    readonly fields: ITiddlerFields;
    static fieldModules: IModule;
    hasField(field: string): boolean;
    isEqual(tiddler: Tiddler, excludeFields: string[]): boolean;
  }

  export interface ITiddlerFields {
    readonly created: Date;
    readonly list: string[];
    readonly modified: Date;
    readonly tags: string[];
    readonly text: string;
    readonly title: string;
    readonly type: string;
    readonly color: string;
    readonly [anyKey: string]: unknown;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ITiddlerCache {}
}
