declare module '$:/core/modules/utils/linked-list.js' {
  /**
   * A linked list implementation.
   * @description 链表实现。
   */
  export class LinkedList {
    /**
     * The next node in the linked list.
     */
    next: LLMap;
    /**
     * The previous node in the linked list.
     */
    prev: LLMap;
    /**
     * The length of the linked list.
     */
    length: number;
    constructor();
    /**
     * Clear the linked list.
     * @description 清空链表。
     */
    clear(): void;
    /**
     * Remove a value from the linked list.
     * @param value - The value to remove.
     * @description 从链表中删除值。
     */
    remove(value: string | string[]): void;
    /**
     * Push a value to the end of the linked list.
     * @param values - The values to push.
     * @returns The length of the linked list.
     * @description 将值推送到链表的末尾。
     */
    push(...values: string[] | string[][]): number;
    /**
     * Push a value to the top of the linked list.
     * @param value - The value to push.
     * @description 将值推送到链表的顶部。
     */
    pushTop(value: string | string[]): void;
    /**
     * Iterate over each value in the linked list.
     * @param callback - The callback function to call for each value.
     * @description 迭代链表中的每个值。
     */
    each(callback: (value: string) => void): void;
    /**
     * Convert the linked list to an array.
     * @returns The array representation of the linked list.
     * @description 将链表转换为数组。
     */
    toArray(): string[];
    /**
     * Create an iterator for the linked list.
     * @param wiki - The wiki to use for the iterator.
     * @returns The iterator function.
     * @description 创建链表的迭代器。
     */
    makeTiddlerIterator(
      wiki: any,
    ): (callback: (tiddler: any, title: string) => void) => void;
  }

  class LLMap {
    /**
     * The map object.
     */
    map: { [key: string]: any };
    /**
     * The null value of the map.
     */
    null: any;
    /**
     * Set a value in the map.
     * @param key - The key to set.
     * @param val - The value to set.
     * @description 在映射中设置值。
     */
    set(key: string | null, val: any): void;
    /**
     * Get a value from the map.
     * @param key - The key to get.
     * @returns The value of the key.
     * @description 从映射中获取值。
     */
    get(key: string | null): any;
  }
}
