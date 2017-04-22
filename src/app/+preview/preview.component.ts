import { WalkingModelPathSegment } from './services/walkingModelPathSegment.service';

import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  styleUrls: [
    './preview.component.scss'
  ]
})
export class PreviewComponent implements OnInit {
  public story:any;

  public ngOnInit() {

    new WalkingModelPathSegment(null, '');
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

}
