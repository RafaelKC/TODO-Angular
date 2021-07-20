import {User} from "./User";

export interface  LoginResponse {
  "user": User | null;
  "token"?: string | null;
  "valid"?: boolean | null;
}
