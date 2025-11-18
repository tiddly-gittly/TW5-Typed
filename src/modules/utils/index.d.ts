/// <reference path="utils.d.ts" />
/// <reference path="fakedom.d.ts" />
/// <reference path="filesystem.d.ts" />
/// <reference path="linked-list.d.ts" />
/// <reference path="performance.d.ts" />
/// <reference path="logger.d.ts" />
/// <reference path="parsetree.d.ts" />
/// <reference path="pluginmaker.d.ts" />
/// <reference path="transliterate.d.ts" />
/// <reference path="crypto.d.ts" />
/// <reference path="csv.d.ts" />
/// <reference path="edition-info.d.ts" />
/// <reference path="escapecss.d.ts" />

declare module 'tiddlywiki' {
  // Thanks for GitHub Copilot, you has helped me a lot!
  import * as dom from '$:/core/modules/utils/dom.js';
  import * as logger from '$:/core/modules/utils/logger.js';
  import * as utils from '$:/core/modules/utils/utils.js';
  import * as filesystem from '$:/core/modules/utils/filesystem.js';
  import * as LinkedList from '$:/core/modules/utils/linked-list.js';
  import * as performance from '$:/core/modules/utils/performance.js';
  // import the class directly, to fix: Property 'log' does not exist on type 'typeof Logger'.ts(2339)
  import * as parseutils from '$:/core/modules/utils/parseutils.js';
  import * as pluginMaker from '$:/core/modules/utils/pluginmaker.js';
  import * as transliterate from '$:/core/modules/utils/transliterate.js';
  import * as crypto from '$:/core/modules/utils/crypto.js';
  import * as csv from '$:/core/modules/utils/csv.js';
  import * as editionInfo from '$:/core/modules/utils/edition-info.js';
  import * as escapecss from '$:/core/modules/utils/escapecss.js';

  type IUtilitiesModules =
    & Pick<typeof dom, keyof typeof dom>
    & Pick<typeof logger, keyof typeof logger>
    & Pick<typeof filesystem, keyof typeof filesystem>
    & Pick<typeof utils, keyof typeof utils>
    & Pick<typeof LinkedList, keyof typeof LinkedList>
    & Pick<typeof performance, keyof typeof performance>
    & Pick<typeof parseutils, keyof typeof parseutils>
    & Pick<typeof pluginMaker, keyof typeof pluginMaker>
    & Pick<typeof transliterate, keyof typeof transliterate>
    & Pick<typeof crypto, keyof typeof crypto>
    & Pick<typeof csv, keyof typeof csv>
    & Pick<typeof editionInfo, keyof typeof editionInfo>
    & Pick<typeof escapecss, keyof typeof escapecss>;
}
