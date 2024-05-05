import { CitiesEnum } from './cities.enum.js';
import { CoordinatesType } from './coordinates.type.js';

export type CityType = { //Dosnt need yet
  name: CitiesEnum;
  coordinates: CoordinatesType;
};
