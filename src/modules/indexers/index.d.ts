declare module 'tiddlywiki' {
  /**
   * Abstract class representing an indexer in TiddlyWiki. Indexers maintain indexes of tiddlers organized efficiently for different types of access, improving the speed of certain filter operations.
   * @url https://tiddlywiki.com/dev/#indexer%20modules
   */
  abstract class Indexer {
    protected wiki: Wiki;

    /**
     * Constructs an Indexer instance.
     * @param {Wiki} wiki - The wiki object associated with this indexer.
     */
    constructor(wiki: Wiki) {
      this.wiki = wiki;
    }

    /**
     * Initializes the indexer, performing any necessary setup.
     */
    abstract init(): void;

    /**
     * Rebuilds the indexer's index from scratch. Typically used after a significant number of changes in the wiki.
     */
    abstract rebuild(): void;

    /**
     * Updates the index based on changes to a tiddler.
     * @param {Object} updateDescriptor - Describes the changes to the tiddler.
     * @param {Object} updateDescriptor.old - The state of the tiddler before the update.
     * @param {boolean} updateDescriptor.old.exists - Indicates if the tiddler existed before the update.
     * @param {boolean} updateDescriptor.old.shadow - Indicates if the tiddler was a shadow tiddler before the update.
     * @param {Tiddler} updateDescriptor.old.tiddler - The tiddler before the update.
     * @param {Object} updateDescriptor.new - The state of the tiddler after the update.
     * @param {boolean} updateDescriptor.new.exists - Indicates if the tiddler exists after the update.
     * @param {boolean} updateDescriptor.new.shadow - Indicates if the tiddler is a shadow tiddler after the update.
     * @param {Tiddler} updateDescriptor.new.tiddler - The tiddler after the update.
     */
    abstract update(updateDescriptor: {
      new: { exists: boolean; shadow: boolean; tiddler: Tiddler };
      old: { exists: boolean; shadow: boolean; tiddler: Tiddler };
    }): void;
  }
}
