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
    addToStory(title: string, fromTitle?: string): void;
    /**
      Add a new record to the top of the history stack
      title: a title string or an array of title strings
      fromPageRect: page coordinates of the origin of the navigation
    */
    addToHistory(title: string, fromPageRect?: DOMRect): void;
    handleNavigateEvent(event: IWidgetEvent): void;
    handleCloseTiddlerEvent(event: IWidgetEvent): void;
    handleCloseAllTiddlersEvent(event: IWidgetEvent): void;
    handleCloseOtherTiddlersEvent(event: IWidgetEvent): void;
    handleEditTiddlerEvent(event: IWidgetEvent): void;
    handleDeleteTiddlerEvent(event: IWidgetEvent): void;
    makeDraftTiddler(targetTitle): void;
    generateDraftTitle(title): void;
    handleSaveTiddlerEvent(event: IWidgetEvent): void;
    handleCancelTiddlerEvent(event: IWidgetEvent): void;
    /**
     * Create a new draft tiddler
     * event.param can either be the title of a template tiddler, or a hashmap of fields.
     * The title of the newly created tiddler follows these rules:
     * * If a hashmap was used and a title field was specified, use that title
     * * If a hashmap was used without a title field, use a default title, if necessary making it unique with a      *numeric suffix
     * * If a template tiddler was used, use the title of the template, if necessary making it unique with a      *numeric suffix
     * If a draft of the target tiddler already exists then it is reused
     */
    handleNewTiddlerEvent(event: IWidgetEvent): void;
    /**
     * Import JSON tiddlers into a pending import tiddler
     */
    handleImportTiddlersEvent(event: IWidgetEvent): void;
    handlePerformImportEvent(event: IWidgetEvent): void;
    handleFoldTiddlerEvent(event: IWidgetEvent): void;
    handleFoldOtherTiddlersEvent(event: IWidgetEvent): void;
    handleFoldAllTiddlersEvent(event: IWidgetEvent): void;
    handleUnfoldAllTiddlersEvent(event: IWidgetEvent): void;
  }
}
declare module '$:/core/modules/widgets/navigator.js' {
}

export { NavigatorWidget as navigator } from 'tiddlywiki';
