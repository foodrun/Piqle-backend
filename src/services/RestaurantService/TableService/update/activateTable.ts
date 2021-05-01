import { otpService } from '../../../otp.service';

class ActivateTableService {
  async activateTable(restaurantID: string, tableID: number): unknown {
    const activateResult = await this.updateUniqueCodeInRestaurantTableCollection(restaurantID, tableID, otpService.generateUniqueCode());
    return activateResult;
  }

  private async updateUniqueCodeInRestaurantTableCollection(restaurantID: string, tableID: string, uniquelyGeneratedCode: number) {
    return { restaurantID, tableID, uniquelyGeneratedCode };
  }
}

export const activateTableService = new ActivateTableService();
