import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import {
  RentOffer,
  User,
  CitiesEnum,
  HousingTypeEnum,
  AmenitiesEnum,
  UserTypeEnum,
  CoordinatesType,
} from '../../types/index.js';

function splitStrBySemiColon(str: string): string[] {
  return str.split(';');
}

function parseStrToBoolean(str: string): boolean {
  return str === 'true';
}

function parseStrToNumber(str: string): number {
  return Number.parseInt(str, 10);
}

function parseStrToFloat(str: string): number {
  return parseFloat(str);
}

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  private validateRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read');
    }
  }

  private parseRawDataToRentOffers(): RentOffer[] {
    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => this.parseLineToOffer(line));
  }

  private parseLineToOffer(line: string): RentOffer {
    const [
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
      userName,
      userEmail,
      userAvatar, //need to handle what will be if there is no avatar
      userPassword,
      userType,
      commentsCount,
      coordinates,
    ] = line.split('\t');

    return {
      title,
      description,
      postDate: new Date(postDate),
      city: city as CitiesEnum,
      previewImage,
      images: splitStrBySemiColon(images),
      isPremium: parseStrToBoolean(isPremium),
      isFavorite: parseStrToBoolean(isFavorite),
      rating: parseStrToNumber(rating),
      housingType: housingType as HousingTypeEnum,
      roomsCount: parseStrToNumber(roomsCount),
      guestsCount: parseStrToNumber(guestsCount),
      rentPrice: parseStrToNumber(rentPrice),
      amenities: splitStrBySemiColon(amenities) as AmenitiesEnum[],
      author: this.parseUser(
        userName,
        userEmail,
        userPassword,
        userType,
        userAvatar
      ),
      commentsCount: parseStrToNumber(commentsCount),
      coordinates: this.parseCoordinaties(coordinates),
    };
  }

  private parseCoordinaties(coordinatesStr: string): CoordinatesType {
    const [latitude, longitude] = splitStrBySemiColon(coordinatesStr);
    return {
      latitude: parseStrToFloat(latitude),
      longitude: parseStrToFloat(longitude)
    };
  }

  private parseUser(
    name: string,
    email: string,
    password: string,
    type: string,
    avatar?: string
  ): User {
    return {
      name,
      email,
      avatar,
      password,
      type: type as UserTypeEnum,
    };
  }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): RentOffer[] {
    this.validateRawData();
    return this.parseRawDataToRentOffers();
  }
}
