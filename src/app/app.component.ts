/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { JwtHttp, AuthService } from 'ng2-ui-auth';
import { Router } from '@angular/router';
import { AppState } from './app.service';
import { ITokenUser } from './interfaces';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
    <nav>
      <a [routerLink]=" ['./'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Home
      </a>
      <a [routerLink]=" ['./home'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        My points
      </a>
      <a [routerLink]=" ['./detail'] "
        routerLinkActive="active" [routerLinkActiveOptions]= "{exact: true}">
        Create new story
      </a>
       <a href="" (click)="logout()">Logout</a>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent implements OnInit {
  public user: ITokenUser;
  public expiration: Date;

  public angularclassLogo = 'assets/img/angularclass-avatar.png';
  public name = 'Angular 2 Webpack Starter';
  public url = 'https://twitter.com/AngularClass';

  constructor(public appState: AppState,
              private http: JwtHttp,
              private router: Router,
              private auth: AuthService) {
  }

  public ngOnInit() {
    this.user = this.auth.getPayload();
    this.expiration = this.auth.getExpirationDate();

    console.log('Initial App State', this.appState.state, this.user);
  }

  public logout() {
    this.auth.logout()
      .subscribe({
        error: (err: any) => console.error(err),
        complete: () => this.router.navigateByUrl('login')
      });
  }
}
