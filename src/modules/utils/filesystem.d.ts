declare module '$:/core/modules/utils/utils.js' {
  import { IFileInfo, Tiddler, Wiki } from 'tiddlywiki';

  export const generateTiddlerFilepath: (
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
  export function generateTiddlerFileInfo(
    tiddler: Tiddler,
    options: {
      directory?: string;
      pathFilters?: string[];
      extFilters?: string[];
      wiki?: Wiki;
      fileInfo?: IFileInfo;
    },
  ): IFileInfo;
}

declare module 'tiddlywiki' {
  import { generateTiddlerFileInfo, generateTiddlerFilepath } from '$:/core/modules/utils/utils.js';
  export interface IFileInfo {
    isEditableFile: boolean;
    originalpath: string;
    type: string;
    hasMetaFile: boolean;
    encoding: string;
    filepath: string;
  }
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
    /**
    Create a fileInfo object for saving a tiddler:
      filepath: the absolute path to the file containing the tiddler
      type: the type of the tiddler file on disk (NOT the type of the tiddler)
      hasMetaFile: true if the file also has a companion .meta file
      isEditableFile: true if the tiddler was loaded via non-standard options & marked editable
    Options include:
      directory: absolute path of root directory to which we are saving
      pathFilters: optional array of filters to be used to generate the base path
      extFilters: optional array of filters to be used to generate the base path
      wiki: optional wiki for evaluating the pathFilters,
      fileInfo: an existing fileInfo to check against
    */
    generateTiddlerFileInfo: typeof generateTiddlerFileInfo;
  }
}
