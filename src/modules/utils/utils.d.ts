declare const count: (object: object) => number;
declare const hashString: (str: string) => number;
declare const formatDateString: (date: Date, format: string) => string;

declare module 'tiddlywiki' {
  interface IUtils {
    /**
     * @en
     * Return the number of keys in an object
     * @zh
     * 返回一个对象中的键的数量
     */
    count: typeof count;
    /** the function behind `<<now "format">> */
    formatDateString: typeof formatDateString;
    /** Hash a string to a number
     * Derived from http://stackoverflow.com/a/15710692
     */
    hashString: typeof hashString;
  }
}

declare module '$:/core/modules/utils/utils.js' {
  export { count, formatDateString, hashString };
}
