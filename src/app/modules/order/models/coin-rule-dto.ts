import { CoinType } from "src/app/complex-types";
import { MembershipStatusDto } from "./order.dto";

export interface CoinRuleDto {
  id: number;
  membershipStatusId: number;
  coinType: CoinType;
  coinReward: number;
  membershipStatus: MembershipStatusDto;
}
