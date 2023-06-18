declare module 'tiddlywiki' {
  export class Syncer {
    syncadaptor?: SyncAdaptor;
    /**
      Synchronise from the server by reading the skinny tiddler list and queuing up loads for any tiddlers that we don't already have up to date
    */
    syncFromServer(): void;
  }
}
