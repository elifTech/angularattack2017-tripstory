import { TravelModelPathSegment } from './travelModelPathSegment.service';

export class WalkingModelPathSegment extends TravelModelPathSegment {
  constructor(public map: any, public path: any[], public marker: any) {
    super(map, path, 'walking', marker);
  }
}
