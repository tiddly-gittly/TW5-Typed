/// <reference path="Wiki.d.ts" />

import type Http from 'http';

declare module 'tiddlywiki' {
  export interface IServerStatus {
    anonymous: boolean;
    read_only: boolean;
    space: {
      recipe: string;
    };
    tiddlywiki_version: string;
    username: string;
  }

  export interface ServerEndpointContext {
    data: string;
    wiki: Wiki;
  }
  /**
   * @link https://talk.tiddlywiki.org/t/what-is-the-state-in-server-route-handler/2877
   */
  export type ServerEndpointHandler<T = Record<string, any>> = (
    request: Http.ClientRequest,
    response: Http.ServerResponse,
    context: ServerEndpointContext & T,
  ) => void;
}
