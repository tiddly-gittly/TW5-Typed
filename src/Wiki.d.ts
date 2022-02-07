declare module 'tiddlywiki' {
  export class Wiki {
    /**
     * Wiki constructor. State is stored in private members that only a small number of privileged accessor methods have direct access. Methods added via the prototype have to use these accessors and cannot access the state data directly.
     * @param {{ enableIndexers: unknown[] }} options options include:
     * * enableIndexers - Array of indexer names to enable, or null to use all available indexers
     * @memberof Wiki
     */
    constructor(options: { enableIndexers: unknown[] });
    addIndexer(indexer, name): void;
    getTiddler: (title: string) => Tiddler | undefined;
    /**
     * Get full list of tiddler titles in the wiki
     */
    getTiddlers: () => string[];
  }
}
