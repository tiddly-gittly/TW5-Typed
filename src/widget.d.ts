declare class variablesConstructor {

}

export class Widget {
  constructor(parseTreeNode: any, options: any);
  initialize: (parseTreeNode: any, options: any) => void;
  parseTreeNode: any;
  wiki: any;
  parentWidget?: Widget;
  variablesConstructor: variablesConstructor;
  variables: any;
}
