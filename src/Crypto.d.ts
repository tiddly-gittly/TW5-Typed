declare module 'tiddlywiki' {
  export class Crypto {
    setPassword(newPassword: string): void;
    updateCryptoStateTiddler(): void;
    hasPassword(): boolean;
    encrypt(text: string, password: string): string | null;
    decrypt(text: string, password: string): string | null;
  }
}
