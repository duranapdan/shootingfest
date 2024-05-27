import { MembershipStatusDto } from "../../order/models/order.dto";
import { PermissionDto } from "./permission.dto";
import { RoleDto } from "./role.dto";

export interface UserDto {
  id: number;
  language: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: RoleDto;
  permissions: Array<PermissionDto>;

  shortName: string;
  payerUser: boolean;
  phoneNumber: string;
  membershipStatusId: number;
  membershipStatus: MembershipStatusDto;
  suspended: boolean;

  companyId: 1
  culture: string;

  phoneNumberCountryCode: string;
}
