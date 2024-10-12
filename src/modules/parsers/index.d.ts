declare module 'tiddlywiki' {
  export interface IParseOptions {
    /**
     * Optional source uri, used in parseText
     */
    _canonical_uri?: string;
    defaultType?: string;
    document?: TWDocument;
    parentWidget?: Widget;
    /**
     * While calling `getCacheForTiddler`, use inlineParseTree or blockParseTree
     */
    parseAsInline?: boolean;
  }

  export class WikiParseRule {
    is: { block?: boolean; inline?: boolean };

    match?: unknown;

    matchRegExp?: RegExp;

    parser?: WikiParser;

    nextTag?: unknown;

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

  export interface IParseTreeAttribute {
    end?: number;
    name?: string;
    start?: number;
    type:
      | 'string'
      | 'number'
      | 'bigint'
      | 'boolean'
      | 'macro'
      | 'macro-parameter';
    value: string | IMacroCallParseTreeNode;
  }

  export interface IWikiASTNode {
    attributes?: Record<string, IParseTreeAttribute>;
    children?: IParseTreeNode[];
    end?: number;
    isBlock?: boolean;
    isMacroDefinition?: boolean;
    isSelfClosing?: boolean;
    orderedAttributes?: IParseTreeAttribute[];
    /** If rule produce a multi-level tree, only top level node from a parse rule will have this. */
    rule?: string;
    start?: number;
    type: string;
  }
  export interface IWikiASTTextNode {
    end?: number;
    start?: number;
    text: string;
    type: string;
  }
  export interface ITextParseTreeNode extends IWikiASTNode {
    text: string;
    type: 'text';
  }
  export interface IImageParseTreeNode extends IWikiASTNode {
    type: 'image';
  }
  export interface ITranscludeParseTreeNode extends IWikiASTNode {
    type: 'transclude';
  }
  export interface ITiddlerParseTreeNode extends IWikiASTNode {
    type: 'tiddler';
  }
  /** HTML tags and widget tags, like `$link` */
  export type HTMLTags = keyof HTMLElementTagNameMap | 'strike' | `$${string}`;

  export interface IDomParseTreeNode extends IWikiASTNode {
    closeTagEnd?: number;
    closeTagStart?: number;
    openTagEnd?: number;
    openTagStart?: number;
    tag: HTMLTags;
    // TODO: only see `link` using this, probably all widgets is using this?
    type: 'element' | 'link';
  }
  export interface ICodeBlockParseTreeNode extends IWikiASTNode {
    attributes: {
      code?: {
        type: 'string';
        value: string;
      };
      language?: {
        type: 'string';
        value: string;
      };
    } & IWikiASTNode['attributes'];
    type: 'codeblock';
  }
  export interface IMacroParameterCallParseTreeNode extends IWikiASTNode {
    name?: string;
    type: 'macro-parameter';
    value: string;
  }
  export interface IMacroCallParseTreeNode extends IWikiASTNode {
    name?: string;
    params?: IMacroParameterCallParseTreeNode[];
    /** `tag: '$macrocall',` */
    tag?: string;
    type: 'macrocall';
  }
  export interface IMacroParseTreeNode extends IWikiASTNode {
    name: string;
    type: 'macro';
    value: IMacroCallParseTreeNode;
  }
  export interface ICustomParseTreeNode extends IWikiASTNode {
    params: IMacroParameterCallParseTreeNode[];
    tag?: string;
    text?: string;
    type: string;
  }
  export type IParseTreeNode =
    | IWikiASTNode
    | IWikiASTTextNode
    | IDomParseTreeNode
    | IMacroParameterCallParseTreeNode
    | IMacroCallParseTreeNode
    | ITextParseTreeNode
    | IImageParseTreeNode
    | ITranscludeParseTreeNode
    | ITiddlerParseTreeNode
    | ICodeBlockParseTreeNode
    | ICustomParseTreeNode
    | IMacroParseTreeNode
    | IParseTreeAttribute;

  export interface FilterParseTreeNode {
    operators: FilterOperatorParseTreeNode[];
    prefix: string;
  }
  export interface FilterOperatorParseTreeNode {
    operands: FilterOperandParseTreeNode[];
    operator: string;
    suffix: string;
    suffixes: string[][];
  }
  export interface FilterOperandParseTreeNode {
    text: string;
  }

  export interface Wiki {
    /**
     * Parse a filter string
     */
    parseFilter(filter: string): FilterParseTreeNode[];
  }
}
