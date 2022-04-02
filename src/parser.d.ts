/// <reference path="ast.d.ts" />

declare module 'tiddlywiki' {
  export interface IParserOptions {
    /**
     * Optional source uri, used in parseText
     */
    _canonical_uri?: string;
    /**
     * While calling `getCacheForTiddler`, use inlineParseTree or blockParseTree
     */
    parseAsInline?: boolean;
  }

  export class WikiParseRule {
    is: { block?: boolean; inline?: boolean };
    match?: null;
    matchRegExp?: RegExp;
    parser?: WikiParser;
    nextTag?: null;
    /** `{type: 'macrocall', start: 261, params: Array(1), name: 'reuse-tiddler', end: 290}` */
    nextCall?: {
      end: number;
      name: string;
      /** `{ type: 'macro-parameter'; start: 276; value: '快速创建新笔记按钮'; end: 288 }` */
      params: { end: number; start: number; type: string; value: string };
      start: number;
      type: string;
    };
  }
  export class WikiParser {
    blockRules: Array<{ matchIndex?: number; rule: WikiParseRule }>;
    inlineRules: Array<{ matchIndex?: number; rule: WikiParseRule }>;
    pragmaRules: Array<{ matchIndex?: number; rule: WikiParseRule }>;
    configTrimWhiteSpace: boolean;
    pos: number;
    source: string;
    sourceLength: number;
    type: string;
    wiki: Wiki;
    tree: IParseTreeNode[];
  }
}
