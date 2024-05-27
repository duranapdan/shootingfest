import { UserDto } from "./user.dto";

export interface TokenInfo {
  token: string;
  expiration: string; // or Date if you want to parse it to a Date object later
}

export interface LoginResponseDto {
  accessToken: TokenInfo;
  requiredAuthenticatorType: string | null;
}
