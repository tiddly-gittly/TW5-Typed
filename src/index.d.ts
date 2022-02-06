import { I$TW } from './tw';
import './filter-operator';

declare module 'tiddlywiki' {
  export * from './tw';
  export * from './filter-operator';
}

// this only work when there is no import statement...
// declare module '@tiddlygit/tiddlywiki' {
//   export * from 'tiddlywiki';
// }

declare global {
  var $tw: I$TW;
}
