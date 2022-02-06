import { I$TW } from './tw';
export * from './tw';
export * from './filter-operator';

declare module 'tiddlywiki' {}

declare module '@tiddlygit/tiddlywiki' {}

declare global {
  var $tw: I$TW;
}
