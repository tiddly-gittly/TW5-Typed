declare module '$:/core/modules/utils/transliterate.js' {
  /**
   * An object containing pairs of characters to be transliterated.
   * @description 包含要转换的字符对的对象。
   */
  export const transliterationPairs: { [key: string]: string };

  /**
   * Transliterates a string to ASCII.
   * @param str - The string to transliterate.
   * @returns The transliterated string.
   * @description 将字符串转换为 ASCII。
   */
  export function transliterate(str: string): string;

  /**
   * Transliterates a string to safe ASCII.
   * @param str - The string to transliterate.
   * @returns The transliterated string.
   * @description 将字符串转换为安全的 ASCII。
   */
  export function transliterateToSafeASCII(str: string): string;
}
