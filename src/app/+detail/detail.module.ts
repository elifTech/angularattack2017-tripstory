import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MdGridListModule,
  MdButtonModule, MdListModule, MdInputModule, MdRadioModule } from '@angular/material';

import { routes } from './detail.routes';
import { DetailComponent } from './detail.component';
import { PlaceFormComponent } from './place-form/placeForm.component';
import { FileUploadModule } from 'ng2-file-upload';

console.log('`Detail` bundle loaded asynchronously');

@NgModule({
  declarations: [
    // Components / Directives/ Pipes
    DetailComponent,
    PlaceFormComponent
  ],
  imports: [
    MdGridListModule,
    MdButtonModule,
    MdListModule,
    MdInputModule,
    MdRadioModule,
    FileUploadModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class DetailModule {
  public static routes = routes;
}
