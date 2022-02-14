/* eslint-disable @typescript-eslint/no-useless-constructor */
import { Widget as IWidget } from 'tiddlywiki'

const Widget = {} as unknown as IWidget;
export class ReactWidget extends Widget {
  constructor(parseTreeNode: any, options: any) {
    super(parseTreeNode, options);
  }

  render(parent: Node, nextSibling: Node): void {
    this.parentDomNode = parent;
    this.execute();
    this.computeAttributes();
    const containerElement = document.createElement('div');
    this.domNodes.push(containerElement);
    parent.appendChild(containerElement);
  }
}