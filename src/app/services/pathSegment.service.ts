import {ICONS} from "../config";

export class PathSegment {
  public editMode: boolean = false;
  
  constructor(public map: any, public path: string, public marker: any, public travelMode: string) {
  }

  moveMarker(fraction) {
    const pos = google.maps.geometry.spherical.interpolate(this.path[0], this.path[1], fraction/100);
    this.marker.setPosition(pos);
    this.map.panTo(pos);
    this.map.setCenter(pos);
    this.marker.setIcon(ICONS[this.travelMode]);
  }
}
