import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  isLogged: boolean = this.authService.isUserLoggedIn();
  constructor(private authService: AuthService, private router: Router) { }
  

  ngOnInit() {
    this.authService.isLoggedEmitter.on('message',()=>{
      this.isLogged = true
    })
   
  }
  logout(){
    this.isLogged = false;
    localStorage.removeItem('auth-token')
    this.router.navigate(['/users/login'])
   
  }

}
