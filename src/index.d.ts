import { I$TW } from './tw';
import './filter-operator';

declare module 'tiddlywiki' {
  export * from './tw';
  export * from './filter-operator';
}

declare module '@tiddlygit/tiddlywiki' {
  export * from 'tiddlywiki';
}

declare global {
  var $tw: I$TW;
}
