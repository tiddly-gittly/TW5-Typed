import { IParseTreeNode, IUtils, Tiddler, Widget } from 'tiddlywiki';
import { Modal } from '$:/core/modules/utils/dom/modal.js';

export class ReactWidget extends Widget {
  logger: IUtils['Logger'];

  constructor(parseTreeNode: IParseTreeNode) {
    super(parseTreeNode);
    this.logger = new $tw.utils.Logger('TidGiIPCSyncAdaptor');
    const logger = new $tw.utils.Logger('TidGiIPCSyncAdaptor');
    logger.table({ a: 1, b: 2 });
    this.logger.log('getUpdatedTiddlers');
    $tw.modal.display('tiddler-title');
    new Modal($tw.wiki).display('$:/plugins/linonetwo/tw-calendar/calendar-widget/tiddlywiki-ui/popup/CreateNewTiddlerPopup');
    $tw.notifier.display('tiddler-title');
    $tw.wiki.addIndexer((_tiddler: Tiddler) => {
    }, '$:/core/tiddler');
    if ($tw.browser?.is?.mobile === true) {
      $tw.wiki.addTiddler({ title: 'aaa', text: 'bbb' });
    }
  }

  render(parent: Element, _nextSibling: Element): void {
    this.parentDomNode = parent;
    this.execute();
    this.computeAttributes();
    const containerElement = $tw.utils.domMaker('div', {});
    this.domNodes.push(containerElement);
    parent.appendChild(containerElement);
  }
}
