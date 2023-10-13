declare module '$:/core/modules/utils/pluginmaker.js' {
  /**
   * Repacks a plugin, and then deletes any non-shadow payload tiddlers.
   * @param title - The title of the plugin tiddler.
   * @param additionalTiddlers - An array of additional tiddlers to include in the plugin.
   * @param excludeTiddlers - An array of tiddlers to exclude from the plugin.
   * @returns A confirmation message.
   * @description 重新打包插件，然后删除任何非阴影有效负载 tiddlers。
   */
  export function repackPlugin(
    title: string,
    additionalTiddlers?: string[],
    excludeTiddlers?: string[],
  ): string;
}
