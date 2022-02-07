// eslint-disable-next-line @typescript-eslint/no-extraneous-class
declare class variablesConstructor {}

export class Widget {
  constructor(parseTreeNode: unknown, options: unknown);
  initialize: (parseTreeNode: unknown, options: unknown) => void;
  parseTreeNode: unknown;
  wiki: unknown;
  parentWidget?: Widget;
  variablesConstructor: variablesConstructor;
  variables: unknown;
}
