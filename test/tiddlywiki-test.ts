import { Modal } from '$:/core/modules/utils/dom/modal.js';
import { Logger } from '$:/core/modules/utils/logger.js';
import { widget as Widget } from '$:/core/modules/widgets/widget.js';
import { IParseTreeNode, Tiddler } from 'tiddlywiki';

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
    $tw.utils.parseFilterVariable('now DDMM UTC');
    $tw.wiki.parseFilter('[search: one, two ,three :[operand]]');
    
    // Test newly added methods
    const list = $tw.wiki.getTiddlerList('MyTiddler', 'list');
    const textRef = $tw.wiki.getTextReference('MyTiddler!!field', 'default');
    $tw.wiki.setTextReference('MyTiddler!!field', 'value');
    const count = $tw.wiki.countTiddlers('$:/tags/Exclude');
    
    $tw.wiki.forEachTiddler({ includeSystem: false }, (title, tiddler) => {
      console.log(title, tiddler);
    });
    
    const searchResults = $tw.wiki.search('search term', {
      caseSensitive: false,
      field: 'text',
    });
    
    const links = $tw.wiki.extractLinks([]);
    const transcludes = $tw.wiki.getTiddlerTranscludes('MyTiddler');
    const backlinks = $tw.wiki.getTiddlerBacklinks('MyTiddler');
    
    const subTiddler = $tw.wiki.getSubTiddler('$:/plugins/MyPlugin', 'readme');
    const orphans = $tw.wiki.getOrphanTitles();
    const missing = $tw.wiki.getMissingTitles();
    const tagMap = $tw.wiki.getTagMap();
    const draft = $tw.wiki.findDraft('MyTiddler');
    const slug = $tw.wiki.slugify('My Title');
    
    $tw.wiki.sortTiddlers(['a', 'b', 'c'], 'title', false, false);
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

