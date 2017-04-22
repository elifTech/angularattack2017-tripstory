import { TravelModelPathSegment } from './travelModelPathSegment.service';
import { ETravelModeType } from '../../interfaces';

export class DrivingModelPathSegment extends TravelModelPathSegment {
  constructor (public map:any, public path:string) {
    super(map, path, ETravelModeType.DRIVING);
  }
}
