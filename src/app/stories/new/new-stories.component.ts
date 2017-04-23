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
  selector: 'new-stories',
  styles: [`
  `],
  templateUrl: './new-stories.component.html'
})
export class NewStoriesComponent implements OnInit {
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

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onSubmit() {
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address' : this.model.startPoint.address }, ( results, status ) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        console.info(results);
      }
    } );

    let story = this.storyRes.create(this.model).subscribe((ret: IStory) => {
      this.router.navigate(['/stories/' + ret._id]);
    });
  }
}
