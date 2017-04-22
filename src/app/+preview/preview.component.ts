export var google: any;

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
  public story:any;

  public ngOnInit() {

    console.info(google);
    if (google) {
    const pathPieces = [
      {type: 'walking', path: [new google.maps.LatLng(36.966667, 22.716667), new google.maps.LatLng(37.966667, 23.716667)]},
      {type: 'plane', path: [new google.maps.LatLng(37.966667, 23.716667), new google.maps.LatLng(36.966667, 22.716667)]},
      {type: 'driving', path: [new google.maps.LatLng(36.966667, 22.716667), new google.maps.LatLng(36.866667, 22.616667)]},
    ];

    const startPoint = pathPieces[0].path[0];
      var myOptions = {
        zoom: 5,
        center: startPoint,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      const map = new google.maps.Map(document.getElementById("map"), myOptions);

      const scroller = new PathScroller(map, pathPieces);
    }
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
            body: 'We caught glimpses of faces at most of the windows peering curiously at us and watching our progress through the town.'
          }
        },
        {
          type: 'road',
        }
      ]
    };

    console.log('hello `Barrel` component');
  }

  public onWindowScroll(event) {
    console.info('scroll', event);
  }
}
