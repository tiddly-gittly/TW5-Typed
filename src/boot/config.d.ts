declare module 'tiddlywiki' {
  export interface IContentTypeInfo {
    deserializerType: string;
    encoding: string;
    extension: string;
    flags: string[];
  }

  export interface IFileExtensionInfo {
    type: string;
  }

  export type ITWConfig = IConfig;

  interface IConfig {
    [configName: string]: unknown;
    /** Map type to file content type */
    contentTypeInfo: Record<string, IContentTypeInfo>;
    /** @default 'TIDDLYWIKI_EDITION_PATH' */
    editionsEnvVar: string;
    /** @default '../editions/' */
    editionsPath: string;
    /** Map file extension */
    fileExtensionInfo: Record<string, IFileExtensionInfo>;
    /**
     * @default '^\\/\\*\\\\(?:\\r?\\n)((?:^[^\\r\\n]*(?:\\r?\\n))+?)(^\\\\\\*\\/$(?:\\r?\\n)?)
     */
    jsModuleHeaderRegExpString: string;
    /** @default 'TIDDLYWIKI_LANGUAGE_PATH' */
    languagesEnvVar: string;
    /** @default '../languages/' */
    languagesPath: string;
    //
    /** @default 'TIDDLYWIKI_PLUGIN_PATH' */
    pluginsEnvVar: string;
    /** @default '../plugins/'' */
    pluginsPath: string;
    /** @default 'TIDDLYWIKI_THEME_PATH' */
    themesEnvVar: string;
    /** @default '../themes/' */
    themesPath: string;
    /** @default './tiddlywiki.info' */
    wikiInfo: string;
    /** @default './languages' */
    wikiLanguagesSubDir: string;
    /** @default './output' */
    wikiOutputSubDir: string;
    /** @default './plugins' */
    wikiPluginsSubDir: string;
    /** @default './themes' */
    wikiThemesSubDir: string;
    /** @default './tiddlers' */
    wikiTiddlersSubDir: string;
  }
}
