import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('yo.')
    if (this.authService.isUserLoggedIn()) {
        return true;
    }
    this.router.navigate(['/users/login']);
    return false;
  }
  ngOnInit(){
    console.log("guard")
  }
  constructor(private authService: AuthService, private router: Router) {}
}
