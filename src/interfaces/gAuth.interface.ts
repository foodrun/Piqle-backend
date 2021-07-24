export interface IGAuth {
  name: string;
  user_id: string;
  phone_number: string;
  superAdmin?: boolean;
  role?: {
    isRestaurantAdmin?: boolean;
    restaurantID?: null | string;
    isRestaurantStaff?: boolean;
  };
}
