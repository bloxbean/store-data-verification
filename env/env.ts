import dotenv from "dotenv";

dotenv.config({
  override: true,
  path: process.env.ENV ? `env/.env.${process.env.ENV}` : `env/.env.local`,
});

export interface Credentials {
  username: string;
  password: string;
}

export class Env {
  private static createCredentials(usernameKey: string, passwordKey: string): Credentials {
    const username = process.env[usernameKey];
    const password = process.env[passwordKey];
    if (!username || !password) {
      throw new Error(`Environment variables ${usernameKey} and ${passwordKey} must be set`);
    }
    return { username, password };
  }

  static get DB_CONN_STRING(): string {
    const dbConnString = process.env.DB_CONN_STRING;
    if (!dbConnString) {
      throw new Error("Environment variable DB_CONN_STRING must be set");
    }
    return dbConnString;
  }

  static get KOIOS_API_URL(): string {
    const koiosApiUrl = process.env.KOIOS_API_URL;
    if (!koiosApiUrl) {
      throw new Error("Environment variable KOIOS_API_URL must be set");
    }
    return koiosApiUrl;
  }

  static get LEDGER_SYNC_CREDENTIAL(): Credentials {
    return this.createCredentials("LEDGER_SYNC_USERNAME", "LEDGER_SYNC_PASSWORD");
  }

  static get LEDGER_SYNC_USERNAME(): string {
    const ledgerSyncUserName = process.env.LEDGER_SYNC_USERNAME;
    if (!ledgerSyncUserName) {
      throw new Error("Environment variable LEDGER_SYNC_USERNAME must be set");
    }
    return ledgerSyncUserName;
  }

  static get LEDGER_SYNC_PASSWORD(): string {
    const ledgerSyncPassword = process.env.LEDGER_SYNC_PASSWORD;
    if (!ledgerSyncPassword) {
      throw new Error("Environment variable LEDGER_SYNC_PASSWORD must be set");
    }
    return ledgerSyncPassword;
  }
}
