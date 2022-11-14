import { StorageService } from './../../_service/storage.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/_service/empleado.service';
import { RutaService } from 'src/app/_service/ruta.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private _router: Router,
    private _empleadoService : EmpleadoService,
    private _rutaService : RutaService
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
    let user = this.form.controls["username"].value
    let pass = this.form.controls["password"].value
    if( user == pass){
      this._empleadoService.getEmpleadoByCedula(user).subscribe( ({data})  => {
        if(data.length != 0){
          this._rutaService.getRutaByEmpleado(data[0].Id).subscribe( (res)  => {
            let ruta = res.data[0].Id;
            localStorage.setItem("idRuta", ruta)
            this._router.navigate([`pages/venta/`]);
          })
          alert("Bienvenido");
        }else{
          alert("nop")
        }
      })
    }else{
      alert("contraseña o usuario incorrecto")
    }
  }

}
