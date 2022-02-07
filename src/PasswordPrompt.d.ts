declare module "tiddlywiki" {
  export interface PasswordPromptInfo {
    serviceName: string;
    callback: PasswordPromptInfoCallback;
    form: TWDOMElement;
    owner: PasswordPrompt;
  }

  export type PasswordPromptInfoCallback = (
    data: {
      username: string;
      password: string;
      password2?: string;
    } | null
  ) => boolean;

  export class PasswordPrompt {
    /** Creates a PasswordPrompt object */
    constructor();
    /** Store of pending password prompts */
    passwordPrompts: PasswordPromptInfo[];
    promptWrapper: TWDOMElement;
    /** Hides or shows the wrapper depending on whether there are any outstanding prompts */
    setWrapperDisplay(): void;
    /**
     * Adds a new password prompt. Options are:
     * @param {{
     *       submitText: string;
     *       serviceName: string;
     *       noUserName: boolean;
     *       canCancel: boolean;
     *       repeatPassword: boolean;
     *       callback: PasswordPromptInfoCallback;
     *     }} options Options are:
     * * submitText: text to use for submit button (defaults to "Login")
     * * serviceName: text of the human readable service name
     * * noUserName: set true to disable username prompt
     * * canCancel: set true to enable a cancel button (callback called with null)
     * * repeatPassword: set true to prompt for the password twice
     * * callback: function to be called on submission with parameter of object {username:,password:}. Callback must return `true` to remove the password prompt
     * @returns {PasswordPromptInfo}
     * @memberof PasswordPrompt
     */
    createPrompt(options: {
      submitText: string;
      serviceName: string;
      noUserName: boolean;
      canCancel: boolean;
      repeatPassword: boolean;
      callback: PasswordPromptInfoCallback;
    }): PasswordPromptInfo;
    removePrompt(promptInfo: PasswordPromptInfo): void;
  }
}
