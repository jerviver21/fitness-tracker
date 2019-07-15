import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-sidenav-list',
  templateUrl: './app-sidenav-list.component.html',
  styleUrls: ['./app-sidenav-list.component.css']
})
export class AppSidenavListComponent implements OnInit, OnDestroy {

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

  closeSidenav(){
    this.sidenav.emit();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  logout(){
    this.authService.logout();
    this.closeSidenav();
  }

}
