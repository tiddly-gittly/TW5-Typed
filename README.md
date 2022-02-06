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
    "types": ["node", "tw5-typed"] /* Type declaration files to be included in compilation. */,
  }
}
```

Then you will have global types like `$tw` automatically. You can import the rest of the types using `import type` statement:

```typescript

```
