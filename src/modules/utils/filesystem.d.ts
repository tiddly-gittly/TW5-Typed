declare const generateTiddlerFilepath: (
  title: string,
  options?: {
    directory?: string;
    extension?: string;
    fileInfo?: {
      originalpath?: string;
      filePath?: string;
      writeError?: boolean;
    };
    pathFilters?: string[];
    wiki?: Wiki;
  },
) => string;

declare module 'tiddlywiki' {
  interface IUtils {
    /**
     * Generate the filepath for saving a tiddler
     * Options include:
     * * extension: file extension to be added the finished filepath
     * * directory: absolute path of root directory to which we are saving
     * * pathFilters: optional array of filters to be used to generate the base path
     * * wiki: optional wiki for evaluating the pathFilters
     * * fileInfo: an existing fileInfo object to check against
     */
    generateTiddlerFilepath: typeof generateTiddlerFilepath;
  }
}

declare module '$:/core/modules/utils/utils.js' {
  export { generateTiddlerFilepath };
}
