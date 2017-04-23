import {
  Component,
  OnInit
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { IStory } from '../../interfaces';
import { StoryRes } from '../../services/stories.resource';
import { UPLOAD_URL } from '../../config';

@Component({
  selector: 'edit-stories',
  styles: [`
  `],
  templateUrl: './edit-stories.component.html'
})
export class EditStoriesComponent implements OnInit {
  private sub: any;

  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({url: UPLOAD_URL});

  public model:IStory = {
    startPoint: {},
    endPoint: {},
    images: []
  };

  constructor(public route: ActivatedRoute, private storyRes: StoryRes, private router: Router) {
  }

  public ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.info(params);
      this.storyRes.get(params['id']).subscribe((item: IStory) => {
        this.model = item;
        console.info(item)
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

  public onSubmit() {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address' : this.model.startPoint.address }, ( results, status ) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        console.info(results)
/*
        //In this case it creates a marker, but you can get the lat and lng from the location.LatLng
        map.setCenter( results[0].geometry.location );
        var marker = new google.maps.Marker( {
          map     : map,
          position: results[0].geometry.location
        } );*/
      } else {
       // alert( 'Geocode was not successful for the following reason: ' + status );
      }
    } );

    let story = this.storyRes.create(this.model).subscribe((ret: IStory) => {
      this.router.navigate(['/stories/' + ret._id]);
    });
    console.info(story);
  }

  public onChangeAddress
}
