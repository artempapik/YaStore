import { Purchase } from "./purchase";

export class User {
  constructor(
    public id?: number,
    public login?: string,
    public password?: string,
    public role?: UserRole,
    public purchases?: Purchase[],
    public productId?: number
  ) { }
}
