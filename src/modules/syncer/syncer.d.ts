declare module 'tiddlywiki' {
  export class Syncer {
    pollTimerInterval: number;
    syncadaptor?: SyncAdaptor;
    /**
      Synchronise from the server by reading the skinny tiddler list and queuing up loads for any tiddlers that we don't already have up to date
    */
    syncFromServer(): void;
    /**
      Process the next task
    */
    processTaskQueue(): void;
    /**
      Update the document body with the class "tc-dirty" if the wiki has unsaved/unsynced changes
    */
    updateDirtyStatus(): void;
    /**
    Checks whether the wiki is dirty (ie the window shouldn't be closed)
    */
    isDirty(): boolean;
    /**
     * Return an array of the tiddler titles that are subjected to syncing
     */
    getSyncedTiddlers(): string[];
    /**
     * Get stringified revision number, for example, `'0'`.
     */
    getTiddlerRevision(title: string): string;
    /**
     * Read (or re-read) the latest tiddler info from the store
     */
    readTiddlerInfo(): void;
  }
}
