import { Category } from "./category";
import { Product } from "./product";

export class CategoryProduct {
  constructor(
    public categoryId?: number,
    public category?: Category,
    public productId?: number,
    public product?: Product
  ) {}
}
