import { UserTypeEnum } from './user-type.enum.js';

export interface User {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserTypeEnum
}
