/// <reference path="./boot/config.d.ts" />
/// <reference path="./boot/index.d.ts" />
/// <reference path="./core.d.ts" />
/// <reference path="./hooks.d.ts" />
/// <reference path="./tiddler/index.d.ts" />
/// <reference path="./utils/Crypto.d.ts" />
/// <reference path="./utils/PasswordPrompt.d.ts" />
/// <reference path="./utils/index.d.ts" />
/// <reference path="./modules/wiki.d.ts" />
/// <reference path="./modules/index.d.ts" />
/// <reference path="./modules/filters/index.d.ts" />
/// <reference path="./modules/indexers/index.d.ts" />
/// <reference path="./modules/keyboard.d.ts" />
/// <reference path="./modules/parsers/index.d.ts" />
/// <reference path="./modules/server/index.d.ts" />
/// <reference path="./modules/story.d.ts" />
/// <reference path="./modules/utils/filesystem.d.ts" />
/// <reference path="./modules/utils/logger.d.ts" />
/// <reference path="./modules/syncer/syncadaptor.d.ts" />
/// <reference path="./modules/syncer/syncer.d.ts" />
/// <reference path="./modules/utils/dom/index.d.ts" />
/// <reference path="./modules/utils/linked-list.d.ts" />
/// <reference path="./modules/widgets/index.d.ts" />
/// <reference path="./plugins/index.d.ts" />

// Export something to make this a module (required for global declarations to work)
export {};

declare module 'tiddlywiki' {
  export type TW5InitFunction = (baseObject?: Record<string, unknown>) => ITiddlyWiki;
  export const TiddlyWiki: TW5InitFunction;
}

declare global {
  const $tw: import('tiddlywiki').ITiddlyWiki;
}
