declare module '$:/core/modules/utils/escapecss.js' {
  /**
   * The onstalled event handler of the element
   * @returns The escaped string
   * @description 为在 CSS 选择器或标识符中使用而转义字符串
   */
  export function escapeCSS(value: string): typeof window.CSS.escape;
}
