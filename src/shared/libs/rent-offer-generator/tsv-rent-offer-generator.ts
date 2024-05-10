import dayjs from 'dayjs';
import { RentOfferGenerator } from './rent-offer-generator.interface.js';
import { AmenitiesEnum, CitiesEnum, HousingTypeEnum, UserTypeEnum } from '../../types/index.js';
import {
  generateRandomValue,
  generateRandomBooleanValue,
  getRandomItem,
  getRandomItems,
  getCityCoordinates,
} from '../../helpers/index.js';
import { MockServerData } from '../../types/mock-server-data.type.js';

const MIN_RENT_PRICE = 1;
const MAX_RENT_PRICE = 100000;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOMS_COUNT = 1;
const MAX_ROOMS_COUNT = 8;

const MIN_GUESTS_COUNT = 1;
const MAX_GUESTS_COUNT = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVRentOfferGenerator implements RentOfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem<string>(Object.values(CitiesEnum));
    const coordinates = getCityCoordinates(city as CitiesEnum);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItem<string[]>(this.mockData.images).join(';');
    const isPremium = generateRandomBooleanValue().toString();
    const isFavorite = generateRandomBooleanValue().toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING).toString();
    const housingType = getRandomItem<string>(Object.values(HousingTypeEnum));
    const roomsCount = generateRandomValue(MIN_ROOMS_COUNT, MAX_ROOMS_COUNT).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS_COUNT, MAX_GUESTS_COUNT).toString();
    const rentPrice = generateRandomValue(MIN_RENT_PRICE, MAX_RENT_PRICE).toString();
    const amenities = getRandomItems<string>(Object.values(AmenitiesEnum)).join(';');
    const authorName = getRandomItem<string>(this.mockData.usersNames);
    const authorEmail = getRandomItem<string>(this.mockData.usersEmails);
    const authorAvatar = getRandomItem<string>(this.mockData.usersAvatars);
    const authorPassword = getRandomItem<string>(this.mockData.usersPasswords);
    const authorType = getRandomItem<string>(Object.values(UserTypeEnum));
    const commentsCount = '0';
    return [
      title,
      description,
      postDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      housingType,
      roomsCount,
      guestsCount,
      rentPrice,
      amenities,
      authorName,
      authorEmail,
      authorAvatar,
      authorPassword,
      authorType,
      commentsCount,
      [coordinates.latitude.toString(), coordinates.longitude.toString()].join(';'),
    ].join('\t');
  }
}
