import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario() {
    this.form = new FormGroup({
      id: new FormControl(""),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  comprobarLogueado() {
  }

  iniciarSesion() {
    this._router.navigate(['dashBoard']);
  }

}
