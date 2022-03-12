declare module 'tiddlywiki' {
  export interface IParseTreeAttribute {
    start: number;
    name: string;
    type: 'string' | 'number';
    value: string;
    end: number;
  }
  export interface IWikiASTNode {
    type: string;
    children?: IParseTreeNode[];
    start?: number;
    end?: number;
    isBlock?: boolean;
    isSelfClosing?: boolean;
    attributes?: Record<string, IParseTreeAttribute>;
    orderedAttributes?: IParseTreeAttribute[];
  }
  export interface ITextParseTreeNode extends IWikiASTNode {
    type: 'text';
    text: string;
  }
  export interface ILinkParseTreeNode extends IWikiASTNode {
    type: 'link';
    text: string;
  }
  export type HTMLTags = keyof HTMLElementTagNameMap
  export interface IDomParseTreeNode extends IWikiASTNode {
    type: 'element';
    tag: HTMLTags;
  }
  export interface IMacroParamCallParseTreeNode extends IWikiASTNode {
    type: 'macro-parameter';
    value: string;
    name?: string;
  }
  export interface IMacroCallParseTreeNode extends IWikiASTNode {
    type: 'macrocall';
    name: string;
    params: IMacroParamCallParseTreeNode[];
  }
  export interface ICustomParseTreeNode extends IWikiASTNode {
    type: string;
    tag?: string;
    params: IMacroParamCallParseTreeNode[];
    text?: string;
  }
  export type IParseTreeNode = IDomParseTreeNode | IMacroParamCallParseTreeNode | IMacroCallParseTreeNode | ITextParseTreeNode | ICustomParseTreeNode;
}
