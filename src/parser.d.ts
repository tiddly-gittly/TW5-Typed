/// <reference path="ast.d.ts" />

declare module 'tiddlywiki' {
  export interface IParserOptions {
    /**
     * While calling `getCacheForTiddler`, use inlineParseTree or blockParseTree
     */
    parseAsInline?: boolean;
    /**
     * Optional source uri, used in parseText
     */
    _canonical_uri?: string;
  }

  export class WikiParseRule {
    is: { block?: boolean; inline?: boolean };
    match?: null;
    matchRegExp?: RegExp;
    parser?: WikiParser;
    nextTag?: null;
    /** `{type: 'macrocall', start: 261, params: Array(1), name: 'reuse-tiddler', end: 290}` */
    nextCall?: {
      type: string;
      start: number;
      end: number;
      /** `{ type: 'macro-parameter'; start: 276; value: '快速创建新笔记按钮'; end: 288 }` */
      params: { type: string; start: number; end: number; value: string };
      name: string;
    };
  }
  export class WikiParser {
    blockRules: { rule: WikiParseRule; matchIndex?: number }[];
    inlineRules: { rule: WikiParseRule; matchIndex?: number }[];
    pragmaRules: { rule: WikiParseRule; matchIndex?: number }[];
    configTrimWhiteSpace: boolean;
    pos: number;
    source: string;
    sourceLength: number;
    type: string;
    wiki: Wiki;
    tree: IParseTreeNode[];
  }
}
