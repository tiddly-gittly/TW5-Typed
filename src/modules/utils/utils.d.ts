declare module '$:/core/modules/utils/utils.js' {
  type TerminalColourName =
    | 'black'
    | 'red'
    | 'green'
    | 'brown/orange'
    | 'blue'
    | 'purple'
    | 'cyan'
    | 'light gray';

  export const terminalColourLookup: Record<
    TerminalColourName,
    string
  >;

  /**
   * Displays a message, in color if we're on a terminal.
   * @param text - The text to display.
   * @param colour - The color to display the text in.
   * @description 在终端上显示消息，如果在终端上则以颜色显示。
   */
  export function log(text: string, colour?: string): void;

  /**
   * Returns the terminal color code for a given color.
   * @param colour - The color to get the code for.
   * @returns The terminal color code for the given color.
   * @description 返回给定颜色的终端颜色代码。
   */
  export function terminalColour(colour?: string): string;

  /**
   * Display a warning, in colour if we're on a terminal.
   * @param text - The text to display.
   * @description 在终端上显示警告，如果在终端上则以颜色显示。
   */
  export function warning(text: string): void;

  /**
   * Log a table of name: value pairs.
   * @param data - The data to log.
   * @description 记录名称：值对的表格。
   */
  export function logTable(data: object): void;

  /**
   * Return the integer represented by the str (string).
   * Return the dflt (default) parameter if str is not a base-10 number.
   * @param str - The string to parse.
   * @param deflt - The default value to return if the string is not a base-10 number.
   * @returns The integer represented by the string or the default value if the string is not a base-10 number.
   * @description 返回由 str（字符串）表示的整数。如果 str 不是十进制数字，则返回 dflt（默认）参数。
   */
  export function getInt(string_: string, deflt: number): number;

  /**
   * Repeatedly replaces a substring within a string. Like String.prototype.replace, but without any of the default special handling of $ sequences in the replace string.
   * @param text - The text to search and replace.
   * @param search - The substring to search for.
   * @param replace - The replacement string.
   * @returns The modified string.
   * @description 反复替换字符串中的子字符串。类似于 String.prototype.replace，但不使用替换字符串中的 $ 序列的默认特殊处理。
   */
  export function replaceString(
    text: string,
    search: string | RegExp,
    replace: string,
  ): string;

  /**
   * Repeats a string.
   * @param str - The string to repeat.
   * @param count - The number of times to repeat the string.
   * @returns The repeated string.
   * @description 重复一个字符串。
   */
  export function repeat(string_: string, count: number): string;

  /**
   * Checks if a string starts with another string.
   * @param str - The string to check.
   * @param search - The string to search for.
   * @returns True if the string starts with the search string, false otherwise.
   * @description 检查字符串是否以另一个字符串开头。
   */
  export function startsWith(string_: string, search: string): boolean;

  /**
   * Checks if a string ends with another string.
   * @param str - The string to check.
   * @param search - The string to search for.
   * @returns True if the string ends with the search string, false otherwise.
   * @description 检查字符串是否以另一个字符串结尾。
   */
  export function endsWith(string_: string, search: string): boolean;

  /**
   * Trims whitespace from the start and end of a string.
   * @param str - The string to trim.
   * @returns The trimmed string.
   * @description 从字符串的开头和结尾修剪空格。
   */
  export function trim(string_: string): string;

  /**
   * Trims a prefix from a string.
   * @param str - The string to trim.
   * @param unwanted - The prefix to remove.
   * @returns The trimmed string.
   * @description 从字符串中修剪前缀。
   */
  export function trimPrefix(string_: string, unwanted: string): string;

  /**
   * Trims a suffix from a string.
   * @param str - The string to trim.
   * @param unwanted - The suffix to remove.
   * @returns The trimmed string.
   * @description 从字符串中修剪后缀。
   */
  export function trimSuffix(string_: string, unwanted: string): string;

  /**
   * Converts a string to sentence case (i.e. capitalizes the first letter).
   * @param str - The string to convert.
   * @returns The converted string.
   * @description 将字符串转换为句子格式（即将第一个字母大写）。
   */
  export function toSentenceCase(string_: string): string;

  /**
   * Converts a string to title case (i.e. capitalizes each initial letter).
   * @param str - The string to convert.
   * @returns The converted string.
   * @description 将字符串转换为标题格式（即将每个单词的第一个字母大写）。
   */
  export function toTitleCase(string_: string): string;

  /**
   * Finds the line break preceding a given position in a string.
   * @param text - The string to search in.
   * @param pos - The position to search for.
   * @returns The position immediately after that line break, or the start of the string.
   * @description 查找字符串中给定位置之前的换行符。
   */
  export function findPrecedingLineBreak(text: string, pos: number): number;

  /**
   * Finds the line break following a given position in a string.
   * @param text - The string to search in.
   * @param pos - The position to search for.
   * @returns The position of the following line break, or the end of the string.
   * @description 查找字符串中给定位置之后的换行符。
   */
  export function findFollowingLineBreak(text: string, pos: number): number;

  /**
   * Returns the number of keys in an object.
   * @param object - The object to count the keys of.
   * @returns The number of keys in the object.
   * @description 返回对象中键的数量。
   */
  export function count(object: object): number;

  /**
   * Determines whether an array item is an object property.
   * @param object - The object to check.
   * @param array - The array to check.
   * @returns True if the array item is an object property, false otherwise.
   * @description 确定数组项是否为对象属性。
   */
  export function hopArray(object: object, array: any[]): boolean;

  /**
   * Removes entries from an array.
   * @param array - The array to modify.
   * @param value - A single value or an array of values to remove.
   * @returns The modified array.
   * @description 从数组中删除条目。
   */
  export function removeArrayEntries<T>(array: T[], value: T | T[]): T[];

  /**
   * Checks whether any members of a hashmap are present in another hashmap.
   * @param dependencies - The hashmap to check for dependencies.
   * @param changes - The hashmap to check for changes.
   * @returns True if any members of the hashmap are present in another hashmap, false otherwise.
   * @description 检查哈希映射的任何成员是否存在于另一个哈希映射中。
   */
  export function checkDependencies(
    dependencies: object,
    changes: object,
  ): boolean;

  /**
   * Extends an object with one or more sources.
   * @param object - The object to extend.
   * @param src - One or more sources to extend the object with.
   * @returns The extended object.
   * @description 使用一个或多个源扩展对象。
   */
  export function extend(object: object, ...source: object[]): object;

  /**
   * Extend an object with properties from one or more sources.
   * @param object - The object to extend.
   * @param src - The source object(s) to copy properties from.
   * @returns The extended object.
   * @description 从一个或多个源中复制属性来扩展对象。
   */
  export function extend(object: any, ...source: any[]): any;

  /**
   * Deep copy an object.
   * @param object - The object to copy.
   * @returns The copied object.
   * @description 深拷贝对象。
   */
  export function deepCopy(object: any): any;

  /**
   * Extend an object with properties from one or more sources, and deep copy the extended properties.
   * @param object - The object to extend.
   * @param extendedProperties - The properties to extend and deep copy.
   * @returns The extended object.
   * @description 从一个或多个源中复制属性来扩展对象，并深拷贝扩展的属性。
   */
  export function extendDeepCopy(object: any, extendedProperties: any): any;

  /**
   * Recursively freeze an object and its properties.
   * @param object - The object to freeze.
   * @description 递归地冻结对象及其属性。
   */
  export function deepFreeze(object: any): void;

  /**
   * A slow-in, slow-out easing function.
   * @param t - The time value, between 0 and 1.
   * @returns The eased value.
   * @description 缓入缓出的缓动函数。
   */
  export function slowInSlowOut(t: number): number;

  /**
   * Format a string template with options.
   * @param template - The string template to format.
   * @param options - The options to use for formatting.
   * @returns The formatted string.
   * @description 使用选项格式化字符串模板。
   */
  export function formatTitleString(
    template: string,
    options: { base?: string; counter?: number; separator?: string },
  ): string;

  /**
   * Format a date string based on a template.
   * Derived from http://stackoverflow.com/a/15710692
   * @param date - The date object to format.
   * @param template - The template string to use for formatting.
   * @returns The formatted date string.
   */
  export function formatDateString(date: Date, template: string): string;

  /**
   * Get the AM/PM period of a date.
   * @param date - The date object to get the period from.
   * @returns The period string (either "am" or "pm").
   */
  export function getAmPm(date: Date): string;

  /**
   * Get the suffix for the day of a date.
   * @param date - The date object to get the day suffix from.
   * @returns The day suffix string.
   */
  export function getDaySuffix(date: Date): string;

  /**
   * Get the week number of a date.
   * @param date - The date object to get the week number from.
   * @returns The week number.
   */
  export function getWeek(date: Date): number;

  /**
   * Get the year for a week number of a date.
   * @param date - The date object to get the year from.
   * @returns The year for the week number.
   */
  export function getYearForWeekNo(date: Date): number;

  /**
   * Get the 12-hour format of the hour of a date.
   * @param date - The date object to get the hour from.
   * @returns The 12-hour format of the hour.
   */
  export function getHours12(date: Date): number;

  /**
   * Convert a date delta in milliseconds into a string representation of "23 seconds ago", "27 minutes ago" etc.
   * @param delta - delta in milliseconds
   * @returns An object with these members:
   * - description: string describing the delta period
   * - updatePeriod: time in millisecond until the string will be inaccurate
   * @description 将以毫秒为单位的日期差转换为“23秒前”、“27分钟前”等字符串表示形式。
   */
  export function getRelativeDate(delta: number): {
    description: string;
    updatePeriod: number;
  };

  /**
   * Convert & to "&amp;", < to "&lt;", > to "&gt;", " to "&quot;"
   * @param s - The string to encode.
   * @returns The encoded string.
   * @description 将 & 转换为 "&amp;"，< 转换为 "&lt;"，> 转换为 "&gt;"，" 转换为 "&quot;"。
   */
  export function htmlEncode(s: string): string;

  /**
   * Converts like htmlEncode, but forgets the double quote for brevity
   * @param s - The string to encode.
   * @returns The encoded string.
   * @description 类似于 htmlEncode，但为了简洁起见忽略了双引号。
   */
  export function htmlTextEncode(s: string): string;

  /**
   * Converts all HTML entities to their character equivalents.
   * @param s - The string to decode.
   * @returns The decoded string.
   * @description 将所有 HTML 实体转换为它们的字符等价物。
   */
  export function entityDecode(s: string): string;

  /**
   * Unescapes line breaks.
   * @param s - The string to unescape.
   * @returns The unescaped string.
   * @description 取消转义换行符。
   */
  export function unescapeLineBreaks(s: string): string;

  /**
   * Returns an escape sequence for given character. Uses `\x` for characters `<=` 0xFF to save space, `\u` for the rest.
   * @param ch - The character to escape.
   * @returns The escaped character.
   * @description 返回给定字符的转义序列。对于字符 `<=` 0xFF，使用 `\x` 以节省空间，对于其余字符使用 `\u`。
   */
  export function escape(ch: string): string;

  /**
   * Turns a string into a legal JavaScript string.
   * @param s - The string to stringify.
   * @param rawUnicode - Whether to escape non-ASCII characters.
   * @returns The stringified string.
   * @description 将字符串转换为合法的 JavaScript 字符串。
   */
  export function stringify(s: string, rawUnicode?: boolean): string;

  /**
   * Turns a string into a legal JSON string.
   * @param s - The string to stringify.
   * @param rawUnicode - Whether to escape non-ASCII characters.
   * @returns The stringified JSON string.
   * @description 将字符串转换为合法的 JSON 字符串。
   */
  export function jsonStringify(s: string, rawUnicode?: boolean): string;

  /**
   * Escapes the RegExp special characters with a preceding backslash.
   * @param s - The string to escape.
   * @returns The escaped string.
   * @description 使用反斜杠转义 RegExp 特殊字符。
   */
  export function escapeRegExp(s: string): string;

  /**
   * An extended version of encodeURIComponent that encodes additional characters including those that are illegal within filepaths on various platforms including Windows.
   * @param s - The string to encode.
   * @returns The encoded string.
   * @description encodeURIComponent 的扩展版本，可编码包括在各种平台（包括 Windows）的文件路径中非法的其他字符。
   */
  export function encodeURIComponentExtended(s: string): string;

  /**
   * Checks whether a link target is external, i.e. not a tiddler title.
   * @param to - The link target to check.
   * @returns True if the link target is external, false otherwise.
   * @description 检查链接目标是否为外部链接，即不是 tiddler 标题。
   */
  export function isLinkExternal(to: string): boolean;

  /**
   * Executes a function on the next tick of the event loop.
   * @param fn - The function to execute.
   * @description 在事件循环的下一个时刻执行函数。
   */
  export function nextTick(function_: () => void): void;

  /**
   * Converts a hyphenated CSS property name into a camel case one.
   * @param propName - The CSS property name to convert.
   * @returns The converted CSS property name.
   * @description 将连字符分隔的 CSS 属性名称转换为驼峰式。
   */
  export function unHyphenateCss(propertyName: string): string;

  /**
   * Converts a camelcase CSS property name into a dashed one ("backgroundColor" --> "background-color").
   * @param propName - The CSS property name to convert.
   * @returns The converted CSS property name.
   * @description 将驼峰式的 CSS 属性名称转换为连字符分隔的。
   */
  export function hyphenateCss(propertyName: string): string;

  /**
   * Parses a text reference of one of these forms:
   * * title
   * * !!field
   * * title!!field
   * * title##index
   * * etc
   * Returns an object with the following fields, all optional:
   * * title: tiddler title
   * * field: tiddler field name
   * * index: JSON property index
   * @param textRef - The text reference to parse.
   * @returns An object with the parsed fields.
   * @description 解析文本引用，支持以下格式：
   * * title
   * * !!field
   * * title!!field
   * * title##index
   * * 等等
   * 返回一个包含以下字段的对象，所有字段都是可选的：
   * * title：tiddler 标题
   * * field：tiddler 字段名称
   * * index：JSON 属性索引
   */
  export function parseTextReference(textReference: string): {
    field?: string;
    index?: string;
    title?: string;
  };

  /**
   * Checks whether a string is a valid field name.
   * @param name - The string to check.
   * @returns True if the string is a valid field name, false otherwise.
   * @description 检查字符串是否为有效的字段名称。
   */
  export function isValidFieldName(name: string): boolean;

  /**
   * Extracts the version number from the meta tag or from the boot file.
   * @returns The version number.
   * @description 从 meta 标签或启动文件中提取版本号。
   */
  export function extractVersionInfo(): string | null;

  /**
   * Gets the animation duration in milliseconds.
   * @returns The animation duration.
   * @description 获取动画持续时间（以毫秒为单位）。
   */
  export function getAnimationDuration(): number;

  /**
   * Hashes a string to a number. the function behind `<<now "format">>`
   * @param str - The string to hash.
   * @returns The hashed number.
   * @description 将字符串哈希为数字。
   */
  export function hashString(string_: string): number;

  /**
   * Decodes a base64 string.
   * @param string64 - The base64 string to decode.
   * @returns The decoded string.
   * @description 解码 base64 字符串。
   */
  export function base64Decode(string64: string): string;

  /**
   * Encodes a string to base64.
   * @param string64 - The string to encode.
   * @returns The encoded base64 string.
   * @description 将字符串编码为 base64。
   */
  export function base64Encode(string64: string): string;

  /**
   * Converts a hashmap into a tiddler dictionary format sequence of name:value pairs.
   * @param data - The hashmap to convert.
   * @returns The tiddler dictionary format sequence of name:value pairs.
   * @description 将 hashmap 转换为 tiddler 字典格式的 name:value 对序列。
   */
  export function makeTiddlerDictionary(data: Record<string, any>): string;

  /**
   * High resolution microsecond timer for profiling.
   * @param base - The base time to subtract from the current time.
   * @returns The current time in microseconds.
   * @description 用于分析的高分辨率微秒计时器。
   */
  export function timer(base?: number): number;

  /**
   * Converts text and content type to a data URI.
   * @param text - The text to convert.
   * @param type - The content type of the text.
   * @param _canonical_uri - The canonical URI of the text.
   * @returns The data URI.
   * @description 将文本和内容类型转换为数据 URI。
   */
  export function makeDataUri(
    text: string,
    type?: string,
    _canonical_uri?: string,
  ): string;

  /**
   * Converts a tag name to its fully escaped CSS selector equivalent.
   * @param tagName - The tag name to convert.
   * @returns The fully escaped CSS selector equivalent.
   * @description 将标签名称转换为其完全转义的 CSS 选择器等效项。
   */
  export function tagToCssSelector(tagName: string): string;

  /**
   * Returns the sign of a number.
   * @param x - The number to check.
   * @returns 1 if the number is positive, -1 if it is negative, and 0 if it is zero or NaN.
   * @description 返回数字的符号。如果数字为正，则返回 1，如果数字为负，则返回 -1，如果数字为零或 NaN，则返回 0。
   */
  export function sign(x: number): number;

  /**
   * Checks whether a string ends with a given substring.
   * @param str - The string to check.
   * @param ending - The substring to check for.
   * @param position - The position to start checking from.
   * @returns True if the string ends with the substring, false otherwise.
   * @description 检查字符串是否以给定的子字符串结尾。
   */
  export function stringEndsWith(
    string_: string,
    ending: string,
    position?: number,
  ): boolean;

  /**
   * Returns system information useful for debugging.
   * @returns A string with system information.
   * @description 返回有用于调试的系统信息字符串。
   */
  export function getSystemInfo(): string;

  /**
   * Parses a string into a number.
   * @param str - The string to parse.
   * @returns The parsed number or 0 if the string is not a valid number.
   * @description 将字符串解析为数字。
   */
  export function parseNumber(string_: string): number;

  /**
   * Parses a string into an integer.
   * @param str - The string to parse.
   * @returns The parsed integer or 0 if the string is not a valid integer.
   * @description 将字符串解析为整数。
   */
  export function parseInt(string_: string): number;

  /**
   * Converts a number to a string.
   * @param num - The number to convert.
   * @returns The converted string.
   * @description 将数字转换为字符串。
   */
  export function stringifyNumber(number_: number): string;

  /**
   * Creates a comparison function for a given type.
   * @param type - The type of comparison function to create.
   * @param options - The options for the comparison function.
   * @returns The comparison function.
   * @description 创建给定类型的比较函数。
   */
  export function makeCompareFunction(
    type: string,
    options?: {
      defaultType?: string;
      invert?: boolean;
      isCaseSensitive?: boolean;
    },
  ): (a: any, b: any) => number;
}
