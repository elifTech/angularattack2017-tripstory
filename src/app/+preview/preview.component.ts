import {
  Component,
  OnInit,
} from '@angular/core';
import {IStory} from "../interfaces";
import {PREVIEW_MAP_STYLES} from "../config";
import { PathScroller } from '../services/pathScroller.service';
import { StoryRes } from '../services/stories.resource';
import { ActivatedRoute } from '@angular/router';
import {API_URL} from '../config';

@Component({
  selector: 'preview',
  templateUrl: './preview.component.html',
  host: {'(window:scroll)': 'onWindowScroll($event)'},
  styleUrls: [
    './preview.component.scss'
  ]
})
export class PreviewComponent implements OnInit {
  private sub: any;
  public story:IStory;

  public scroller: PathScroller;

  private sections: any;
  private sectionsBounds: any;
  private API_URL:string = API_URL;

  public model: IStory = {
    startPoint: {},
    endPoint: {},
    images: []
  };

  constructor(private route: ActivatedRoute, private storyRes: StoryRes) {
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.storyRes.get(params['id']).subscribe((item: IStory) => {
        this.model = item;

        this.model.path[0].start = this.model.startPoint.point;
        this.model.path[this.model.path.length - 1].end = this.model.endPoint.point;

        const pathPieces = this.model.path.filter(item => item.pathType === 'road' || item.pathType === 'path');

        const startPoint = pathPieces[0].start;

        setTimeout(() => {
          this.sections = Array.from(document.querySelectorAll('.point'));
          this.sectionsBounds = this.sections.map(section => {
            const bounds = section.getBoundingClientRect();
            // console.info(bounds, section.offsetHeight);
            return {
              top:bounds.top,
              bottom:bounds.bottom,
              left:bounds.left,
              right:bounds.right,
              height:bounds.height,
              width:bounds.width,
            }
          });

          console.log(this.scroller.pathSegments);
          console.log(this.sectionsBounds);
        }, 1000);


        // this.story = {
        //   title: 'The Wild Path',
        //   subheader: 'AN ICELANDIC ADVENTURE',
        //
        //   path: [
        //     {
        //       pathType: EPathSegmentType.POINT_OF_INTEREST,
        //       location: {
        //         title: 'REYKJAVÍK',
        //         point: {
        //           lat: 55.5,
        //           lng: 34.2
        //         }
        //       },
        //       story: {
        //         title: 'The Adventure Begins',
        //         body: 'We caught glimpses of faces at most of the windows peering curiousl progress through the town.'
        //       }
        //     },
        //     {
        //       pathType: EPathSegmentType.ROAD,
        //       travelType: ETravelModeType.WALKING,
        //       start: {
        //         lat: 55.5,
        //         lng: 34.2
        //       },
        //       end: {
        //         lat: 56.5,
        //         lng: 35.2
        //       }
        //     }
        //   ]
        // };

        var myOptions = {
          zoom: 8,
          center: startPoint,
          scrollwheel: false,
          navigationControl: false,
          mapTypeControl: false,
          scaleControl: false,
          draggable: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          styles: PREVIEW_MAP_STYLES
        };

        const map = new google.maps.Map(document.getElementById("map"), myOptions);

        this.scroller = new PathScroller(map, pathPieces);
        this.scroller.init();
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public onWindowScroll(event) {
    const scrollTop = document.body.scrollTop;
    let currentSectionIndex;
    let currentSection;
    let fraction;
    this.sectionsBounds.forEach((item, index) => {
       console.log(`${index}: item.top: ${item.top}, item.bottom: ${item.top + item.height}, scrollTop: ${scrollTop}`);
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
      console.info('moveMarker', currentSectionIndex, fraction)
      this.scroller.pathSegments[currentSectionIndex].moveMarker(fraction);
    }
  }
}
