import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  isAuth:boolean;
  subscription: Subscription;

  @Output() sidenav = new EventEmitter<void>();

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authChange
    .subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  toggle(){
    this.sidenav.emit();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
  }

}
