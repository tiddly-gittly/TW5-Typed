declare module 'tiddlywiki' {
  export interface IServerStatus {
    username: string;
    anonymous: boolean;
    read_only: boolean;
    space: {
      recipe: string;
    };
    tiddlywiki_version: string;
  }
}
