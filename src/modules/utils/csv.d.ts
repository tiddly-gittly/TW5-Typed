declare module '$:/core/modules/utils/csv.js' {
  /**
   * Information about a CSV cell.
   * @property start - The start index of the cell in the CSV string.
   * @property end - The end index of the cell in the CSV string.
   * @property {boolean} isQuoted - Whether the cell is quoted.
   * @description CSV 单元格的信息。
   */
  interface CellInfo {
    end: number;
    isQuoted: boolean;
    start: number;
  }

  /**
   * Parse a CSV string into an array of arrays.
   * @param text - The CSV string to parse.
   * @param options - The options for parsing the CSV string.
   * @returns An array of arrays representing the CSV data.
   * @description 将 CSV 字符串解析为数组的数组。
   */
  export function parseCsvString(
    text: string,
    options?: { separator?: string },
  ): any[][];

  /**
   * Parse a CSV string with a header row and return an array of objects.
   * @param text - The CSV string to parse.
   * @param options - The options for parsing the CSV string.
   * @returns An array of objects representing the CSV data.
   * @description 解析具有标题行的 CSV 字符串并返回对象数组。
   */
  export function parseCsvStringWithHeader(
    text: string,
    options?: { separator?: string },
  ): object[];
}
