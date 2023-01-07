declare module 'tiddlywiki' {
  export interface ITWModuleExports {
    [exportName: string]: unknown;
    name?: string;
    type?: string;
  }
  export interface IModuleInfo {
    definition: string | TWModuleDefinitionFucntion | ITWModuleExports;
    exports: ITWModuleExports | null;
    moduleType: string;
  }
  export interface ITWRequire {
    (title: string): ITWModuleExports;
    readonly main: NodeJS.Module | { TiddlyWiki: TW5InitFunction };
  }
  export interface IModuleSandbox {
    $tw: ITiddlyWiki;
    // eslint-disable-next-line node/prefer-global/buffer
    Buffer?: Buffer;
    clearInterval: typeof clearInterval;
    clearTimeout: typeof clearTimeout;
    console: Console;
    exports: ITWModuleExports;
    module: { exports: ITWModuleExports; readonly id: string };
    process?: NodeJS.Process;
    require: ITWRequire;
    setInterval: typeof setInterval;
    setTimeout: typeof setTimeout;
  }
  export type TWModuleDefinitionFucntion = (
    moduleInfo: IModuleInfo,
    exports: ITWModuleExports,
    requireFunction: ITWRequire,
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
    /** Apply the exports of the modules of a particular type to a target object */
    applyMethods: (
      moduleType: string,
      targetObject?: ITWModuleExports,
    ) => ITWModuleExports;
    /** Return a class created from a modules. The module should export the properties to be added to those of the optional base class */
    createClassFromModule: (
      moduleExports: ITWModuleExports,
      baseClass: new () => unknown,
    ) => ITWModuleExports;
    /** Return an array of classes created from the modules of a specified type. Each module should export the properties to be added to those of the optional base class */
    createClassesFromModules: (
      moduleType: string,
      subType: string | null | undefined,
      baseClass: new () => unknown,
    ) => Record<string, ITWModuleExports>;
    /**
     * Define a JavaScript tiddler module for later execution
     * @param {string} moduleName name of module being defined
     * @param {string} moduleType type of module
     * @param {(string | TWModuleDefinitionFucntion | ITWModuleExports)} definition module definition; see discussion above
     * @memberof ITWModules
     */
    define: (
      moduleName: string,
      moduleType: string,
      definition: string | TWModuleDefinitionFucntion | ITWModuleExports,
    ) => void;
    /**
     * Execute the module named 'moduleName'. The name can optionally be relative to the module named 'moduleRoot'
     * @memberof ITWModules
     */
    execute: (moduleName: string, moduleRoot: string) => ITWModuleExports;
    /**
     * Apply a callback to each module of a particular type
     *
     * @param {string} moduleType type of modules to enumerate
     * @param {(title, moduleExports) => void} callback function called as callback(title,moduleExports) for each module
     * @memberof ITWModules
     */
    forEachModuleOfType: (
      moduleType: string,
      callback: (title: string, moduleExports: unknown) => void,
    ) => void;
    /** Get all the modules of a particular type in a hashmap by their `name` field */
    getModulesByTypeAsHashmap: (
      moduleType: string,
      nameField: string,
    ) => Record<string, IModuleInfo>;
    /** hashmap by module name of moduleInfo */
    titles: Record<string, IModuleInfo>;
    /** hashmap by module type and then name of moduleInfo */
    types: Record<string, Record<string, IModuleInfo>>;
  }
}
