import { PathSegment } from './pathSegment.service';
import {ETravelModeType} from "../interfaces";

export class FerryPathSegment extends PathSegment {
  constructor(public map: any, public path: string, public marker: any) {
    super(map, path, marker, ETravelModeType.FERRY);
  }

  get route() {
    return new Promise((resolve, reject) => {
      resolve(new google.maps.Polyline({
        path: this.path,
        geodesic: false,
        map: this.map,
        strokeOpacity: 0,
        icons: [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 0.5,
            scale: 2
          },
          offset: '0',
          repeat: '20px'
        }],
      }));
    });
  }
}
