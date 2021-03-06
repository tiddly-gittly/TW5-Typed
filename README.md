# TW5-Typed

TypeScript type definitions for TiddlyWiki5.

## Usage

First, install it as dev-dependency:

```sh
npm i -D tw5-typed
```

Add `tw5-typed` to your `tsconfig.json`'s `compilerOptions`

```json
{
  "compilerOptions": {
    "types": ["node", "tw5-typed"] /* Type declaration files to be included in compilation. */
  }
}
```

Then you will have global types like `$tw` automatically. You can import the rest of the types using `import type` statement:

```typescript
import type { ISearchOptions, SourceIterator, IFilterOperatorParamOperator } from 'tiddlywiki';
```

### Alias

Sometimes you may want to use a modified version of tw, you can re-export types like this in your `src/type.d.ts`:

```typescript
declare module '@tiddlygit/tiddlywiki' {
  export * from 'tiddlywiki';
}
```

## Development

Firstly, Install eslint using npm:

```sh
npm i
```

You can add new `*.d.ts` file to contain your types:

1. use `declare module 'tiddlywiki' { }` to wrap all your types.
1. don't forget to `export` all your types.
1. to add type for global variable, add `global { }` inside that `declare module 'tiddlywiki' { }`, like `global { var $tw: I$TW; }`
1. add type import like `/// <reference path="ast.d.ts" />` in the `tw.d.ts`

### Importing type from other files

- add type import like `/// <reference path="parser.d.ts" />`
- using normal import, like `import { parse } from './parser';` will not work

### Test in your node_modules

To rapid prototype the type, just right click a type to open `.d.ts` file in the `node_modules`, and try create new file there, and copy to this repo after a success.
