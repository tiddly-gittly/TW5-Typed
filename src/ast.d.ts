declare module 'tiddlywiki' {
  export interface IParseTreeAttribute {
    end?: number;
    name?: string;
    start?: number;
    type: 'string' | 'number' | 'bigint' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'function';
    value: string;
  }

  export interface IWikiASTNode {
    attributes?: Record<string, IParseTreeAttribute>;
    children?: IParseTreeNode[];
    end?: number;
    isBlock?: boolean;
    isSelfClosing?: boolean;
    orderedAttributes?: IParseTreeAttribute[];
    start?: number;
    type: string;
  }
  export interface ITextParseTreeNode extends IWikiASTNode {
    text: string;
    type: 'text';
  }
  export interface ILinkParseTreeNode extends IWikiASTNode {
    text?: string;
    type: 'link';
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
  export type HTMLTags = keyof HTMLElementTagNameMap | 'strike';

  export interface IDomParseTreeNode extends IWikiASTNode {
    tag: HTMLTags;
    type: 'element';
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
    name: string;
    params: IMacroParameterCallParseTreeNode[];
    type: 'macrocall';
  }
  export interface ICustomParseTreeNode extends IWikiASTNode {
    params: IMacroParameterCallParseTreeNode[];
    tag?: string;
    text?: string;
    type: string;
  }
  export type IParseTreeNode =
    | IDomParseTreeNode
    | IMacroParameterCallParseTreeNode
    | IMacroCallParseTreeNode
    | ITextParseTreeNode
    | IImageParseTreeNode
    | ITranscludeParseTreeNode
    | ITiddlerParseTreeNode
    | ICodeBlockParseTreeNode
    | ILinkParseTreeNode
    | ICustomParseTreeNode;
}
