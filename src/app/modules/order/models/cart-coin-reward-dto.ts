import { CoinRuleDto } from "./coin-rule-dto";
import { MembershipStatusDto } from "./order.dto";

export interface CartCoinRewardDto {
  mmmbershipStatusId: number;
  membershipStatusName: number;
  coinReward: number;
  membershipStatus: MembershipStatusDto;
  coinRule: Array<CoinRuleDto>;
}
