export var google: any;

export class PathScroller {
  protected pathLength: number;
  protected polylines: any;
  protected pathLengths: any;
  protected marker: any;
  constructor(public map:any, public pathPieces:Array<any>) {
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
      const SegmentTypeInstance = this.getPathSegmentTypeInstance(item.type);
      const pathSegment = new SegmentTypeInstance({ path: item.path, map: this.map });
      return pathSegment.route;
    });
    Promise.all(pathSegments)
      .then(polylines => {
        const pathLengths = polylines.map(
          polyline => Math.round(google.maps.geometry.spherical.computeLength(polyline.getPath().getArray()))
        );
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
    marker.setPosition(p);

    const pathType = this.pathPieces[currPolylineIndex - 1].type;

    marker.setIcon(this.icons[pathType]);
  }

  getPathSegmentTypeInstance(type) {
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
