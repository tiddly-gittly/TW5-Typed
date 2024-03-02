/// <reference path="../../wiki/index.d.ts" />
/// <reference path="../../tiddler/index.d.ts" />


declare module '$:/core/modules/utils/utils.js' {
  /**
   * Return the subdirectories of a path
   * @param directoryPath - The path to the directory
   * @returns An array of subdirectories
   * @description 返回路径的子目录
   */
  export function getSubdirectories(directoryPath: string): string[];

  /**
   * Recursively (and synchronously) copy a directory and all its content
   * @param srcPath - The source path of the directory to copy
   * @param directoryPath - The destination path of the directory to copy
   * @returns An error message if there is an error, otherwise null
   * @description 递归地（同步地）复制目录及其所有内容
   */
  export function copyDirectory(sourcePath: string, directoryPath: string): string;

  /**
   * Copy a file
   * @param srcPath - The source path of the file to copy
   * @param directoryPath - The destination path of the file to copy
   * @returns An error message if there is an error, otherwise null
   * @description 复制文件
   */
  export function copyFile(sourcePath: string, directoryPath: string): string;

  /**
   * Remove trailing path separator
   * @param directoryPath - The directory path to remove the trailing separator from
   * @returns The directory path without the trailing separator
   * @description 移除路径末尾的分隔符
   */
  export function removeTrailingSeparator(directoryPath: string): string;

  /**
   * Recursively create a directory
   * @param directoryPath - The path of the directory to create
   * @returns An error message if there is an error, otherwise null
   * @description 递归地创建目录
   */
  export function createDirectory(directoryPath: string): string;

  /**
   * Recursively create directories needed to contain a specified file
   * @param filePath - The path of the file to create directories for
   * @returns An error message if there is an error, otherwise null
   * @description 递归地创建包含指定文件的目录
   */
  export function createFileDirectories(filePath: string): string;

  /**
   * Recursively delete a directory
   * @param directoryPath - The path of the directory to delete
   * @returns An error message if there is an error, otherwise null
   * @description 递归地删除目录
   */
  export function deleteDirectory(directoryPath: string): string;

  /**
   * Check if a path identifies a directory
   * @param directoryPath - The path to check
   * @returns True if the path identifies a directory, false otherwise
   * @description 检查路径是否标识目录
   */
  export function isDirectory(directoryPath: string): boolean;

  /**
   * Check if a path identifies a directory that is empty
   * @param directoryPath - The path to check
   * @returns True if the path identifies an empty directory, false otherwise
   * @description 检查路径是否标识空目录
   */
  export function isDirectoryEmpty(directoryPath: string): boolean;

  /**
   * Recursively delete a tree of empty directories
   * @param directoryPath - The path of the directory to delete
   * @param callback - A callback function to call when the operation is complete
   * @description 递归地删除空目录树
   */
  export function deleteEmptyDirectories(
    directoryPath: string,
    callback: (error: Error | null) => void,
  ): void;

  /**
   * Generate a fileInfo object for saving a tiddler
   * @param tiddler - The tiddler to generate the fileInfo for
   * @param options - Options for generating the fileInfo
   * @returns A fileInfo object
   * @description 生成用于保存 tiddler 的 fileInfo 对象
   */
  export function generateTiddlerFileInfo(
    tiddler: Tiddler,
    options: {
      directory: string;
      extFilters?: string[];
      fileInfo?: FileInfo;
      pathFilters?: string[];
      wiki?: Wiki;
    },
  ): FileInfo;

  /**
   * Generate the file extension for saving a tiddler
   * @param title - The title of the tiddler
   * @param options - Options for generating the file extension
   * @returns The file extension
   * @description 生成用于保存 tiddler 的文件扩展名
   * 可选项包括：
   * extFilters：用于生成扩展名的可选过滤器数组
   * wiki：用于评估 extFilters 的可选 wiki
   */
  export function generateTiddlerExtension(
    title: string,
    options: {
      extFilters?: string[];
      wiki?: Wiki;
    },
  ): string;
  /**
   * Generate the filepath for saving a tiddler
   * Options include:
   * * extension: file extension to be added the finished filepath
   * * directory: absolute path of root directory to which we are saving
   * * pathFilters: optional array of filters to be used to generate the base path
   * * wiki: optional wiki for evaluating the pathFilters
   * * fileInfo: an existing fileInfo object to check against
   */
  export function generateTiddlerFilepath(
    title: string,
    options: {
      extFilters?: string[];
      wiki?: Wiki;
    },
  ): string;
}
