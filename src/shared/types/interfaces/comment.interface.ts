import { User } from './user.interface.js';

export interface Comment {
  text: string;
  postDate: Date;
  rating: number;
  author: User;
}
