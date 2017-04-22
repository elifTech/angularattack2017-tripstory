export var google: any;
import { PathSegment } from './pathSegment.service';

export class FerryPathSegment extends PathSegment {
  constructor(public map:any, public path:string) {
    super(map, path);
  }

  get route() {
    return new Promise((resolve, reject) => {
      resolve(new google.maps.Polyline({
        path: this.path,
        geodesic: false,
        map: this.map
      }));
    });
  }
}
