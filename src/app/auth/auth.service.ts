import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 

@Injectable({
    providedIn: 'root',
   })
export class AuthService{
    private user:User;
    authChange = new Subject<boolean>();

    constructor(private router:Router) {

    }

    registerUser(authdata:AuthData){
        this.user = {
            email : authdata.email,
            userId : 1289323
        };
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

    login(authdata:AuthData){
        this.user = {
            email : authdata.email,
            userId : 1289323
        };
        this.authChange.next(true);
        this.router.navigate(['/training']);
    }

    logout(){
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser(){
        return {...this.user};
    }

    isAuth(){
        return this.user != null;
    }
}