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
import type { ISearchOptions, SourceIterator, IFilterOperatorParamOperator } from 'tw5-typed';
```

## Development

You can add new `*.d.ts` file to contain your types:

1. use `declare module 'tiddlywiki' { }` to wrap all your types.
1. don't forget to `export` all your types.
1. to add type for global variable, add `global { }` inside that `declare module 'tiddlywiki' { }`, like `global { var $tw: I$TW; }`

And add `import './xxx';` in the `index.d.ts` file.
