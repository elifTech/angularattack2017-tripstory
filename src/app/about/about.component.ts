import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html'
})
export class AboutComponent implements OnInit {

  constructor(
    public router: Router
  ) {}

  public ngOnInit() {
  }

  public routeIsActive(routePath: string)
  {
    return this.router.url === routePath;
  }
}
