declare module 'tiddlywiki' {
  export class Story {
    wiki: Wiki;
    storyTitle: string;
    historyTitle: string;

    constructor(options: {
      wiki?: Wiki;
      storyTitle?: string;
      historyTitle?: string;
    });

    getStoryList(): string[];

    navigateTiddler(
      navigateTo: string,
      navigateFromTitle?: string,
      navigateFromClientRect?: DOMRect,
    );

    addToStory(
      navigateTo: string,
      navigateFromTitle?: string,
      options?: {
        openLinkFromInsideRiver?: 'top' | 'bottom' | 'above' | 'below';
      },
    );

    addToHistory(
      navigateTo: string | string[],
      navigateFromClientRect?: DOMRect,
    );

    saveStoryList(storyList: string[] | string);

    storyCloseTiddler(targetTitle: string);

    storyCloseAllTiddlers();

    storyCloseOtherTiddlers(targetTitle: string);

    storyEditTiddler(targetTitle: string);

    storyDeleteTiddler(targetTitle: string);

    storySaveTiddler(targetTitle: string);

    storyCancelTiddler(targetTitle: string);

    storyNewTiddler(targetTitle: string);
  }
}

declare module '$:/core/modules/story.js' {
  export { Story } from 'tiddlywiki';
}
