import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup;
  isLoading:boolean=false;

  constructor(private authService : AuthService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(){
    this.isLoading=true;
    this.authService.login({
      email : this.form.value.email,
      password : this.form.value.password
    }).subscribe(result => {
      this.isLoading=false;
    },
    error => {
      this.isLoading=false;
      this._snackBar.open(error.message, null, {
        duration: 3000,
      });
    });
  }

}
