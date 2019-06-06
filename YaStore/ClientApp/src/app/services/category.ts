import { CategoryProduct } from "./category-product";

export class Category {
  constructor(
    public id?: number,
    public name?: string,
    public type?: CategoryType,
    public categoryProducts?: CategoryProduct[]
  ) { }
}
