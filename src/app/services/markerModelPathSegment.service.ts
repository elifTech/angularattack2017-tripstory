import { ICONS } from '../config';
import { PathSegment } from './pathSegment.service';
import { PathScroller } from './pathScroller.service';

export class MarkerModelPathSegment extends PathSegment {
  get route() {
    return new Promise((resolve, reject) => {
      resolve(null);
    });
  }
}
