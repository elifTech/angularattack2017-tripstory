import { PlanePathSegment } from './planePathSegment.service';
import { FerryPathSegment } from './ferryPathSegment.service';
import { DrivingModelPathSegment } from './drivingModelPathSegment.service';
import { WalkingModelPathSegment } from './walkingModelPathSegment.service';

import walkingIcon from '../icons/walking.png';
import planeIcon from '../icons/plane.png';
import drivingIcon from '../icons/driving.png';
import ferryIcon from '../icons/ferry.png';

export class PathScroller {
  protected pathLength: number;
  protected polylines: any;
  protected pathLengths: any;
  protected marker: any;
  protected icons: any;

  constructor(public map: any, public pathPieces: Array<any>) {

    this.icons = { // make this static
      walking: walkingIcon,
      plane: planeIcon,
      driving: drivingIcon,
      ferry: ferryIcon,
    };
  }

  public init() {
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.initRoutes();
  }

  public initRoutes() {
    const pathSegments = this.pathPieces.map(item => {
      const SegmentTypeInstance = PathScroller.getPathSegmentTypeInstance(item.type);
      const pathSegment = new SegmentTypeInstance(this.map, item.path);
      return pathSegment.route;
    });
    Promise.all(pathSegments)
      .then(polylines => {
        const pathLengths = polylines.map((polyline) => {
          const path: any = polyline;
          return Math.round(google.maps.geometry.spherical.computeLength(path.getPath().getArray()))
        });
        this.polylines = polylines;
        this.pathLengths = pathLengths;
      });
  }

  moveMarker(fraction) {
    if (!this.pathLengths) {
      return;
    }
    const totalLength = this.pathLengths.reduce((a, b) => a + b, 0);
    // const pathLength = this.pathLengths;
    const totalPos = totalLength * fraction / 100;

    let currPolylineIndex = 0;
    let passedDistance = 0;
    let pos = 0;
    while (totalPos > passedDistance && currPolylineIndex < this.pathLengths.length) {
      passedDistance += this.pathLengths[currPolylineIndex];
      pos = totalPos - passedDistance + this.pathLengths[currPolylineIndex]; // here must be minus previous items
      currPolylineIndex++;
    }
    if (currPolylineIndex <= 0) { // this is bad thing, but i dunno how to fix it(
      currPolylineIndex = 1;
    }
    if (pos > passedDistance) { // this is bad thing, but i dunno how to fix it(
      pos = this.pathLengths[currPolylineIndex - 1];
    }

    // console.log(`pos: ${pos}, passedDistance: ${passedDistance}, currPolylineIndex: ${currPolylineIndex}`);

    const polyline = this.polylines[currPolylineIndex - 1];
    const p = polyline.GetPointAtDistance(pos);
    this.marker.setPosition(p);
    this.map.setCenter(p);

    const pathType = this.pathPieces[currPolylineIndex - 1].type;

    this.marker.setIcon(this.icons[pathType]);


    const segmentTypeInstance = PathScroller.getPathSegmentTypeInstance(pathType);

    const tempPath = [this.pathPieces[currPolylineIndex - 1].path[0], p];

    if (this.tempPolyline) {
      // this.tempPolyline.setMap(null);
      this.tempPolyline.polyline = null;
      this.tempPolyline = null;
    }

    this.tempPolyline = new segmentTypeInstance(this.map, tempPath);
    this.tempPolyline.route
        .then(tempPolylineRoute => {
          tempPolylineRoute.setOptions({strokeOpacity: 0.5, strokeColor: 'green'});
          // this.tempPolyline.setMap(this.map);
        });
  }

  protected static getPathSegmentTypeInstance(type) {
    switch (type) {
      case 'plane':
        return PlanePathSegment;
      case 'ferry':
        return FerryPathSegment;
      case 'driving':
        return DrivingModelPathSegment;
      case 'walking':
        return WalkingModelPathSegment;
    }

    return null;
  }
}
