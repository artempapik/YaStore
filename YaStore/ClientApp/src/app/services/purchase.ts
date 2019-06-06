import { User } from "./user";

export class Purchase {
  constructor(
    public id?: number,
    public product?: number,
    public userId?: number,
    public user?: User
  ) {}
}
