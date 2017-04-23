import _ from 'lodash';
import { PlanePathSegment } from './planePathSegment.service';
import { FerryPathSegment } from './ferryPathSegment.service';
import { DrivingModelPathSegment } from './drivingModelPathSegment.service';
import { WalkingModelPathSegment } from './walkingModelPathSegment.service';
import { ICONS } from '../config';
import { IStory } from '../interfaces';
import { MarkerModelPathSegment } from './markerModelPathSegment.service';

export class PathBuilder {
  protected pathLength: number;
  protected polylines: any;
  public pathLengths: any;
  protected marker: any;
  public pathSegments: any;

  constructor(public map: any, public story: IStory) {
  }

  public init() {
    if (this.story.path.length) {
      this.story.path[0].start = this.story.startPoint.point;
      this.story.path[this.story.path.length - 1].end = this.story.endPoint.point;
    }

    this.pathSegments = this.story.path.map(item => {
      const marker = new google.maps.Marker({
        map: this.map
      });

      if (item.pathType == 'poi') {
        marker.setPosition(item.location.point);
        return new MarkerModelPathSegment(this.map, item, marker, null);
      } else {
        marker.setPosition(item.start);

        const SegmentTypeInstance = PathBuilder.getPathSegmentTypeInstance(item.travelType);
        SegmentTypeInstance.editMode = true;
        return new SegmentTypeInstance(this.map, [item.start || null, item.end || null], marker);
      }
    });

    const marker = new google.maps.Marker({
      map: this.map
    });
    marker.setPosition(this.story.endPoint.point);

    const pathSegmentsRoutes = this.pathSegments.map(pathSegment => pathSegment.route);

    Promise.all(pathSegmentsRoutes)
      .then(polylines => {
        console.info(polylines);
        const pathLengths = polylines.map((polyline) => {
          if (!polyline) {
            return;
          }
          const path: any = polyline;
          return Math.round(google.maps.geometry.spherical.computeLength(path.getPath().getArray()))
        });
        this.polylines = polylines;
        this.pathLengths = pathLengths;
      }, err => {
        console.info(err);
      });
  }

  public static getPathSegmentTypeInstance(type):any {
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
