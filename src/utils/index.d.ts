/// <reference path="Crypto.d.ts" />
/// <reference path="PasswordPrompt.d.ts" />

import { Spread } from 'type-fest';

declare module 'tiddlywiki' {
  export type TWDocument = Document | IFakeDocument;
  export type TWElement = Element;
  export type TWDOMElement = TWElement;
  export type ITWUtils = IUtils;

  export interface IDomMakerOptions {
    /**
     * @en
     * hashmap of attribute values
     * @zh
     * 属性值的 map
     *
     * @type {Record<string, unknown>}
     * @memberof IDomMakerOptions
     */
    attributes?: Record<string, unknown>;

    /**
     * @en
     * array of further child nodes
     * @zh
     * 其他子节点的数组
     *
     * @type {TWElement[]}
     * @memberof IDomMakerOptions
     */
    children?: TWElement[];

    /**
     * @en
     * class name(s)
     * @zh
     * 元素的 class，多个则以空格分隔
     *
     * @type {string}
     * @memberof IDomMakerOptions
     */
    class?: string;

    /**
     * @en
     * defaults to current document
     * @zh
     * 默认为当前 document
     *
     * @type {TWDocument}
     * @memberof IDomMakerOptions
     */
    document?: TWDocument;

    /**
     * @en
     * array of event listeners (this option won't work until `$tw.utils.addEventListeners()` has been loaded)
     * @zh
     * 事件监听器的数组（这个选项在`$tw.utils.addEventListeners()`被加载之前不会起作用）。
     *
     * @type {EventListener[]}
     * @memberof IDomMakerOptions
     */
    eventListeners?: EventListener[];

    /**
     * @en
     * optional HTML for element
     * @zh
     * 元素的 HTML 内容
     *
     * @type {string}
     * @memberof IDomMakerOptions
     */
    innerHTML?: string;

    /**
     * @type {string}
     * @default 'http://www.w3.org/1999/xhtml'
     * @memberof IDomMakerOptions
     */
    namespace?: string;

    /**
     * @en
     * Styles for Element
     * @zh
     * 元素的样式
     *
     * @type {CSSStyleDeclaration}
     * @memberof IDomMakerOptions
     */
    style?: Partial<CSSStyleDeclaration>;

    /**
     * @en
     * text to add as a child node
     * @zh
     * 添加为子节点的文本
     *
     * @type {string}
     * @memberof IDomMakerOptions
     */
    text?: string;
  }

  interface IUtilsBoot {
    Crypto: typeof Crypto;
    PasswordPrompt: typeof PasswordPrompt;

    /**
     * @en
     * Returns true if the version string A is greater than the version string B. Returns true if the versions are the same
     * @zh
     * 如果版本字符串 A 大于版本字符串 B，返回 true；如果版本相同，返回 true。
     */
    checkVersions: (versionStringA: string, versionStringB: string) => boolean;

    /**
     * @en
     * Returns +1 if the version string A is greater than the version string B, 0 if they are the same, and +1 if B is greater than A.
     * Missing or malformed version strings are parsed as 0.0.0
     * @zh
     * 如果版本字符串 A 大于版本字符串 B，则返回 +1；如果它们相同，则返回 0；如果 B 大于 A，则返回 +1；
     * 缺失或畸形的版本字符串被解析为 0.0.0
     */
    compareVersions: (
      versionStringA: string,
      versionStringB: string,
    ) => -1 | 0 | 1;

    /**
     * @en
     * Convert a URIComponent encoded string to a string safely
     * @zh
     * 将一个 URIComponent 编码的字符串安全地转换为一个字符串。
     */
    decodeURIComponentSafe: (uri: string) => string;

    /**
     * @en
     * Convert a URI encoded string to a string safely
     * @zh
     * 将一个 URI 编码的字符串安全地转换为一个字符串
     */
    decodeURISafe: (uri: string) => string;

    /**
     * @en
     * Fill in any null or undefined properties of an object with the properties from a list of source objects. Each property that is an object is called recursively
     * @zh
     * 用源对象列表中的属性来填充对象的任何空或未定义的属性。每个属于对象的属性都被递归地调用
     */
    deepDefaults: <O extends object, S extends object[]>(
      origin: O,
      ...sources: [...S]
    ) => Spread<O, S>;

    /**
     * @en
     * Helper for making DOM elements
     * @zh
     * 产生一个 DOM 元素
     *
     * @param {string} tag tag name
     * @param {IDomMakerOptions} options
     * @returns {TWElement}
     */
    domMaker: <K extends keyof HTMLElementTagNameMap | string>(
      tag: K,
      options: IDomMakerOptions,
    ) => K extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[K]
      : HTMLElement;

    /**
     * @en
     * Iterate through all the own properties of an object or array.
     * Callback is invoked with (element, index, object), if callback returns false, then the each loop will be terminated.
     * @zh
     * 遍历一个对象或数组的所有自身属性。
     * callback 被遍历调用 (element, index, object)，如果回调返回 false，那么每个循环将被终止。
     * @param {T} object
     * @param {(element: T[keyof T], index: keyof T, object: T) => void | false} callback
     * @example
     * $tw.utils.each([1, 2, 3], element => console.log(element));
     * $tw.utils.each({ a: 1, b: 2 }, (value, key) => console.log(key, value));
     */
    each: <T, K = T extends unknown[] ? number : keyof T>(
      object: T,
      callback: (element: T[K], index: K, object: T) => undefined | false,
    ) => void;

    /**
     * @en
     * Display an error and exit
     * @zh
     * 打印一个错误，如果在 Node 环境下，会退出进程
     */
    error: (error: Event | Error | string) => null | never;

    /**
     * @en
     * Run code globally with specified context variables in scope
     * @zh
     * 在全局范围内运行代码，范围内有指定的上下文变量
     */
    evalGlobal: (
      code: string,
      context: IEvalContent,
      filename: string,
    ) => unknown;

    /**
     * @en
     * Run code in a sandbox with only the specified context variables in scope
     * @zh
     * 在沙盒中运行代码，范围内只有指定的上下文变量
     */
    evalSandboxed: (
      code: string,
      context: IEvalContent,
      filename: string,
    ) => unknown;

    /**
     * @en
     * Extend an object with the properties from a list of source objects
     * @zh
     * 用源对象列表中的属性扩展一个对象
     */
    extend: <O extends object, S extends object[]>(
      origin: O,
      ...sources: [...S]
    ) => Spread<O, S>;

    /**
     * @en
     * Given an extension, always access the $tw.config.fileExtensionInfo using a lowercase extension only.
     * @zh
     * 给定一个扩展名，总是只使用小写的扩展名来访问$tw.config.fileExtensionInfo。
     */
    getFileExtensionInfo: (extension: string) => IFileExtensionInfo | null;

    /**
     * @en
     * Get the browser location.hash. We don't use location.hash because of the way that Firefox auto-urldecodes it (see http://stackoverflow.com/questions/1703552/encoding-of-window-location-hash)
     * @zh
     * 获取浏览器的 location.hash。我们不使用 location.hash，因为 Firefox 的自动解码方式（见 http://stackoverflow.com/questions/1703552/encoding-of-window-location-hash）。
     */
    getLocationHash: () => string;

    /**
     * @en
     * Given an extension, get the correct encoding for that file. defaults to utf8
     * @zh
     * 给定一个扩展名，获得该文件的正确编码。默认为 utf8
     */
    getTypeEncoding: (extension: string) => string;

    /**
     * @en
     * Check if an object has a property.
     * @zh
     * 检查一个对象是否有一个属性。
     */
    hop: (object: Record<string, unknown>, property: string | symbol) => boolean;

    /**
     * @en
     * Convert `&amp;` to `&`, `&nbsp;` to ` `, `&lt;` to `<`, `&gt;` to `>` and `&quot;` to `"`
     * @zh
     * 将`&amp;`转换成`&`，`&nbsp;`转换成` `，`&lt;`转换成`<`，`&gt;`转换成`>`，`&quot;`转换成`"`
     */
    htmlDecode: (text: string) => string;

    /**
     * @en
     * Add an entry to a sorted array if it doesn't already exist, while maintaining the sort order
     * @zh
     * 如果一个已排序的数组中不存在一个条目，则添加该条目，同时保持排序顺序
     */
    insertSortedArray: <T extends unknown[]>(
      array: T,
      value: unknown,
    ) => T;

    /**
     * @en
     * Determine if a value is an array.
     * @zh
     * 判断对象是否是一个数组。
     */
    isArray: (value: unknown) => boolean;

    /**
     * @en
     * Check if an array is equal by value and by reference.
     * @zh
     * 检查一个数组的值和引用是否相等。
     */
    isArrayEqual: (array1: unknown[], array2: unknown[]) => boolean;

    /**
     * @en
     * Determine if a value is a date
     * @zh
     * 确定一个值是否是一个日期
     */
    isDate: (value: unknown) => void;

    /**
     * @en
     * Pad a string to a given length with "0"s. Length defaults to 2
     * @zh
     * 用 "0 "将一个字符串填充到指定的长度。长度默认为 2
     */
    pad: (value: number, length?: number) => string;

    /**
     * @en
     * Parse a date from a UTC `YYYYMMDDHHMMSSmmm` format string
     * @zh
     * 从 UTC `YYYYMMDDHHMMSSmmm` 格式字符串中解析一个日期
     */
    parseDate: (value: string | Date) => Date | null;

    /**
     * @en
     * Parse a block of name:value fields. The `fields` object is used as the basis for the return value
     * @zh
     * 解析一个 name:value 字段的块。`fields`对象被用作返回值的基础。
     */
    parseFields: (text: string, fields?: object) => Record<string, string>;

    /**
     * @en
     * Safely parse a string as JSON
     * @zh
     * 安全地解析一个字符串为 JSON 对象
     */
    parseJSONSafe: <T = unknown>(
      input: string,
      defaultJSON?: (error: Error) => T,
    ) => T;

    /**
     * @en
     * Parse a string array from a bracketted list. For example `OneTiddler [[Another Tiddler]] LastOne`
     * @zh
     * 从一个带括号的列表中解析一个字符串数组。例如，`OneTiddler [[Another Tiddler]] LastOne`
     *
     * @returns {string[]} An array of tiddler titles. null if input is not string or string array. This won't happened in TS.
     */
    parseStringArray: (
      value: string | string[],
      allowDuplicate?: boolean,
    ) => string[];

    /**
     * @en
     * Parse a semantic version string into its constituent parts -- see https://semver.org
     * @zh
     * 将一个语义版本字符串解析为其构成部分 -- 见 https://semver.org
     */
    parseVersion: (version: string) => {
      build?: string;
      major: number;
      minor: number;
      patch: number;
      prerelease?: string;
      version: string;
    } | null;

    /**
     * @en
     * Push entries onto an array, removing them first if they already exist in the array
     * @zh
     * 将条目推送到一个数组中，如果它们已经存在于数组中，则先将其删除。
     *
     * @param {unknown[]} array array to modify (assumed to be free of duplicates)
     * @param {unknown} value a single value to push or an array of values to push
     * @returns {unknown[]}
     */
    pushTop: <T extends unknown[]>(array: T, value: unknown) => T;

    /**
     * @en
     * Register file type information
     * @zh
     * 注册文件类型信息
     *
     * @param {string} contentType
     * @param {string} encoding
     * @param {(string | string[])} extension
     * @param {{
     *           flags: string[];
     *           deserializerType: string;
     *         }} [options] Options includes:
     * * flags:"image" for image types
     * * deserializerType: defaults to type if not specified
     */
    registerFileType: (
      contentType: string,
      encoding: string,
      extension: string | string[],
      options?: {
        deserializerType?: string;
        flags?: string[];
      },
    ) => void;

    /**
     * @en
     * Resolves a source filepath delimited with `/` relative to a specified absolute root filepath.
     * In relative paths, the special folder name `..` refers to immediate parent directory, and the
     * name `.` refers to the current directory
     * @zh
     * 将以`/`为界的源文件路径相对于指定的绝对根文件路径进行解析。
     * 在相对路径中，特殊的文件夹名称`...`指的是直接的父目录，而名称`.`指的是当前目录。
     */
    resolvePath: (sourcepath: string, rootpath: string) => string;

    /**
     * @en
     * Convert a date into UTC `YYYYMMDDHHMMSSmmm` format
     * @zh
     * 将日期转换成 UTC `YYYYMMDDHMMSSmmm` 格式
     */
    stringifyDate: (value: Date) => string;

    /**
     * @en
     * Stringify an array of tiddler titles into a list string
     * @zh
     * 将一个数组的 tiddler 标题字符串化为一个列表字符串
     */
    stringifyList: (value: string[]) => string;
    /**
     * Remove any of the characters that are illegal in Windows filenames
     * See `$tw.utils.transliterationPairs` for the list of replacements
     */
    transliterate: (string_: string) => string;
    /**
     * Remove any of the characters that are illegal in Windows filenames
     * See `$tw.utils.transliterationPairs` for the list of replacements
     */
    transliterateToSafeASCII: (string_: string) => string;
    /**
     * Transliterate string to ASCII
     * (Some pairs taken from http://semplicewebsites.com/ removing-accents-javascript)
     */
    transliterationPairs: Record<string, string>;
  }

  export type IUtils = IUtilsBoot & IUtilsModules;
}
