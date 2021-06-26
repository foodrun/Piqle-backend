import { tableOperations } from './RestaurantService/TableService/TableOperations/table-operations.service';

export class QRCodeGenerator {
  constructor(private _restaurantID: string, private _tableID, private _url: string) {}

  public async generateAndUploadTableQR(): Promise<boolean> {
    await tableOperations.getTable(this._restaurantID, this._tableID);
    const url = this._url;
    if (!(await this.updateQRLinkInDB(url))) return false;
    return true;
  }

  public async updateQRLinkInDB(qrLink: string): Promise<boolean> {
    const tableOps = await tableOperations.updateTable(
      this._restaurantID,
      this._tableID,
      'table.qrCode',
      qrLink,
      false,
    );
    if (!tableOps) return false;
    return true;
  }
}
