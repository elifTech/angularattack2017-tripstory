export var google: any;

import { PlanePathSegment } from './planePathSegment.service';
import { FerryPathSegment } from './ferryPathSegment.service';
import { DrivingModelPathSegment } from './drivingModelPathSegment.service';
import { WalkingModelPathSegment } from './walkingModelPathSegment.service';

export class PathScroller {
  protected pathLength: number;
  protected polylines: any;
  protected pathLengths: any;
  protected marker: any;
  protected icons: any;

  constructor(public map:any, public pathPieces:Array<any>) {

    this.icons = { // make this static
      walking: 'walking.png',
      plane: 'plane.png',
      driving: 'driving.png',
      ferry: 'ferry.png',
    };
  }

  public init() {
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.initRoutes();
    this.pathLength = 0;
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
          const path:any = polyline;
          return Math.round(google.maps.geometry.spherical.computeLength(path.getPath().getArray()))
        });
        this.polylines = polylines;
        this.pathLengths = pathLengths;
      });
  }

  moveMarker(fraction) {
    const totalLength = this.pathLengths.reduce((a, b) => a + b, 0);
    console.log(totalLength);
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
    console.log(`totalLength: ${totalLength}, totalPos: ${totalPos}, pos: ${pos}, passedDistance: ${passedDistance}, currPolylineIndex: ${currPolylineIndex - 1}`);
    if (pos > passedDistance) { // this is bad thing, but i dunno how to fix it(
      pos = this.pathLengths[currPolylineIndex - 1];
    }

    const polyline = this.polylines[currPolylineIndex - 1];
    const p = polyline.GetPointAtDistance(pos);
    this.marker.setPosition(p);

    const pathType = this.pathPieces[currPolylineIndex - 1].type;

    this.marker.setIcon(this.icons[pathType]);
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
