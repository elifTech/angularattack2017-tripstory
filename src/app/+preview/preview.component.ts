import {
  Component,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'preview',
  template: `
    <h1>Hello from Barrel</h1>
    <span>
      <a [routerLink]=" ['./child-barrel'] ">
        Child Barrel
      </a>
    </span>
    <router-outlet></router-outlet>
  `,
  styleUrls: [
    './preview.component.scss'
  ]
})
export class PreviewComponent implements OnInit {

  public ngOnInit() {
    console.log('hello `Barrel` component');
  }

}
