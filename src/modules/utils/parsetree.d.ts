/**
 * A utility module for working with parse trees.
 * @description 用于处理解析树的实用程序模块。
 */
declare module '$:/core/modules/utils/parsetree.js' {
  /**
   * Add attribute to parse tree node.
   * @param node - The parse tree node.
   * @param name - The name of the attribute.
   * @param value - The value of the attribute.
   * @description 向解析树节点添加属性。
   */
  export function addAttributeToParseTreeNode(
    node: any,
    name: string | object,
    value?: any,
  ): void;

  /**
   * Get ordered attributes from parse tree node.
   * @param node - The parse tree node.
   * @returns The ordered attributes.
   * @description 从解析树节点获取有序属性。
   */
  export function getOrderedAttributesFromParseTreeNode(node: any): any[];

  /**
   * Get attribute value from parse tree node.
   * @param node - The parse tree node.
   * @param name - The name of the attribute.
   * @param defaultValue - The default value of the attribute.
   * @returns The value of the attribute.
   * @description 从解析树节点获取属性值。
   */
  export function getAttributeValueFromParseTreeNode(
    node: any,
    name: string,
    defaultValue?: any,
  ): any;

  /**
   * Add class to parse tree node.
   * @param node - The parse tree node.
   * @param classString - The class string to add.
   * @description 向解析树节点添加类。
   */
  export function addClassToParseTreeNode(node: any, classString: string): void;

  /**
   * Add style to parse tree node.
   * @param node - The parse tree node.
   * @param name - The name of the style.
   * @param value - The value of the style.
   * @description 向解析树节点添加样式。
   */
  export function addStyleToParseTreeNode(
    node: any,
    name: string,
    value: string,
  ): void;

  /**
   * Find parse tree node.
   * @param nodeArray - The array of parse tree nodes.
   * @param search - The search object.
   * @returns The parse tree node.
   * @description 查找解析树节点。
   */
  export function findParseTreeNode(
    nodeArray: any[],
    search: { type: string; tag: string },
  ): any;

  /**
   * Get the text of a parse tree node or array of nodes.
   * @param tree - The parse tree node or array of nodes.
   * @returns The text of the parse tree node or array of nodes.
   * @description 获取解析树节点或节点数组的文本。
   */
  export function getParseTreeText(tree: any): string;
}
