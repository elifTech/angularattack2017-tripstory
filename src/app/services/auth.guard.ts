import { RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from 'ng2-ui-auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true;
    }
    console.log('unauthenticated navigating to login');
    this.router.navigateByUrl('login');
    return false;
  }
}
