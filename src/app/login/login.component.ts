import {AuthService} from 'ng2-ui-auth';
import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService,
              private router: Router) {

  }

  ngOnInit() {
  }

  loginWithFacebook() {
    this.auth.authenticate('facebook')
      .subscribe({
        error: (err: any) => console.error(err),
        complete: () => this.router.navigateByUrl('home')
      });
  }
}
