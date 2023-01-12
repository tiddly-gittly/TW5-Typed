declare module 'tiddlywiki' {
  export class TW_Element extends HTMLElement {
    _style: Record<string, unknown>;
    appendChild: <T extends TW_Element | TW_TextNode | Node>(node: T) => T;
    isRaw: boolean;
    isTiddlyWikiFakeDom: boolean;
    namespaceURI: string;
    tag: string;
  }

  export class TW_TextNode extends Node {
    textContent: string;
  }

  export interface IFakeDocument {
    compatMode: string;
    createElement: (tag: string) => TW_Element;
    createElementNS: (namespace: string, tag: string) => TW_Element;
    createTextNode: (text: string) => TW_TextNode;
    isTiddlyWikiFakeDom: boolean;
    setSequenceNumber: (value: any) => void;
  }
}

declare module '$:/core/modules/utils/fakedom.js' {
  export type { TW_Element, TW_TextNode, IFakeDocument } from 'tiddlywiki';
}
