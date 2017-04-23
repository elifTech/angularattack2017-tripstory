import { PathSegment } from './pathSegment.service';
import {ETravelModeType} from "../../interfaces";

export class PlanePathSegment extends PathSegment {
  constructor(public map: any, public path: string, public marker: string) {
    super(map, path, marker, ETravelModeType.PLANE);
  }

  get route() {
    return new Promise((resolve, reject) => {
      resolve(new google.maps.Polyline({
        path: this.path,
        geodesic: true,
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
