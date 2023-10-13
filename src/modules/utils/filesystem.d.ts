declare module '$:/core/modules/utils/utils.js' {
  /**
   * Return the subdirectories of a path
   * @param dirPath - The path to the directory
   * @returns An array of subdirectories
   * @description 返回路径的子目录
   */
  export function getSubdirectories(dirPath: string): string[];

  /**
   * Recursively (and synchronously) copy a directory and all its content
   * @param srcPath - The source path of the directory to copy
   * @param dstPath - The destination path of the directory to copy
   * @returns An error message if there is an error, otherwise null
   * @description 递归地（同步地）复制目录及其所有内容
   */
  export function copyDirectory(srcPath: string, dstPath: string): string;

  /**
   * Copy a file
   * @param srcPath - The source path of the file to copy
   * @param dstPath - The destination path of the file to copy
   * @returns An error message if there is an error, otherwise null
   * @description 复制文件
   */
  export function copyFile(srcPath: string, dstPath: string): string;

  /**
   * Remove trailing path separator
   * @param dirPath - The directory path to remove the trailing separator from
   * @returns The directory path without the trailing separator
   * @description 移除路径末尾的分隔符
   */
  export function removeTrailingSeparator(dirPath: string): string;

  /**
   * Recursively create a directory
   * @param dirPath - The path of the directory to create
   * @returns An error message if there is an error, otherwise null
   * @description 递归地创建目录
   */
  export function createDirectory(dirPath: string): string;

  /**
   * Recursively create directories needed to contain a specified file
   * @param filePath - The path of the file to create directories for
   * @returns An error message if there is an error, otherwise null
   * @description 递归地创建包含指定文件的目录
   */
  export function createFileDirectories(filePath: string): string;

  /**
   * Recursively delete a directory
   * @param dirPath - The path of the directory to delete
   * @returns An error message if there is an error, otherwise null
   * @description 递归地删除目录
   */
  export function deleteDirectory(dirPath: string): string;

  /**
   * Check if a path identifies a directory
   * @param dirPath - The path to check
   * @returns True if the path identifies a directory, false otherwise
   * @description 检查路径是否标识目录
   */
  export function isDirectory(dirPath: string): boolean;

  /**
   * Check if a path identifies a directory that is empty
   * @param dirPath - The path to check
   * @returns True if the path identifies an empty directory, false otherwise
   * @description 检查路径是否标识空目录
   */
  export function isDirectoryEmpty(dirPath: string): boolean;

  /**
   * Recursively delete a tree of empty directories
   * @param dirpath - The path of the directory to delete
   * @param callback - A callback function to call when the operation is complete
   * @description 递归地删除空目录树
   */
  export function deleteEmptyDirs(
    dirpath: string,
    callback: (err: Error | null) => void,
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
      pathFilters?: string[];
      extFilters?: string[];
      wiki?: Wiki;
      fileInfo?: FileInfo;
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
   * extension: file extension to be added the finished filepath
   * directory: absolute path of root directory to which we are saving
   * pathFilters: optional array of filters to be used to generate the base path
   * wiki: optional wiki for evaluating the pathFilters
   * fileInfo: an existing fileInfo object to check against
   * @param title - The title of the tiddler
   * @param options - Options for generating the filepath
   * @returns The filepath
   * @description 生成用于保存 tiddler 的文件路径
   */
  export function generateTiddlerFilepath(
    title: string,
    options: {
      extension?: string;
      directory?: string;
      pathFilters?: string[];
      wiki?: Wiki;
      fileInfo?: FileInfo;
    },
  ): string;

  /**
   * Save a tiddler to a file described by the fileInfo
   * @param tiddler - The tiddler to save
   * @param fileInfo - The fileInfo object describing the file to save to
   * @param callback - A function to call when the operation is complete
   * @description 将 tiddler 保存到由 fileInfo 描述的文件中
   * fileInfo 包括：
   * filepath：包含 tiddler 的文件的绝对路径
   * type：tiddler 文件的类型（不是 tiddler 的类型）
   * hasMetaFile：如果文件还有一个伴随的 .meta 文件，则为 true
   */
  export function saveTiddlerToFile(
    tiddler: Tiddler,
    fileInfo: FileInfo,
    callback: (err: Error | null, fileInfo?: FileInfo) => void,
  ): void;

  /**
   * Save a tiddler to a file described by the fileInfo synchronously
   * @param tiddler - The tiddler to save
   * @param fileInfo - The fileInfo object describing the file to save to
   * @returns The fileInfo object
   * @description 将 tiddler 同步保存到由 fileInfo 描述的文件中
   * fileInfo 包括：
   * filepath：包含 tiddler 的文件的绝对路径
   * type：tiddler 文件的类型（不是 tiddler 的类型）
   * hasMetaFile：如果文件还有一个伴随的 .meta 文件，则为 true
   */
  export function saveTiddlerToFileSync(
    tiddler: Tiddler,
    fileInfo: FileInfo,
  ): FileInfo;

  /**
   * Delete a file described by the fileInfo if it exists
   * @param fileInfo - The fileInfo object describing the file to delete
   * @param callback - A function to call when the operation is complete
   * @description 如果存在，则删除由 fileInfo 描述的文件
   * fileInfo 包括：
   * filepath：要删除的文件的绝对路径
   * hasMetaFile：如果文件还有一个伴随的 .meta 文件，则为 true
   */
  export function deleteTiddlerFile(
    fileInfo: FileInfo,
    callback: (err: Error | null, fileInfo?: FileInfo) => void,
  ): void;

  /**
   * Cleanup old files on disk, by comparing the options values:
   * adaptorInfo from $tw.syncer.tiddlerInfo
   * bootInfo from $tw.boot.files
   * @param options - Options for cleaning up the files
   * @param callback - A function to call when the operation is complete
   * @description 通过比较选项值清理磁盘上的旧文件：
   * adaptorInfo 来自 $tw.syncer.tiddlerInfo
   * bootInfo 来自 $tw.boot.files
   * 可选项包括：
   * adaptorInfo：要清理的适配器信息
   * bootInfo：要清理的启动信息
   * title：要清理的 tiddler 的标题
   */
  export function cleanupTiddlerFiles(
    options: {
      adaptorInfo?: FileInfo;
      bootInfo?: FileInfo;
      title?: string;
    },
    callback: (err: Error | null, bootInfo?: FileInfo) => void,
  ): void;
}
