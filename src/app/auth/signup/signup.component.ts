import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  maxDate:Date;
  isLoading:boolean=false;

  constructor(private authService:AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  onSubmit(form:NgForm){
    this.isLoading=true;
    this.authService.registerUser({
      email : form.value.email,
      password : form.value.password
    }).subscribe(result => {
      this.isLoading=false;
    },
      error => {
        this.isLoading=false;
        this._snackBar.open(error.message, null, {
          duration: 3000,
        });
      });;
  }

}
