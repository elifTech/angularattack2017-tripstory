import { ETravelModeType } from '../../interfaces';
import { PathSegment } from './pathSegment.service';
import { PathScroller } from './pathScroller.service';

export class TravelModelPathSegment extends PathSegment {
  public polyline: any;
  public directionDisplay: any;

  constructor(public map: any, public path: string, public travelMode: ETravelModeType, public marker: any) {
    super(map, path, marker, travelMode);

    this.polyline = null;
  }

  get route() {
    this.directionDisplay = null;

    const directionsService = new google.maps.DirectionsService();

    const request = {
      origin: this.path[0],
      destination: this.path[1],
      travelMode: ETravelModeType[this.travelMode]
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

          const polyline = new google.maps.Polyline({
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

  moveMarker(fraction) {
    const pathLength = Math.round(google.maps.geometry.spherical.computeLength(this.polyline.getPath().getArray()));
    const pos = pathLength * fraction / 100;

    const p = this.polyline.GetPointAtDistance(pos);

    this.marker.setPosition(p);
    this.map.setCenter(p);
    this.marker.setIcon(PathScroller.icons[this.travelMode]);
  }
}
