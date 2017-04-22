import {
  Component,
  OnInit,
} from '@angular/core';
import { PathScroller } from './services/pathScroller.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  host: {'(window:scroll)': 'onWindowScroll($event)'},
  styleUrls: [
    './preview.component.scss'
  ]
})
export class PreviewComponent implements OnInit {
  public story: any;

  public scroller: PathScroller;

  public ngOnInit() {
    const pathPieces = [
      {
        type: 'walking',
        path: [new google.maps.LatLng(36.966667, 22.716667), new google.maps.LatLng(37.966667, 23.716667)]
      },
      {
        type: 'plane',
        path: [new google.maps.LatLng(37.966667, 23.716667), new google.maps.LatLng(36.966667, 22.716667)]
      },
      {
        type: 'driving',
        path: [new google.maps.LatLng(36.966667, 22.716667), new google.maps.LatLng(36.866667, 22.616667)]
      }
    ];

    const mapStyle = [
      {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#50492e"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "hue": "#ffcc00"
          },
          {
            "saturation": "35"
          },
          {
            "lightness": "1"
          },
          {
            "gamma": "1.00"
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fbf9f1"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#fbf9f1"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#c9f1d9"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
          {
            "saturation": -100
          },
          {
            "lightness": 45
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
          {
            "color": "#46bcec"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      }
    ];

    const startPoint = pathPieces[0].path[0];
    var myOptions = {
      zoom: 5,
      center: startPoint,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: mapStyle
    };

    const map = new google.maps.Map(document.getElementById("map"), myOptions);

    this.scroller = new PathScroller(map, pathPieces);
    this.scroller.init();

    this.story = {
      title: 'The Wild Path',
      subheader: 'AN ICELANDIC ADVENTURE',

      path: [
        {
          type: 'poi',
          location: {
            title: 'REYKJAVÍK'
          },
          story: {
            title: 'The Adventure Begins',
            body: 'We caught glimpses of faces at most of the windows peering curiousl progress through the town.'
          }
        },
        {
          type: 'road',
        }
      ]
    };
  }

  public onWindowScroll(event) {
    function getPageHeight() {
      const body = document.body,
        html = document.documentElement;

      const height = Math.max( body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight );

      return height;
    }

    function getWindowHeight() {
      const w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
//                x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight|| e.clientHeight|| g.clientHeight;

      return y;
    }

    const scrollTop = document.body.scrollTop;
    const pageHeight = getPageHeight() - getWindowHeight();
    const fraction = scrollTop / pageHeight * 100;

    this.scroller.moveMarker(fraction);
  }
}
