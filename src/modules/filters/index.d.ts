declare module 'tiddlywiki' {
  /**
   * # Overview

Filter operators are modules (tiddlers of type `application/javascript`) with their `module-type` field set to `filteroperator`, exporting one or more functions implementing a filter.

Each function will be called with three arguments:

*   A [tiddler iterator](#Tiddler%20Iterators) representing the results of the previous filter step (or all tiddlers, if this filter appears first in an expression), conventionally named `source`.
*   An object, conventionally called `operator`, representing the arguments for this filter step, with the following keys:

    *   *operator*: the name of the filter operator specified in the [WikiText](#WikiText);
    *   *operand*: the operand for the filter step (as a string; if the filter specified it in angle brackets or braces, the text reference or variable name will have already been resolved);
    *   *prefix*: (optional) a string containing a single exclamation mark if the filter operator is to be negated;
    *   *suffix*: (optional) a string containing an additional filter argument (typically a tiddler field name) following the filter name (separated by a colon in the filter syntax);
    *   *regexp*: (optional, deprecated) used instead of *operand* if the filter operand is a regexp.
*   An object, conventionally called `options`, with the following keys:

    *   *wiki*: The `$tw.Wiki` object;
    *   *widget*: (optional) a widget node.

The function should return either a new [tiddler iterator](#Tiddler%20Iterators), or else an array of tiddler titles (as strings). The underlying filter mechanism will convert back and forth between iterators and arrays as needed.

# References

There are several filter operators built into the core which can serve as a jumping off point for your own filter operators:

[https://github.com/Jermolene/TiddlyWiki5/tree/master/core/modules/filters](https://github.com/Jermolene/TiddlyWiki5/tree/master/core/modules/filters)

# Example

Suppose we want to make a filter operator that returns every other tiddler from the input list. A typical invocation might look like `[tags[interesting]everyother[]]`.

We make a new tiddler, set its `type` and `module-type` appropriately, and begin writing the code:

```js
(function(){
  "use strict";
  exports.everyother = function(source, operator, options) {
      // TODO
  }
})();
```

For the example filter syntax, our function will be called with

*   source: an iterator over all the tiddlers tagged as `interesting`
*   operator: an object `{operator: "everyother", operand: ""}`
*   options: an object with the current Wiki object and a widget object, neither of which we need

As is usually the case, we don't care about `operator.operator` here (since that information has already been used to look up our function); we also don't care about `operator.operand`, since there is no meaningful operand for this operation.

We could implement the operator by iterating over the input tiddlers and explicitly building a result array of titles:

```js
(function(){
  "use strict";
  exports.everyother = function(source, operator, options) {
      var result = [];
      var include = true;
      source(function(tiddler, title) {
          if (include) { result.push(title); }
          include = !include;
      });
      return result;
  }
})();
```

That is, we supply a callback to `source` that negates `include` each time through (in order to grab every other result) and pushes the `title` of every other tiddler onto the result.

Alternatively, we can return our own iterator, by returning a function that accepts a similar callback and only calls it on every other tiddler:

```js
(function(){
  "use strict";
  exports.everyother = function(source, operator, options) {
      return function(callback) {
          var include = true;
          source(function(tiddler, title) {
              if (include) { callback(tiddler, title); }
              include = !include;
          });
      };
  }
})();
```

Either way, we could interpret the `!` flag on the filter, if present, to mean that we want the *other* half of the tiddlers, by using it to set the initial value of `include`: `var include = operator.prefix !== "!";`

# Filter Behaviour

As with [JavaScript Macros](#JavaScript%20Macros), filter operators should not make modifications to tiddlers, but only return a list of tiddlers or a tiddler iterator.

   */
  export type IFilterOperator = (
    source: (iter: SourceIterator) => void,
    operator: IFilterOperatorParameterOperator,
  ) => string[] | ((iter: SourceIterator) => void);

  /**
   * A [tiddler iterator](#Tiddler%20Iterators) representing the results of the previous filter step (or all tiddlers, if this filter appears first in an expression), conventionally named `source`.
   *
   * For Example, with an iterator over all the tiddlers tagged as `interesting`, use it like this:
   *
   * ```js
   * var result = [];
      var include = true;
      source(function(tiddler, title) {
          if (include) { result.push(title); }
          include = !include;
      });
    ```

    Construct the iterator using $tw.wiki.makeTiddlerIterator
   */
  export type SourceIterator = (tiddler: Tiddler | undefined, title: string) => void;
  export interface ISearchOptions {
    /** If true, forces all but regexp searches to be anchored to the start of text */
    anchored?: boolean;
    /** If true forces a case sensitive search */
    caseSensitive?: boolean;
    /** An array of tiddler titles to exclude from the search */
    exclude?: string[];
    /** If true, the field options are inverted to specify the fields that are not to be searched */
    excludeField?: boolean;
    /** If specified, restricts the search to the specified field, or an array of field names */
    field?: string | string[];
    /** If true returns tiddlers that do not contain the specified string */
    invert?: boolean;
    /** searches for literal string */
    literal?: boolean;
    /** an iterator function for the source tiddlers, called source(iterator), where iterator is called as iterator(tiddler,title) */
    source?: (iter: SourceIterator) => void;
    /** same as literal except runs of whitespace are treated as a single space */
    whitespace?: boolean;
    /** (default) treats search string as a list of tokens, and matches if all tokens are found, regardless of adjacency or ordering */
    words?: boolean;
  }

  export interface IFilterOperatorParameterOperator {
    /** the operand for the filter step (as a string; if the filter specified it in angle brackets or braces, the text reference or letiable name will have already been resolved); */
    operand: string;
    /** the name of the filter operator specified in the WikiText; */
    operator: string;
    /** (optional) a string containing a single exclamation mark if the filter operator is to be negated; */
    prefix?: string;
    /** (optional, deprecated) used instead of `operand` if the filter operand is a regexp. */
    regexp?: string;
    /** (optional) a string containing an additional filter argument (typically a tiddler field name) following the filter name (separated by a colon in the filter syntax); */
    suffix?: string;
    /** multiple suffix
     * for example, in `search:<field list>:<flag list>[<operand>]`, you will get `<field list>` as suffixes[0], and `<flag list>` as suffixes[1]
     */
    suffixes?: string[][];
  }
}
