declare const getCreationFields: () => { created?: Date; creator?: string };
declare const getModificationFields: () => {
  modified?: Date;
  modifier?: string;
};
declare const getTiddlersWithTag: (tag: string) => string[];
declare const getTextReferenceParserInfo: (
  title: string,
  field?: string,
  index?: string,
  options?: { subTiddler: string },
) => { sourceText: null | string; parserType: string | null };

declare module 'tiddlywiki' {
  export interface Wiki {
    /**
     * Return a hashmap of the fields that should be set when a tiddler is created
     */
    getCreationFields: typeof getCreationFields;
    /**
     * Return a hashmap of the fields that should be set when a tiddler is modified.
     * This is used for generating `modified` field when modify tiddler using actions like `action-setmultiplefields`
     */
    getModificationFields: typeof getModificationFields;
    /**
     * Retrieves a list of the tiddler titles that are tagged with a given tag
     */
    getTiddlersWithTag: typeof getTiddlersWithTag;
  }
}

declare module '$:/core/modules/wiki.js' {
  export { getModificationFields, getCreationFields, getTiddlersWithTag };
}
