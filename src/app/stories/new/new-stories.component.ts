import {
  Component,
  OnInit
} from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ActivatedRoute, Router } from '@angular/router';
import { IStory } from '../../interfaces';
import { StoryRes } from '../../services/stories.resource';
import { UPLOAD_URL, API_URL } from '../../config';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';
import {fromPromise} from 'rxjs/Observable/fromPromise';
import 'rxjs/add/operator/startWith';

@Component({
  selector: 'new-stories',
  styleUrls: [
    './new-stories.component.scss'
  ],
  templateUrl: './new-stories.component.html',
})
export class NewStoriesComponent implements OnInit {
  startPointControl = new FormControl();
  endPointControl = new FormControl();
  startPointOptions: Observable<string[]>;
  startPoint$: Observer<string[]>;
  endPointOptions: Observable<string[]>;
  endPoint$: Observer<string[]>;
  setStartPoint: any;
  setEndPoint: any;

  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({url: UPLOAD_URL});

  public model:IStory = {
    startPoint: {},
    endPoint: {},
    images: []
  };

  constructor(public route: ActivatedRoute, private storyRes: StoryRes, private router: Router) {
  }

  public setStartPointFunc(item) {
    if (!item) {
      return;
    }
    this.model.startPoint = {
      address: item.formatted_address,
      point: {
        lat: item.geometry.location.lat(),
        lng: item.geometry.location.lng()
      }
    };
    return item.formatted_address;
  }
  public setEndPointFunc(item) {
    if (!item) {
      return;
    }
    this.model.endPoint = {
      address: item.formatted_address,
      point: {
        lat: item.geometry.location.lat(),
        lng: item.geometry.location.lng()
      }
    };
    return item.formatted_address;
  }

  public getPointsByAddress(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address' : address }, ( results, status ) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        this.startPoint$.next(results);
      }
    });
  }

  public getPointsByAddress2(address) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address' : address }, ( results, status ) => {
      if( status == google.maps.GeocoderStatus.OK ) {
        this.endPoint$.next(results);
      }
    });
  }

  public ngOnInit() {
    this.startPointOptions = Observable.create(observer => {
      this.startPoint$ = observer;

      this.startPointControl.valueChanges
        .startWith(null)
        .subscribe(val => this.getPointsByAddress(val));
    });
    this.endPointOptions = Observable.create(observer => {
      this.endPoint$ = observer;

      this.endPointControl.valueChanges
        .startWith(null)
        .subscribe(val => this.getPointsByAddress2(val));
    });
    this.setStartPoint = this.setStartPointFunc.bind(this);
    this.setEndPoint = this.setEndPointFunc.bind(this);


    this.uploader.onAfterAddingAll = (items) => {
      items.forEach((file) => {
        file.upload();
      });
    };
    this.uploader.onSuccessItem = (file, item) => {
      try {
        const fileItem = JSON.parse(item);
        fileItem.url = `${API_URL}/` + fileItem.path;
        fileItem.geo = fileItem.geo || {};
        this.model.images.push(fileItem);
      } catch (e) {

      }
    };
  }

  public removeFile(image: any){
    const index = this.model.images.findIndex(item => item._id == image._id);
    if (index !== -1) {
      this.model.images.splice(index, 1);
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public onSubmit() {
    let story = this.storyRes.create(this.model).subscribe((ret: IStory) => {
      this.router.navigate(['/stories/' + ret._id]);
    });
  }
}
