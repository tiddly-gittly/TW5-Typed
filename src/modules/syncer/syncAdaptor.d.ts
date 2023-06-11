declare module 'tiddlywiki' {
  export abstract class SyncAdaptor {
    name: string;
    supportsLazyLoading: boolean;
    isReady(): boolean;
    getTiddlerInfo(title: string): IBootFilesIndexItem;
    getTiddlerFileInfo(
      title: string,
      callback: (error: null, fileInfo: IFileInfo) => void,
    ): void;
    wiki: Wiki;
  }
}
