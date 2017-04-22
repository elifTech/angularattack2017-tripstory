import { WalkingModelPathSegment } from './services/walkingModelPathSegment.service';

import {
  Component,
  OnInit,
} from '@angular/core';
import {IStory, EPathSegmentType, ETravelModeType} from "../interfaces";

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: [
    './preview.component.scss'
  ]
})
export class PreviewComponent implements OnInit {
  public story:IStory;

  public ngOnInit() {

    new WalkingModelPathSegment(null, '');
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
            body: 'We caught glimpses of faces at most of the windows peering curiously at us and watching our progress through the town.'
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

    console.log('hello `Barrel` component');
  }

}
