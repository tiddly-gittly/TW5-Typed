# TW5-Typed

TypeScript type definitions for TiddlyWiki5.

[Doc Site - tiddly-gittly.github.io/TW5-Typed](https://tiddly-gittly.github.io/TW5-Typed/)

## Usage

First, install it as dev-dependency:

```sh
pnpm add -D tw5-typed
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

If your project already has an ambient declaration file such as `src/global.d.ts` or `src/ambient.d.ts`, add this line there as well:

```typescript
/// <reference types="tw5-typed" />
```

That extra reference helps VS Code pick the package up reliably in template-based projects.

## Troubleshooting

If VS Code shows `Could not find a declaration file for module 'tiddlywiki'`, the usual cause is configuration, not missing types.

Use this:

```json
{
  "compilerOptions": {
    "types": ["node", "tw5-typed"]
  }
}
```

Do not use this:

```json
{
  "compilerOptions": {
    "typeRoots": ["node_modules/@types", "node_modules/tw5-typed"]
  }
}
```

`tw5-typed` is a normal package with its own `types` entrypoint. Pointing `typeRoots` at the package directory can prevent TypeScript or VS Code from loading the `declare module 'tiddlywiki'` entry correctly.

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

Could import from `"tiddlywiki"` inside `declare module` like

```ts
declare module '$:/core/modules/utils/parsetree.js' {
  import { IParseTreeNode } from 'tiddlywiki';
```

Import outside of `declare module` will cause error.

### Test in your node_modules

To rapid prototype the type, just right click a type to open `.d.ts` file in the `node_modules`, and try create new file there, and copy to this repo after a success.

### Before publish

Make sure doc build and test are passed.

1. Doc: `pnpm run docs:generate && pnpm run docs:dev`, see `.github\workflows\deploy-docs-to-github-pages.yml`
1. Tests: `pnpm run check`, see `.github\workflows\test.yml`
