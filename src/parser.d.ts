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

  export declare class WikiParseRule {
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
  export interface IParseTreeAttribute {
    start: number;
    name: string;
    type: 'string' | 'number';
    value: string;
    end: number;
  }
  export interface IParseTreeNodeBase {
    type: string;
    children: IParseTreeNode[];
    start: number;
    end: number;
    isBlock?: boolean;
    isSelfClosing?: boolean;
    attributes?: Record<string, IParseTreeAttribute>;
    orderedAttributes?: IParseTreeAttribute[];
  }
  export interface IDomParseTreeNode extends IParseTreeNodeBase {
    type: 'element';
    tag: string;
  }
  export interface IMacroParamCallParseTreeNode extends IParseTreeNodeBase {
    type: 'macro-parameter';
    value: string;
    name?: string;
  }
  export interface IMacroCallParseTreeNode extends IParseTreeNodeBase {
    type: 'macrocall';
    name: string;
    params: IMacroParamCallParseTreeNode[];
  }
  export interface ICustomParseTreeNode extends IParseTreeNodeBase {
    type: string;
    tag?: string;
    params: IMacroParamCallParseTreeNode[];
  }
  export type IParseTreeNode = IDomParseTreeNode;
  export declare class WikiParser {
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
