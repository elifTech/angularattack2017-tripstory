import { ICONS } from '../config';
import { PathSegment } from './pathSegment.service';
import { PathScroller } from './pathScroller.service';

export class TravelModelPathSegment extends PathSegment {
  public polyline: any;
  public directionDisplay: any;

  constructor(public map: any, public path: any[], public travelMode: string, public marker: any) {
    super(map, path, marker, travelMode);

    this.polyline = null;
  }

  get route() {
    this.directionDisplay = null;

    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: this.path[0],
      destination: this.path[1],
      travelMode: this.travelMode.toUpperCase()
    };

    return new Promise((resolve, reject) => {
      const rendererOptions = {
        map: this.map,
        suppressMarkers: true,
        preserveViewport: true
      };

      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          const route = response.routes[0];
          const startLocation: any = {};
          const endLocation: any = {};

          let polyline = null;
          if (this.editMode) {
            polyline = new google.maps.Polyline({
              path: [],
              strokeOpacity: 0,
              map: this.map,
              icons: [{
                icon: {
                  path: 'M 0,-1 0,1',
                  strokeOpacity: 0.5,
                  scale: 2
                },
                offset: '0',
                repeat: '20px'
              }],
            });
          } else {
            polyline = new google.maps.Polyline({
              path: [],
              strokeColor: "#FF0000",
              map: this.map
            });
          }

          // For each route, display summary information.
          const legs = route.legs;

          // this.directionDisplay = new google.maps.DirectionsRenderer(rendererOptions);
          // this.directionDisplay.setMap(this.map);
          // this.directionDisplay.setDirections(response);

          // Markers
          for (let i = 0; i < legs.length; i++) {
            if (i === 0) {
              startLocation.latlng = legs[i].start_location;
              startLocation.address = legs[i].start_address;
            }
            endLocation.latlng = legs[i].end_location;
            endLocation.address = legs[i].end_address;
            const steps = legs[i].steps;

            for (let j = 0, nextSegment; j < steps.length; j++) {
              nextSegment = steps[j].path;

              for (let k = 0; k < nextSegment.length; k++) {
                polyline.getPath().push(nextSegment[k]);
              }

            }
          }

          polyline.setMap(this.map);
          resolve(polyline);
        } else {
          reject('Directions request failed: ' + status);
        }
      });
    }).then((polyline) => {
      this.polyline = polyline;
      return polyline;
    });
  }

  GetPointAtDistance(polyline, metres) {
    console.info(polyline)
    // some awkward special cases
    if (metres == 0) return polyline.getPath().getAt(0);
    if (metres < 0) return null;
    if (polyline.getPath().getLength() < 2) return null;
    var dist=0;
    var olddist=0;
    for (var i=1; (i < polyline.getPath().getLength() && dist < metres); i++) {
      olddist = dist;
      dist += polyline.getPath().getAt(i).distanceFrom(polyline.getPath().getAt(i-1));
    }
    if (dist < metres) {
      return null;
    }
    var p1= polyline.getPath().getAt(i-2);
    var p2= polyline.getPath().getAt(i-1);
    var m = (metres-olddist)/(dist-olddist);
    return new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
  }

  moveMarker(fraction) {
    // const pathLength = Math.round(google.maps.geometry.spherical.computeLength(this.polyline.getPath().getArray()));
    const pathLength = Math.round(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.path[0]), new google.maps.LatLng(this.path[1])));
    const pos = pathLength * fraction / 100;

    const p = this.GetPointAtDistance(this.polyline, pos);

    this.marker.setPosition(p);
    this.map.setCenter(p);
    this.marker.setIcon(ICONS[this.travelMode]);
  }
}
