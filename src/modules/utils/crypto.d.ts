declare module '$:/core/modules/utils/crypto.js' {
  /**
   * Extracts an encrypted store area from a TiddlyWiki file.
   * @param text - The text of the TiddlyWiki file.
   * @returns The extracted encrypted store area, or null if not found.
   */
  export function extractEncryptedStoreArea(text: string): string | null;

  /**
   * Attempts to decrypt an encrypted store area using the provided password.
   * @param encryptedStoreArea - The encrypted store area to decrypt.
   * @param password - The password to use for decryption.
   * @returns An array of decrypted tiddlers, or null if decryption fails.
   */
  export function decryptStoreArea(
    encryptedStoreArea: string,
    password?: string,
  ): any[] | null;

  /**
   * Prompts the user for a password and attempts to decrypt an encrypted store area using the provided password.
   * @param encryptedStoreArea - The encrypted store area to decrypt.
   * @param callback - The function to call with the decrypted tiddlers.
   * @param options - Configuration options.
   * @param options.usePasswordVault - Whether to store the password in the system password vault.
   */
  export function decryptStoreAreaInteractive(
    encryptedStoreArea: string,
    callback: (tiddlers: any[]) => void,
    options?: { usePasswordVault?: boolean },
  ): void;
}
