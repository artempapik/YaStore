import { Injectable } from "@angular/core";

@Injectable()
export class ShareDataService {
  userName: string;
  userId: number;
  isAdmin: boolean;
  categoryType: CategoryType;
  categoryId: number;
  productId: number;
}
