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
  public pathLengths: any;
  protected marker: any;
  public pathSegments: any;

  public static icons = {
    walking: walkingIcon,
    plane: planeIcon,
    driving: drivingIcon,
    ferry: ferryIcon,
  };

  constructor(public map: any, public pathPieces: Array<any>) {
  }

  public init() {
    this.marker = new google.maps.Marker({
      map: this.map
    });
    this.initRoutes();
    this.marker.setIcon(PathScroller.icons[this.pathPieces[0].type]);
    this.marker.setPosition(this.pathPieces[0].path[0]);
  }

  public initRoutes() {
    this.pathSegments = this.pathPieces.map(item => {
      const SegmentTypeInstance = PathScroller.getPathSegmentTypeInstance(item.type);
      return new SegmentTypeInstance(this.map, item.path, this.marker);
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
