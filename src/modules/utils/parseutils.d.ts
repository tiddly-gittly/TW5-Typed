/**
 * Utility functions concerned with parsing text into tokens.
 * Most functions have the following pattern:
 * - The parameters are:
 *   - `source`: the source string being parsed
 *   - `pos`: the current parse position within the string
 *   - Any further parameters are used to identify the token that is being parsed
 * - The return value is:
 *   - null if the token was not found at the specified position
 *   - an object representing the token with the following standard fields:
 *     - `type`: string indicating the type of the token
 *     - `start`: start position of the token in the source string
 *     - `end`: end position of the token in the source string
 *     - Any further fields required to describe the token
 * The exception is `skipWhiteSpace`, which just returns the position after the whitespace.
 */
declare module '$:/core/modules/utils/parseutils.js' {
  /**
   * Look for a whitespace token. Returns null if not found, otherwise returns an object.
   */
  export function parseWhiteSpace(source: string, pos: number): { end: number; start: number; type: 'whitespace' } | null;

  /**
   * Convenience wrapper for parseWhiteSpace. Returns the position after the whitespace.
   */
  export function skipWhiteSpace(source: string, pos: number): number;

  /**
   * Look for a given string token. Returns null if not found, otherwise returns an object.
   */
  export function parseTokenString(source: string, pos: number, token: string): { end: number; start: number; type: 'token'; value: string } | null;

  /**
   * Look for a token matching a regex. Returns null if not found, otherwise returns an object.
   */
  export function parseTokenRegExp(source: string, pos: number, reToken: RegExp): { end: number; match: RegExpExecArray; start: number; type: 'regexp' } | null;

  /**
   * Look for a string literal. Returns null if not found, otherwise returns an object.
   */
  export function parseStringLiteral(source: string, pos: number): { end: number; start: number; type: 'string'; value: string } | null;

  /**
   * Returns an array of `{name:}` with an optional "default" property. Options include `requireParenthesis`.
   */
  export function parseParameterDefinition(parameterString: string, options?: { requireParenthesis?: boolean }): Array<{ default?: string; name: string }>;

  /**
   * Process parameters for macro invocation.
   */
  export function parseMacroParameters(node: IParseTreeNode, source: string, pos: number): unknown[];

  /**
   * Look for a macro invocation parameter. Returns null if not found.
   */
  export function parseMacroParameter(source: string, pos: number): { end: number; name?: string; start: number; type: 'macro-parameter'; value: string } | null;

  /**
   * Look for a macro invocation. Returns null if not found.
   */
  export function parseMacroInvocation(source: string, pos: number): { end: number; name: string; params: unknown[]; start: number; type: 'macrocall' } | null;

  /**
   * Look for a macro invocation as transclusion. Returns null if not found.
   */
  export function parseMacroInvocationAsTransclusion(source: string, pos: number): { attributes: Record<string, unknown>; end: number; start: number; type: 'transclude' } | null;

  export interface FilterVariableParseTreeNode {
    name: string;
    params: FilterVariableParameterParseTreeNode[];
  }
  export interface FilterVariableParameterParseTreeNode {
    end: number;
    start: number;
    type: string;
    value: string;
  }
  /**
   * Parse filter variable parameters.
   */
  export function parseFilterVariable(source: string): FilterVariableParseTreeNode;

  /**
   * Look for an HTML attribute definition. Returns null if not found, otherwise returns an object.
   */
  export function parseAttribute(
    source: string,
    pos: number,
  ): { end: number; filter?: string; name: string; start: number; textReference?: string; type: 'attribute'; value?: string } | null;
}
