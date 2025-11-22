declare module 'tiddlywiki' {
  /**
   * SyncAdaptorModules
   * @url https://tiddlywiki.com/dev/#SyncAdaptorModules
   */
  export interface SyncAdaptor {
    getTiddlerFileInfo(
      tiddler: Tiddler,
      callback: (error: Error | null | string, fileInfo: IFileInfo) => void,
    ): void;
    getTiddlerInfo(tiddler: Tiddler): IFileInfo | undefined;
    /**
     * Save a tiddler and invoke the callback with (err, adaptorInfo, revision)
     */
    saveTiddler(
      tiddler: Tiddler,
      callback: (error: Error | null | string, adaptorInfo?: IFileInfo | null, revision?: string) => void,
      options?: { tiddlerInfo?: Record<string, unknown> },
    ): void;
    /**
     * Load a tiddler and invoke the callback with (err, tiddlerFields)
     */
    loadTiddler(
      title: string,
      callback: (error: Error | null | string, tiddlerFields?: Record<string, unknown> | null) => void,
    ): void;
    /**
     * Delete a tiddler and invoke the callback with (err)
     */
    deleteTiddler(
      title: string,
      callback: (error: Error | null | string, adaptorInfo?: IFileInfo | null) => void,
      options?: unknown,
    ): void;
    /**
     * Retrieves the titles of tiddlers that need to be updated from the server.

      This method is optional. If an adaptor doesn't implement it then synchronisation will be unidirectional from the TiddlyWiki store to the adaptor, but not the other way.

      The syncer will use the `getUpdatedTiddlers()` method in preference to the `getSkinnyTiddlers()` method.

      |!Parameter |!Description |
      |syncer |Reference to the syncer object making the call |
      |callback |Callback function invoked with parameter `err,data` -- see below |

      The data provided by the callback is as follows:

      ```
      {
      modifications: [<array of title>],
      deletions: [<array of title>],
      }
      ```
     * @param syncer
     * @param callback
     */
    getUpdatedTiddlers(syncer: Syncer, callback: (error: Error | null | undefined, changes: { deletions: string[]; modifications: string[] }) => void): void;
    isReady(): boolean;
    name: string;
    supportsLazyLoading: boolean;
    wiki: Wiki;
  }
}
