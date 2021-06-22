import axios from 'axios';
import HttpException from '../exceptions/HttpException';

export class QRCodeGenerator {
  constructor(private _restaurantID: string, private _tableID, private _url: string) {}

  public async generateAndUploadTableQR(): Promise<boolean> {
    const qrBuffer = await this.qrCodeGenerator();
    if (!qrBuffer) throw new HttpException(500, 'Buffer Missing');
    const uploadLink = await this.uploadQRToS3(qrBuffer);
    if (!uploadLink) throw new HttpException(500, 'S3 Upload Failed');
    const dbLinkUpdateStatus = await this.updateQRLinkInDB(uploadLink);
    if (!dbLinkUpdateStatus) return false;
    return true;
  }

  public async qrCodeGenerator(): Promise<Buffer> {
    try {
      const result = await axios.get(this._url);
      const buffer = Buffer.from(result.data);
      return buffer;
    } catch (error) {
      throw new HttpException(500, error.message);
    }
  }

  public async uploadQRToS3(qrBuffer: Buffer): Promise<string> {
    return 'Hrishi';
  }

  public async updateQRLinkInDB(qrLink: string): Promise<boolean> {
    return true;
  }
}
