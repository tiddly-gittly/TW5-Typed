declare module 'tiddlywiki' {
  interface IHooks {
    /** Add hooks to the hashmap */
    addHook(
      hookName: 'th-server-command-post-start',
      callback: (
        server: unknown,
        nodeServer: Server,
        who: 'tiddlywiki',
      ) => void,
    );
    addHook(
      hookName: 'th-saving-tiddler',
      callback: (toTiddler: Tiddler, fromTiddler: Tiddler) => Tiddler | undefined,
    );
    addHook(
      hookName: 'th-renaming-tiddler',
      callback: (toTiddler: Tiddler, fromTiddler: Tiddler) => Tiddler | undefined,
    );
    addHook(
      hookName: 'th-relinking-tiddler',
      callback: (toTiddler: Tiddler, fromTiddler: Tiddler) => Tiddler | undefined,
    );
    addHook(
      hookName: 'th-importing-tiddler',
      callback: (tiddler: Tiddler) => Tiddler | undefined,
    );
    addHook(
      hookName: 'th-before-importing',
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
    addHook(hookName: 'th-navigating', callback: (event: unknown) => unknown);
    addHook(
      hookName: 'th-closing-tiddler',
      callback: (event: unknown) => unknown,
    );
    addHook(
      hookName: 'th-editing-tiddler',
      callback: (event: unknown) => unknown,
    );
    addHook(
      hookName: 'th-cancelling-tiddler',
      callback: (event: unknown) => unknown,
    );
    addHook(hookName: 'th-new-tiddler', callback: (event: unknown) => unknown);
    addHook(hookName: 'th-deleting-tiddler', callback: (title: string) => void);
    addHook(hookName: 'th-page-refreshed', callback: () => void);
    addHook(hookName: 'th-boot-tiddlers-loaded', callback: () => void);
    addHook(hookName: 'th-page-refreshed', callback: () => void);
    addHook(hookName: 'th-page-refreshing', callback: () => void);
    addHook(hookName: 'th-page-refreshed', callback: () => void);
    addHook(
      hookName: 'th-importing-file',
      callback: (props: {
        // eslint-disable-next-line @typescript-eslint/ban-types
        callback: Function;
        file: { lastModified?: number; lastModifiedDate?: Date; name: string; path?: string; size: number; type: string; webkitRelativePath?: string };
        isBinary: boolean;
        type: string;
      }) => boolean | undefined,
    );
    addHook(hookName: string, callback: (...arguments_: unknown[]) => unknown);
    /**
     * Invoke the hook by key
     */
    invokeHook(hookName: string, event: IWidgetEvent): undefined | IWidgetEvent;
    // eslint-disable-next-line @typescript-eslint/ban-types
    names: Record<string, Function[]>;
  }
}
