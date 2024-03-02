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

  export interface IRoute {
    handler: ServerEndpointHandler;
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEAD';
    path: RegExp;
  }

  export interface IServerOptions {
    routes: IRoute[];
    variables?: Record<string, string>;
    wiki: Wiki;
  }

  /**
    A simple HTTP server with regexp-based routes

    options: variables - optional hashmap of variables to set (a misnomer - they are really constant parameters)
        routes - optional array of routes to use
        wiki - reference to wiki object
  */
  export class Server {
    /**
     * @example
     * ```json
     * {
          port: "8080",
          host: "127.0.0.1",
          "required-plugins": "$:/plugins/tiddlywiki/filesystem,$:/plugins/tiddlywiki/tiddlyweb",
          "root-tiddler": "$:/core/save/all",
          "root-render-type": "text/plain",
          "root-serve-type": "text/html",
          "tiddler-render-type": "text/html",
          "tiddler-render-template": "$:/core/templates/server/static.tiddler.html",
          "system-tiddler-render-type": "text/plain",
          "system-tiddler-render-template": "$:/core/templates/wikified-tiddler",
          "debug-level": "none",
          "gzip": "no",
          "use-browser-cache": "no"
        }
        ```
     */
    defaultVariables: {
      'debug-level': string;
      gzip: string;
      host: string;
      port: string;
      'required-plugins': string;
      'root-render-type': string;
      'root-serve-type': string;
      'root-tiddler': string;
      'system-tiddler-render-template': string;
      'system-tiddler-render-type': string;
      'tiddler-render-template': string;
      'tiddler-render-type': string;
      'use-browser-cache': string;
    };

    requestHandler: ServerEndpointHandler;

    variables: Record<string, any>;

    routes: IRoute[];

    constructor(options: IServerOptions);
    addRoute(route: IRoute): void;
    get(variableName: string): any;
    /**
      Listen for requests
      port: optional port number (falls back to value of "port" variable)
      host: optional host address (falls back to value of "host" variable)
      prefix: optional prefix (falls back to value of "path-prefix" variable)
      */
    listen(port?: string, host?: string, prefix?: string): void;

    on(eventName: 'error', callback: (error: Error) => void): void;
    on(eventName: 'listening', callback: () => void): void;
    on(
      eventName: string,
      callback: (...arguments_: unknown[]) => unknown,
    ): void;

    /**
      Check whether a given user is authorized for the specified authorizationType ("readers" or "writers"). Pass null or undefined as the username to check for anonymous access
    */
    isAuthorized(
      authorizationType: 'readers' | 'writers',
      username?: string | undefined,
    ): boolean;
    close(): void;
  }

  export interface ServerEndpointContext {
    authenticatedUsername: string | undefined;
    data: string;
    /**
     * With `exports.path = /^\/recipes\/default\/tiddlers\/(.+)$/;` you can use:
     *
     * `title = $tw.utils.decodeURIComponentSafe(state.params[0])`
     */
    params: string[];
    server: Server;
    wiki: Wiki;
  }
  /**
   * @link https://talk.tiddlywiki.org/t/what-is-the-state-in-server-route-handler/2877
   */
  export type ServerEndpointHandler<T = Record<string, unknown>> = (
    request: Http.ClientRequest & Http.InformationEvent,
    response: Http.ServerResponse,
    context: ServerEndpointContext & T,
  ) => void | Promise<void>;
}
