declare module 'tiddlywiki' {
  export type SourceIterator = (tiddler: Object, title: string) => void;
  export interface ISearchOptions {
    /** an iterator function for the source tiddlers, called source(iterator), where iterator is called as iterator(tiddler,title) */
    source?: (iter: SourceIterator) => void;
    /** An array of tiddler titles to exclude from the search */
    exclude?: string[];
    /** If true returns tiddlers that do not contain the specified string */
    invert?: boolean;
    /** If true forces a case sensitive search */
    caseSensitive?: boolean;
    /** If specified, restricts the search to the specified field, or an array of field names */
    field?: string | string[];
    /** If true, forces all but regexp searches to be anchored to the start of text */
    anchored?: boolean;
    /** If true, the field options are inverted to specify the fields that are not to be searched */
    excludeField?: boolean;
    /** searches for literal string */
    literal?: boolean;
    /** same as literal except runs of whitespace are treated as a single space */
    whitespace?: boolean;
    /** (default) treats search string as a list of tokens, and matches if all tokens are found, regardless of adjacency or ordering */
    words?: boolean;
  }

  export interface IFilterOperatorParamOperator {
    /** the name of the filter operator specified in the WikiText; */
    operator: string;
    /** the operand for the filter step (as a string; if the filter specified it in angle brackets or braces, the text reference or letiable name will have already been resolved); */
    operand: string;
    /** (optional) a string containing a single exclamation mark if the filter operator is to be negated; */
    prefix?: string;
    /** (optional) a string containing an additional filter argument (typically a tiddler field name) following the filter name (separated by a colon in the filter syntax); */
    suffix?: string;
    /** multiple suffix
     * for example, in `search:<field list>:<flag list>[<operand>]`, you will get `<field list>` as suffixes[0], and `<flag list>` as suffixes[1]
     */
    suffixes?: string[][];
    /** (optional, deprecated) used instead of `operand` if the filter operand is a regexp. */
    regexp?: string;
  }
}
