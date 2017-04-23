import {PathScroller} from "./pathScroller.service";
import {ETravelModeType} from "../../interfaces";
export class PathSegment {
  constructor(public map: any, public path: string, public marker: any, public travelMode: ETravelModeType) {
  }

  moveMarker(fraction) {
    const pos = google.maps.geometry.spherical.interpolate(this.path[0], this.path[1], fraction/100);
    this.marker.setPosition(pos);
    this.map.panTo(pos);
    this.map.setCenter(pos);
    this.marker.setIcon(PathScroller.icons[this.travelMode]);
  }
}
