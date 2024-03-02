import { Modal } from '$:/core/modules/utils/dom/modal.js';
import { Logger } from '$:/core/modules/utils/logger.js';
import { IParseTreeNode, IUtils, Tiddler, Widget } from 'tiddlywiki';

export class ReactWidget extends Widget {
  logger: Logger;

  constructor(parseTreeNode: IParseTreeNode) {
    super(parseTreeNode);
    const logger = new $tw.utils.Logger('TidGiIPCSyncAdaptor');
    logger.table({ a: 1, b: 2 });
    logger.log('getUpdatedTiddlers');
    this.logger = new $tw.utils.Logger('TidGiIPCSyncAdaptor');
    this.logger.table({ a: 1, b: 2 });
    this.logger.log('getUpdatedTiddlers');
    $tw.modal.display('tiddler-title');
    new Modal($tw.wiki).display('$:/plugins/linonetwo/tw-calendar/calendar-widget/tiddlywiki-ui/popup/CreateNewTiddlerPopup');
    $tw.notifier.display('tiddler-title');
    $tw.wiki.addIndexer((_tiddler: Tiddler) => {}, '$:/core/tiddler');
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
    parent.append(containerElement);
  }
}
