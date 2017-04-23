import { TravelModelPathSegment } from './travelModelPathSegment.service';

export class DrivingModelPathSegment extends TravelModelPathSegment {
  constructor(public map: any, public path: string, public marker: any) {
    super(map, path, 'driving', marker);
  }
}
