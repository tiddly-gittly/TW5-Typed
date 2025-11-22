import { ITiddlyWiki } from 'tiddlywiki';

export * from 'tiddlywiki';

declare module 'tiddlywiki' {
  export type TW5InitFunction = (baseObject?: Record<string, unknown>) => ITiddlyWiki;
  export const TiddlyWiki: TW5InitFunction;
}

declare global {
  export const $tw: ITiddlyWiki;
}
