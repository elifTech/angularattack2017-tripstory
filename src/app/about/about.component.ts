import {
  Component,
  OnInit
} from '@angular/core';
import { AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'about',
  templateUrl: 'about.component.html',
  styleUrls: [
    './about.component.scss'
  ]
})
export class AboutComponent implements OnInit {
  constructor(
    public router: Router,
    private auth: AuthService
  ) {}

  public ngOnInit() {
  }

  public routeIsActive(routePath: string)
  {
    return this.router.url === routePath;
  }

  public logout() {
    this.auth.logout()
      .subscribe({
        error: (err: any) => console.error(err),
        complete: () => this.router.navigateByUrl('login')
      });
  }
}
