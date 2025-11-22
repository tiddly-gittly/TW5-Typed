declare module 'tiddlywiki' {
  import type { Server as HttpServer } from 'node:http';

  interface ImportFileInfo {
    callback: (tiddlerFieldsArray: unknown[]) => void;
    file: { lastModified?: number; lastModifiedDate?: Date; name: string; path?: string; size: number; type: string; webkitRelativePath?: string };
    isBinary: boolean;
    type: string;
  }

  interface IHooks {
    /** Add hooks to the hashmap */
    addHook(
      hookName: 'th-server-command-post-start',
      callback: (
        server: unknown,
        nodeServer: HttpServer,
        who: 'tiddlywiki',
      ) => void,
    ): void;
    addHook(
      hookName: 'th-saving-tiddler' | 'th-renaming-tiddler' | 'th-relinking-tiddler',
      callback: (toTiddler: Tiddler, fromTiddler: Tiddler) => Tiddler | undefined,
    );
    addHook(
      hookName: 'th-importing-tiddler' | 'th-before-importing',
      callback: (tiddler: Tiddler) => Tiddler | undefined,
    );
    addHook(
      hookName: 'th-opening-default-tiddlers-list',
      callback: (storyList: string[]) => string[],
    );
    addHook(
      hookName: 'th-make-tiddler-path',
      callback: (fullPath: string, fullPath: string) => string,
    );
    addHook(
      hookName: 'th-rendering-element',
      callback: (
        parseTreeNodes: IParseTreeNode | null,
        widget: Widget,
      ) => parseTreeNodes,
    );
    addHook(hookName: 'th-navigating' | 'th-closing-tiddler' | 'th-editing-tiddler' | 'th-cancelling-tiddler' | 'th-new-tiddler', callback: (event: unknown) => unknown);
    addHook(hookName: 'th-deleting-tiddler', callback: (title: Tiddler) => void);
    addHook(hookName: 'th-page-refreshed' | 'th-boot-tiddlers-loaded' | 'th-page-refreshing', callback: () => void);
    addHook(
      hookName: 'th-importing-file',
      callback: (props: ImportFileInfo) => boolean | undefined,
    );
    addHook(hookName: string, callback: (...arguments_: unknown[]) => unknown);
    /**
     * Invoke the hook by key
     */
    invokeHook(hookName: string, event: IWidgetEvent): undefined | IWidgetEvent;
    names: Record<string, Array<(...arguments_: unknown[]) => unknown>>;
  }
}
