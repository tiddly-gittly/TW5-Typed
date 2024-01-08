declare module 'tiddlywiki' {
  // 定义键盘事件信息的接口
  export interface KeyInfo {
    keyCode: number;
    shiftKey: boolean;
    altKey: boolean;
    ctrlKey: boolean;
    metaKey: boolean;
  }

  // 定义键盘管理器类的接口
  export interface KeyboardManager {
    namedKeys: Record<string, number>;
    keyNames: string[];
    metaKeyName: string;
    shortcutKeysList: string[];
    shortcutActionList: string[];
    shortcutParsedList: (KeyInfo[] | undefined)[];
    shortcutPriorityList: boolean[];
    lookupNames: string[];
    getModifierKeys: () => number[];
    parseKeyDescriptor: (
      keyDescriptor: string,
      options?: { keyDescriptor?: string },
    ) => KeyInfo | null;
    parseKeyDescriptors: (
      keyDescriptors: string[] | string,
      options?: { stack?: string[]; wiki?: any },
    ) => KeyInfo[];
    getPrintableShortcuts: (keyInfoArray: KeyInfo[]) => string[];
    checkKeyDescriptor: (event: any, keyInfo: KeyInfo) => boolean;
    checkKeyDescriptors: (event: any, keyInfoArray: KeyInfo[]) => boolean;
    getMatchingKeyDescriptor: (
      event: any,
      keyInfoArray: KeyInfo[],
    ) => KeyInfo | null;
    getEventModifierKeyDescriptor: (event: any) => string;
    getShortcutTiddlerList: () => string[];
    updateShortcutLists: (tiddlerList: string[]) => void;
    handleKeydownEvent: (
      event: any,
      options?: { onlyPriority?: boolean },
    ) => boolean;
    detectNewShortcuts: (
      changedTiddlers: Record<string, any>,
    ) => boolean | string[];
    handleShortcutChanges: (changedTiddlers: Record<string, any>) => void;
  }
}
