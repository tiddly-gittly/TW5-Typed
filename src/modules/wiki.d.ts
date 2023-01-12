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
  options: { subTiddler: string },
) => { sourceText: null | string; parserType: string | null };

declare module 'tiddlywiki' {
  export interface Wiki {
    getCreationFields: typeof getCreationFields;

    getModificationFields: typeof getModificationFields;

    getTiddlersWithTag: typeof getTiddlersWithTag;
  }
}

declare module '$:/core/modules/wiki.js' {
  export { getModificationFields, getCreationFields, getTiddlersWithTag };
}