/// <reference path="../../widgets/index.d.ts" />

declare module 'tiddlywiki' {
  export interface IModal {
    adjustPageClass: () => void;
    /**
     *
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

    // new (wiki: Wiki): ModalWidget;
  }
}
