import { CoordinatesType } from './coordinates.type.js';
import { AmenitiesEnum } from './amenities.enum.js';
import { CitiesEnum } from './cities.enum.js';
import { HousingTypeEnum } from './housing-type.enum.js';
import { User } from './user.interface.js';

export interface RentOffer {
  title: string;
  description: string;
  postDate: Date;
  city: CitiesEnum;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingTypeEnum;
  roomsCount: number;
  guestsCount: number;
  rentPrice: number;
  amenities: AmenitiesEnum[];
  author: User;
  commentsCount: number;
  coordinates: CoordinatesType
}
