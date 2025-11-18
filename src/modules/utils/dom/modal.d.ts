/// <reference path="../../widgets/index.d.ts" />
/// <reference path="../../../wiki/index.d.ts" />

declare module 'tiddlywiki' {
  export class Modal {
    constructor(wiki: Wiki);

    adjustPageClass: () => void;
    /**
     * @param title
     * @param options
     * variables: optional hashmap of variables to wrap around the widget
     * downloadLink: normally is used for "Right-click to save changes"
     */
    display: (
      title: string,
      options?: {
        downloadLink?: string;
        event?: IWidgetEvent;
        variables?: unknown;
      },
    ) => void;
  }
}

declare module '$:/core/modules/utils/dom/modal.js' {
  export { Modal } from 'tiddlywiki';
}
