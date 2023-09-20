export interface UsernameModel {
  username: string;
}
export interface UserModel {
  id: number;
  username: string;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
}
export interface ProfileModel extends UsernameModel {
  id: number;
  last_login: string;
  first_name: string;
  last_name: string;
  dlNumber: string;
  national_code: string;
  bourse_account_name: string;
  bank_account_id: number;
  customer_id: number;
  city_id: number;
  father_name: string;
  email_address: string;
  status: "فعال" | "غیرفعال";
  creation_date: string;
  birth_date: string;
  address: string;
  postal_code: string;
  registeration_number: string;
  account_number: string;
  sex_type_name: "female" | "male";
  province_code: string;
  province_name: string;
  city_code: string;
  city_name: string;
  bank_account_number: string;
  shaba_number: string;
  bank_name: string;
  customer_identity: string;
  birthcertificationnumber: string;
  referral_code: string;
  comex_visitor_id: string;
  referred_by: string;
  branch_name: string;
  is_active: boolean;
  is_superuser: boolean;
  is_admin: boolean;
  admin_role: string;
  block_status: string;
  mobile: string;
  groups: string[];
  user_permissions: string[];
  score: number;
}

export interface ReferralModel {
  referral_id: string | number;
  referral_code: string;
  date: string;
  user: ProfileModel;
}

export interface ReferralReportModel extends ReferralModel {
  referral_code_id: string | number;
  referrer: string;
  referrer_dlNumber: string;
  referree: string;
}

export interface ScoreModel {
  score_id: string | number;
  title: string;
  content: string;
  score: string | number;
  date: string;
  user: ProfileModel;
}

export interface PermissionModel {
  include: string[];
  exclude: string[];
}
