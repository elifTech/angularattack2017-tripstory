import {
  Component,
  OnInit,
} from '@angular/core';
import {IStory, EPathSegmentType, ETravelModeType} from "../interfaces";
import { PathScroller } from '../services/pathScroller.service';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  host: {'(window:scroll)': 'onWindowScroll($event)'},
  styleUrls: [
    './preview.component.scss'
  ]
})
export class PreviewComponent implements OnInit {
  public story:IStory;

  public scroller: PathScroller;

  private sections: any;
  private sectionsBounds: any;

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
      zoom: 8,
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
          pathType: EPathSegmentType.POINT_OF_INTEREST,
          location: {
            title: 'REYKJAVÍK',
            point: {
              lat: 55.5,
              lng: 34.2
            }
          },
          story: {
            title: 'The Adventure Begins',
            body: 'We caught glimpses of faces at most of the windows peering curiousl progress through the town.'
          }
        },
        {
          pathType: EPathSegmentType.ROAD,
          travelType: ETravelModeType.WALKING,
          start: {
            lat: 55.5,
            lng: 34.2
          },
          end: {
            lat: 56.5,
            lng: 35.2
          }
        }
      ]
    };

    this.sections = Array.from(document.querySelectorAll('.point'));
    this.sectionsBounds = this.sections.map(section => {
      const bounds = section.getBoundingClientRect();
      return {
        top:bounds.top,
        bottom:bounds.bottom,
        left:bounds.left,
        right:bounds.right,
        height:bounds.height,
        width:bounds.width,
      }
    });
  }

  public onWindowScroll(event) {
    const scrollTop = document.body.scrollTop;
    let currentSectionIndex;
    let currentSection;
    let fraction;
    this.sectionsBounds.forEach((item, index) => {
      // console.log(`${index}: item.top: ${item.top}, item.bottom: ${item.top + item.height}, scrollTop: ${scrollTop}`);
      if (scrollTop >= (item.top) && scrollTop <= (item.top + item.height)) {
        currentSectionIndex = index;
        //  - this.sectionsBounds[0].topg
      }
    });

    if (currentSectionIndex !== undefined) {
      currentSection = this.sectionsBounds[currentSectionIndex];
      fraction = (scrollTop) / (currentSection.top + currentSection.height) * 100;
    }

    console.log(`currentSectionIndex: ${currentSectionIndex}, fraction: ${fraction}`);

    if (currentSectionIndex !== undefined && fraction) {
      this.scroller.pathSegments[currentSectionIndex].moveMarker(fraction);
    }
  }
}
