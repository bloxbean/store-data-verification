export default class DatabaseConstants {
  static readonly CONNECT_TIMEOUT_MS = 2 * 60 * 1000;

  static readonly WAIT_TIME_RETRY = 15 * 1000;

  static readonly SHORT_WAIT_TIME_RETRY = 3 * 1000;

  static readonly BLOCK_TABLE = "Block";

  static readonly DATABASE_NAME = "ledger_sync";
}
