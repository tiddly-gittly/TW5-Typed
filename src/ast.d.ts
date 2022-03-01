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
    children: IParseTreeNode[];
    start: number;
    end: number;
    isBlock?: boolean;
    isSelfClosing?: boolean;
    attributes?: Record<string, IParseTreeAttribute>;
    orderedAttributes?: IParseTreeAttribute[];
  }
  export interface IDomParseTreeNode extends IWikiASTNode {
    type: 'element';
    tag: string;
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
  }
  export type IParseTreeNode = IDomParseTreeNode | IMacroParamCallParseTreeNode | IMacroCallParseTreeNode | ICustomParseTreeNode;
}
