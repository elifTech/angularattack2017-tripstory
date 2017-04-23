import {
  Component,
  OnInit,
} from '@angular/core';
import {IStory, EPathSegmentType, ETravelModeType} from "../interfaces";
import {PREVIEW_MAP_STYLES} from "../config";
import { PathScroller } from '../services/pathScroller.service';
import { StoryRes } from '../services/stories.resource';
import { ActivatedRoute } from '@angular/router';

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

  public model: IStory = {
    startPoint: {},
    endPoint: {},
    images: []
  };

  constructor(private route: ActivatedRoute, private storyRes: StoryRes) {
  }

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
    
    this.sub = this.route.params.subscribe(params => {
      this.storyRes.get(params['id']).subscribe((item: IStory) => {
        this.model = item;

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
