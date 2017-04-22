import { TravelModelPathSegment } from './travelModelPathSegment.service';
import { ETravelModeType } from '../../interfaces';

export class WalkingModelPathSegment extends TravelModelPathSegment {
  constructor(public map: any, public path: string, public marker: any) {
    super(map, path, ETravelModeType.WALKING, marker);
  }
}
