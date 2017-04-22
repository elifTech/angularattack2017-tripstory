import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { routes } from './preview.routes';
import { PreviewComponent } from './preview.component';

@NgModule({
  declarations: [
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class PreviewModule {
  public static routes = routes;
}
