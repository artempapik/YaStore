import { CategoryProduct } from "./category-product";

export class Product {
  constructor(
    public id?: number,
    public price?: number,
    public name?: string,
    public description?: string,
    public availability?: boolean,
    public ids?: number[],
    public categoryProducts?: CategoryProduct[]
  ) {}
}
