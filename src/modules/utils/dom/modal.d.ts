/// <reference path="../../widgets/index.d.ts" />

declare module '$:/core/modules/utils/dom/modal.js' {
  export class Modal {
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

    constructor(wiki: Wiki);
    new(wiki: Wiki): Modal;
  }
}
