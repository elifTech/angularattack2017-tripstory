import { ICONS } from '../config';
import { PlanePathSegment } from './planePathSegment.service';
import { FerryPathSegment } from './ferryPathSegment.service';
import { DrivingModelPathSegment } from './drivingModelPathSegment.service';
import { WalkingModelPathSegment } from './walkingModelPathSegment.service';

export class PathScroller {
  protected pathLength: number;
  protected polylines: any;
  public pathLengths: any;
  protected marker: any;
  public pathSegments: any;

  constructor(public map: any, public pathPieces: Array<any>) {
  }

  public init() {
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.initRoutes();
    this.marker.setIcon(ICONS[this.pathPieces[0].type]);
    this.marker.setPosition(this.pathPieces[0].start);
  }

  public initRoutes() {
    this.pathSegments = this.pathPieces.map(item => {
      const SegmentTypeInstance = PathScroller.getPathSegmentTypeInstance(item.travelType);
      return new SegmentTypeInstance(this.map, [item.start, item.end], this.marker);
    });

    const pathSegmentsRoutes = this.pathSegments.map(pathSegment => pathSegment.route);

    Promise.all(pathSegmentsRoutes)
      .then(polylines => {
        const pathLengths = polylines.map((polyline) => {
          const path: any = polyline;
          return Math.round(google.maps.geometry.spherical.computeLength(path.getPath().getArray()))
        });
        this.polylines = polylines;
        this.pathLengths = pathLengths;
      });
  }

  public static getPathSegmentTypeInstance(type) {
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
