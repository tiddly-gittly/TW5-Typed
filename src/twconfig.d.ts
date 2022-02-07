declare module "tiddlywiki" {
  declare interface ITWConfig {
    /** Default is `../plugins/` */
    pluginsPath: string;
    /** Default is `../themes/` */
    themesPath: string;
    /** Default is `../languages/` */
    languagesPath: string;
    /** Default is `../editions/` */
    editionsPath: string;
    /** Default is `./tiddlywiki.info` */
    wikiInfo: string;
    /** Default is `./plugins` */
    wikiPluginsSubDir: string;
    /** Default is `./themes` */
    wikiThemesSubDir: string;
    /** Default is `./languages` */
    wikiLanguagesSubDir: string;
    /** Default is `./tiddlers` */
    wikiTiddlersSubDir: string;
    /** Default is `./output` */
    wikiOutputSubDir: string;
    /** Default is `^\\/\\*\\\\(?:\\r?\\n)((?:^[^\\r\\n]*(?:\\r?\\n))+?)(^\\\\\\*\\/$(?:\\r?\\n)?)` */
    jsModuleHeaderRegExpString: string;
    /** Map file extension */
    fileExtensionInfo: Record<string, IFileExtensionInfo>;
    /** Map type to file content type */
    contentTypeInfo: Record<string, IContentTypeInfo>; //
    /** Default is `TIDDLYWIKI_PLUGIN_PATH` */
    pluginsEnvVar: string;
    /** Default is `TIDDLYWIKI_THEME_PATH` */
    themesEnvVar: string;
    /** Default is `TIDDLYWIKI_LANGUAGE_PATH` */
    languagesEnvVar: string;
    /** Default is `TIDDLYWIKI_EDITION_PATH` */
    editionsEnvVar: string;
    [configName: string]: unknown;
  }
}
