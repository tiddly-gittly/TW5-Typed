declare module 'tiddlywiki' {
  export class NavigatorWidget extends Widget {
    getStoryList(): string[] | null;
    saveStoryList(storyList: string[]): void;
    removeTitleFromStory(storyList: string[], title: string): void;
    replaceFirstTitleInStory(
      storyList: string[],
      oldTitle: string,
      newTitle: string,
    ): void;
    addToStory(title: string, fromTitle: string): void;
    addToHistory(title: string, fromPageRect): void;
    handleNavigateEvent(event: Event): void;
    handleCloseTiddlerEvent(event: Event): void;
    handleCloseAllTiddlersEvent(event: Event): void;
    handleCloseOtherTiddlersEvent(event: Event): void;
    handleEditTiddlerEvent(event: Event): void;
    handleDeleteTiddlerEvent(event: Event): void;
    makeDraftTiddler(targetTitle): void;
    generateDraftTitle(title): void;
    handleSaveTiddlerEvent(event: Event): void;
    handleCancelTiddlerEvent(event: Event): void;
    handleNewTiddlerEvent(event: Event): void;
    handleImportTiddlersEvent(event: Event): void;
    handlePerformImportEvent(event: Event): void;
    handleFoldTiddlerEvent(event: Event): void;
    handleFoldOtherTiddlersEvent(event: Event): void;
    handleFoldAllTiddlersEvent(event: Event): void;
    handleUnfoldAllTiddlersEvent(event: Event): void;
  }
}
declare module '$:/core/modules/widgets/widget.js' {
  import { NavigatorWidget } from 'tiddlywiki';
  export { NavigatorWidget as navigator };
}
