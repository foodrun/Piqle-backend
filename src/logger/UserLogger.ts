class UserLogger {
  private _metaKey = {};

  public AddNewLogs(logs: unknown) {
    this._metaKey = logs;
  }

  public GetLogsMetaKey() {
    return this._metaKey;
  }

  public ResetLogsMetaKey() {
    this._metaKey = {};
  }
}

export const Userlogger = new UserLogger();
