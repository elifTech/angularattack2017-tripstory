import {
  Component,
  OnInit,
} from '@angular/core';
/*
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */

console.log('`Detail` component loaded asynchronously');

@Component({
  selector: 'detail',
  styleUrls: [
    './detail.component.css'
  ],
  template: `
    <div class="addPlacesContainer">
      <div class="places">
        <div class="addPlaceBtnContainer">
          <button md-button color="primary">Add place</button>
        </div>      
        <md-list>
         <md-list-item> Pepper </md-list-item>
         <md-list-item> Salt </md-list-item>
         <md-list-item> Paprika </md-list-item>
        </md-list>
      </div>
      <div class="options">
        <div>
          <place-form></place-form>
        </div>
      </div>
    </div>
  `,
})
export class DetailComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Detail` component');
  }

}
