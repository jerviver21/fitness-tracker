import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; 
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable({
    providedIn: 'root',
   })
export class AuthService{
    private isAuthenticated:boolean = false;
    authChange = new Subject<boolean>();

    constructor(private router:Router, private afauth:AngularFireAuth, private ts:TrainingService) {

    }

    initAuthListener() {
        this.afauth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }else {
                this.ts.cancelSubscriptions();
                this.isAuthenticated = false;
                this.authChange.next(false);
                this.router.navigate(['/login']);
            }
        });
    }

    registerUser(authdata:AuthData){
        this.afauth.auth.createUserWithEmailAndPassword(
            authdata.email,
            authdata.password
        ).then(result => {
            console.log(result);  
        })
        .catch(error => {
            console.log(error);
        });
    }

    login(authdata:AuthData){
        this.afauth.auth.signInWithEmailAndPassword(
            authdata.email,
            authdata.password
        ).then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
    }

    logout(){
        this.afauth.auth.signOut();
    }

    isAuth(){
        return this.isAuthenticated;
    }
}