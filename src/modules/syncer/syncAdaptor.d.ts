declare module 'tiddlywiki' {
  /**
   * SyncAdaptorModules
   * @url https://tiddlywiki.com/dev/#SyncAdaptorModules
   */
  export interface SyncAdaptor {
    getTiddlerFileInfo(
      title: string,
      callback: (error: null, fileInfo: IFileInfo) => void,
    ): void;
    getTiddlerInfo(title: string): IBootFilesIndexItem;
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
