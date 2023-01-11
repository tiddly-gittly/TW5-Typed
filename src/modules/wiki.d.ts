declare const getCreationFields: () => { created?: Date; creator?: string };
declare const getModificationFields: () => {
  modified?: Date;
  modifier?: string;
};
declare const getTiddlersWithTag: (tag: string) => string[];

declare module 'tiddlywiki' {
  class Wiki {
    getCreationFields: typeof getCreationFields;

    getModificationFields: typeof getModificationFields;

    getTiddlersWithTag: typeof getTiddlersWithTag;
  }
}

declare module '$:/core/modules/wiki.js' {
  export { getModificationFields, getCreationFields, getTiddlersWithTag };
}
