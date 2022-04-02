/// <reference path="tw.d.ts" />
/// <reference path="server.d.ts" />

import * as TW from 'tiddlywiki';

export * from 'tiddlywiki';
declare global {
  const $tw: TW.ITiddlyWiki;
  // const Buffer: ?Buffer;
  // const clearInterval: typeof global.clearInterval;
  // const clearTimeout: typeof global.clearTimeout;
  // const console: Console;
  // const exports: TW.ITWModuleExports;
  // const module: { exports: TW.ITWModuleExports; readonly id: string };
  // const process: ?NodeJS.Process;
  // const require: ITWRequire;
  // const setInterval: typeof global.setInterval;
  // const setTimeout: typeof global.setTimeout;
}
