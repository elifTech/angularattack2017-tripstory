import { PathSegment } from './pathSegment.service';

export class PlanePathSegment extends PathSegment {
  constructor(public map: any, public path: any[], public marker: string) {
    super(map, path, marker, 'plane');
  }

  get route() {
    return new Promise((resolve, reject) => {
      resolve(new google.maps.Polyline({
        path: this.path,
        geodesic: true,
        map: this.map,
        strokeColor: "#FF0000"
      }));
    });
  }
}
