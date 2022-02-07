declare module "tiddlywiki" {
  export interface IModuleInfo {
    moduleType: string;
    definition: string | TWModuleDefinitionFucntion | Record<unknown, unknown>;
    exports: Record<unknown, unknown> | null;
  }
  export interface IModuleSandbox {
    module: { exports: Record<unknown, unknown> };
    exports: Record<unknown, unknown>;
    console: Console;
    setInterval: typeof setInterval;
    clearInterval: typeof clearInterval;
    setTimeout: typeof setTimeout;
    clearTimeout: typeof clearTimeout;
    Buffer?: Buffer;
    $tw: TiddlyWiki;
    require: (title: string) => Record<unknown, unknown>;
  }
  export type TWModuleDefinitionFucntion = (
    moduleInfo: IModuleInfo,
    exports: Record<unknown, unknown>,
    requireFunction: (title: string) => void
  ) => void;
  /**
   * Information about each module is kept in an object with these members:
   *
   * * moduleType: type of module
   * * definition: object, function or string defining the module; see below
   * * exports: exports of the module, filled in after execution
   *
   * The `definition` can be of several types:
   *
   * * An object can be used to directly specify the exports of the module
   * * A function with the arguments `module,require,exports` that returns `exports`
   * * A string function body with the same arguments
   *
   * Each moduleInfo object is stored in two hashmaps: $tw.modules.titles and $tw.modules.types. The first is indexed by title and the second is indexed by type and then title
   */
  interface ITWModules {
    /** hashmap by module name of moduleInfo */
    titles: Record<string, IModuleInfo>;
    /** hashmap by module type and then name of moduleInfo */
    types: Record<string, Record<string, IModuleInfo>>;
    /**
     * Define a JavaScript tiddler module for later execution
     * @param {string} moduleName name of module being defined
     * @param {string} moduleType type of module
     * @param {(string | TWModuleDefinitionFucntion | Record<unknown, unknown>)} definition module definition; see discussion above
     * @memberof ITWModules
     */
    define(
      moduleName: string,
      moduleType: string,
      definition: string | TWModuleDefinitionFucntion | Record<unknown, unknown>
    ): void;
    /**
     * Execute the module named 'moduleName'. The name can optionally be relative to the module named 'moduleRoot'
     * @memberof ITWModules
     */
    execute(moduleName: string, moduleRoot: string): Record<unknown, unknown>;
    /**
     * Apply a callback to each module of a particular type
     *
     * @param {string} moduleType type of modules to enumerate
     * @param {(title, moduleExports) => void} callback function called as callback(title,moduleExports) for each module
     * @memberof ITWModules
     */
    forEachModuleOfType(
      moduleType: string,
      callback: (title, moduleExports) => void
    ): void;
    /** Get all the modules of a particular type in a hashmap by their `name` field */
    getModulesByTypeAsHashmap(
      moduleType: string,
      nameField: string
    ): Record<string, IModuleInfo>;
    /** Apply the exports of the modules of a particular type to a target object */
    applyMethods(
      moduleType: string,
      targetObject?: Record<unknown, unknown>
    ): Record<unknown, unknown>;
    /** Return a class created from a modules. The module should export the properties to be added to those of the optional base class */
    // createClassFromModule<T>(moduleExports, baseClass: Construc);
  }
}
