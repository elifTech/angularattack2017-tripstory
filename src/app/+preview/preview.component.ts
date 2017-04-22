import {
  Component,
  OnInit,
} from '@angular/core';
import {IStory, EPathSegmentType, ETravelModeType} from "../interfaces";
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
  public story:IStory;

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

    const startPoint = pathPieces[0].path[0];
    var myOptions = {
      zoom: 5,
      center: startPoint,
      scrollwheel: false,
      navigationControl: false,
      mapTypeControl: false,
      scaleControl: false,
      draggable: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    const map = new google.maps.Map(document.getElementById("map"), myOptions);

    this.scroller = new PathScroller(map, pathPieces);
    this.scroller.init();

    this.story = {
      title: 'The Wild Path',
      subheader: 'AN ICELANDIC ADVENTURE',

      path: [
        {
          type: EPathSegmentType.POINT_OF_INTEREST,
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
          type: EPathSegmentType.ROAD,
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
