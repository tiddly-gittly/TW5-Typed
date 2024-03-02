declare module 'tiddlywiki' {
  // 定义键盘事件信息的接口
  export interface KeyInfo {
    altKey: boolean;
    ctrlKey: boolean;
    keyCode: number;
    metaKey: boolean;
    shiftKey: boolean;
  }

  // 定义键盘管理器类的接口
  export interface KeyboardManager {
    checkKeyDescriptor: (event: any, keyInfo: KeyInfo) => boolean;
    checkKeyDescriptors: (event: any, keyInfoArray: KeyInfo[]) => boolean;
    detectNewShortcuts: (
      changedTiddlers: Record<string, any>,
    ) => boolean | string[];
    getEventModifierKeyDescriptor: (event: any) => string;
    getMatchingKeyDescriptor: (
      event: any,
      keyInfoArray: KeyInfo[],
    ) => KeyInfo | null;
    getModifierKeys: () => number[];
    getPrintableShortcuts: (keyInfoArray: KeyInfo[]) => string[];
    getShortcutTiddlerList: () => string[];
    handleKeydownEvent: (
      event: any,
      options?: { onlyPriority?: boolean },
    ) => boolean;
    handleShortcutChanges: (changedTiddlers: Record<string, any>) => void;
    keyNames: string[];
    lookupNames: string[];
    metaKeyName: string;
    namedKeys: Record<string, number>;
    parseKeyDescriptor: (
      keyDescriptor: string,
      options?: { keyDescriptor?: string },
    ) => KeyInfo | null;
    parseKeyDescriptors: (
      keyDescriptors: string[] | string,
      options?: { stack?: string[]; wiki?: any },
    ) => KeyInfo[];
    shortcutActionList: string[];
    shortcutKeysList: string[];
    shortcutParsedList: Array<KeyInfo[] | undefined>;
    shortcutPriorityList: boolean[];
    updateShortcutLists: (tiddlerList: string[]) => void;
  }
}
