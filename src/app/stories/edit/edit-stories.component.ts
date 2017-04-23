import {
  Component,
  OnInit, APP_ID
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { IStory } from '../../interfaces';
import { StoryRes } from '../../services/stories.resource';
import { UPLOAD_URL, MAP_STYLES, API_URL } from '../../config';
import { AppState } from '../../app.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import { PathBuilder } from '../../services/pathBuilder.service';

@Component({
  selector: 'edit-stories',
  styleUrls: [
    './edit-stories.component.scss'
  ],
  templateUrl: './edit-stories.component.html'
})
export class EditStoriesComponent implements OnInit {
  private sub: any;

  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({url: UPLOAD_URL});

  public model: IStory = {
    startPoint: {},
    endPoint: {},
    images: []
  };

  // edit public attrs
  pointControl = new FormControl();
  pointOptions: Observable<string[]>;
  point$: Observer<string[]>;
  setPoint: any;

  public coverPhoto;

  public editablePoint = null;

  public map;

  public buildMap(story:IStory, map:any) {
    const builder = new PathBuilder(map, story);
    console.info('buildMap');
    builder.init();
  }

  constructor(public route: ActivatedRoute, private storyRes: StoryRes, private router: Router, public appState: AppState) {
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.info(params);
      this.storyRes.get(params['id']).subscribe((item: IStory) => {
        this.model = item;
        console.info(item);

        if (item.images && item.images.length) {
          this.coverPhoto = `${API_URL}/${item.images[0].path}`;
        }


        const mapStyle = MAP_STYLES;

        if (item.startPoint && item.startPoint.point) {
          const startPoint = item.startPoint.point;

          var startPointView = new google.maps.LatLng(startPoint.lat, startPoint.lng);

          const myOptions = {
            zoom: 12,
            center: startPointView,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: mapStyle
          };
          this.map = new google.maps.Map(document.getElementById("map"), myOptions);
          this.buildMap(item, this.map);
        }
        // this.appState.state.map.setCenter( item.path[0].geometry.location );
        // var marker = new google.maps.Marker( {
        //   map     : this.appState.state.map,
        //   position: item.path[0].geometry.location
        // } );
      });
    });

    this.uploader.onAfterAddingAll = (items) => {
      items.forEach((file) => {
        file.upload();
      });
    };
    this.uploader.onSuccessItem = (file, item) => {
      try {
        const fileItem = JSON.parse(item);
        this.model.images.push(fileItem);
      } catch (e) {

      }
    };
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }


  // ----------------------------------------------------EDIT------------------------------------------------------

  public onSubmit() {
    // const geocoder = new google.maps.Geocoder();
    //
    // geocoder.geocode({'address': this.model.startPoint.address}, (results, status) => {
    //   if (status == google.maps.GeocoderStatus.OK) {
    //     console.info(results)
    //     /*
    //      //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
    //      map.setCenter( results[0].geometry.location );
    //      var marker = new google.maps.Marker( {
    //      map     : map,
    //      position: results[0].geometry.location
    //      } );*/
    //   } else {
    //     // alert( 'Geocode was not successful for the following reason: ' + status );
    //   }
    // });

    let story = this.storyRes.save(this.model).subscribe((ret: IStory) => {
      console.log('is correct', ret._id);
      // this.router.navigate(['/stories/' + ret._id]);
    });
    console.info(story);
  }

  public onEdit(model: any) {
    this.editablePoint = null;
    console.log('MODEL', model);
    this.initEditableForm();
    this.editablePoint = model;
  }

  public onPointHover(point) {
    if(point.location) {
      this.map.setCenter( point.location.point );
    }
  }

  public getPointsByAddress(data) {
    const address = (data && data.address) || '';
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        this.point$.next(results);
      }
    });
  }

  public initEditableForm() {
    this.pointOptions = Observable.create(observer => {
      this.point$ = observer;

      this.pointControl.valueChanges
        .startWith(null)
        .subscribe(val => this.getPointsByAddress(val))
    });

    this.setPoint = this.setPointFunc.bind(this);
  }

  public setPointFunc(item) {
    if (!item) {
      return;
    }
    console.log('----item', item, this.editablePoint);
    this.editablePoint.location.point = {
      lat: item.geometry.location.lat(),
      lng: item.geometry.location.lng()
    };
    // this.model.startPoint = {
    //   address: item.formatted_address,
    //   point: {
    //     lat: item.geometry.location.lat(),
    //     lng: item.geometry.location.lng()
    //   }
    // };
    return item.formatted_address;
  }
}
