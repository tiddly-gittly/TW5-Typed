import { IParseTreeNode, Tiddler, Widget } from 'tiddlywiki';

export class ReactWidget extends Widget {
  constructor(parseTreeNode: IParseTreeNode, options?: unknown) {
    super(parseTreeNode, options);
    $tw.wiki.addIndexer(function (tiddler: Tiddler) {}, '$:/core/tiddler');
    if ($tw.browser?.is?.mobile === true) {
      $tw.wiki.addTiddler({ title: 'aaa', text: 'bbb' });
    }
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
