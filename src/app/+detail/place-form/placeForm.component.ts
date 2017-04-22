import { Component } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

import { Place } from './place';
import { API_URL } from '../../config';

const URL = `${API_URL}/api/upload`;

@Component({
  selector: 'place-form',
  styleUrls: [
    './placeForm.component.css'
  ],
  templateUrl: 'placeForm.component.html',
})
export class PlaceFormComponent {
  private model = new Place('Lviv', 'photo', 'Opera House', 'Long, long time ago...');
  public hasBaseDropZoneOver: boolean = false;

  public uploader: FileUploader = new FileUploader({url: URL});

  public ngOnInit() {
    this.uploader.onAfterAddingAll = (items) => {
      items.forEach((file) => {
        file.upload();
      });
    }
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
