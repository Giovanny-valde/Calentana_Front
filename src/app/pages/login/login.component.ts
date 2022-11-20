import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmpleadoService } from 'src/app/_service/empleado.service';
import { RutaService } from 'src/app/_service/ruta.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    private _rutaService : RutaService,
    private spinner : NgxSpinnerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.formulario();
  }

  formulario() {
    this.form = new FormGroup({
      id: new FormControl(""),
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      recordar: new FormControl(false),
    });

    if (document.cookie.indexOf("pass") > -1 && document.cookie.indexOf("user") > -1) {
      this.form.controls["username"].setValue(document.cookie.split("user=")[1].split(";")[0]);
      this.form.controls["password"].setValue(document.cookie.split("pass=")[1].split(";")[0]);
      this.form.controls["recordar"].setValue(true)
    }

  }

  recordar(){
    let isChecked = this.form.controls["recordar"].value
    let user = this.form.controls["username"].value
    let pass = this.form.controls["password"].value
    if (isChecked) {
      let date = (new Date().getFullYear()) + 1;
      document.cookie = `user=${user}; expires=Thu, 02 Jan ${date} 00:00:00 UTC; path=/;`;
      document.cookie = `pass=${pass}; expires=Thu, 02 Jan ${date} 00:00:00 UTC; path=/;`;
    }
    else{
      let date = (new Date().getFullYear()) - 1;
      document.cookie = `user=${user}; expires=Thu, 02 Jan ${date} 00:00:00 UTC; path=/;`;
      document.cookie = `pass=${pass}; expires=Thu, 02 Jan ${date} 00:00:00 UTC; path=/;`;
    }
  }

  comprobarLogueado() {
  }

  iniciarSesion() {
    this.spinner.show();
    let user = this.form.controls["username"].value
    let pass = this.form.controls["password"].value
    //55153655
    //123
    if (user == "admin" && pass == "55153655") {
      this.recordar()
      setTimeout(() => {
        this.spinner.hide();
        localStorage.setItem("admin", "si");
        this.toastr.success( `Administrador` , 'Bienvenido!',{
          positionClass: 'toast-top-center',
        });
        this._router.navigate([`pages/reporte-ventas/`]);
      }, 300);
    
    } else if (user == pass && user != "" && pass != "") {
      console.log(user);
      this.recordar()
      this._empleadoService.getEmpleadoByCedula(user).subscribe( ({data})  => {
        if(data.length != 0){
          this._rutaService.getRutaByEmpleado(data[0].Id).subscribe( (res)  => {
            let ruta = res.data[0].Id;
            let empleado = res.data[0].Empleado.Nombre;
            localStorage.setItem("idRuta", ruta)
            setTimeout(() => {
              this.spinner.hide();        
              this.toastr.success( `${empleado}` , 'Bienvenido!',{
                positionClass: 'toast-top-center',
              });
              this._router.navigate([`pages/venta/`]);
            }, 300);

          })
        }else{
          setTimeout(() => {
            this.spinner.hide();
            this.toastMessage("contraseña o usuario incorrecto", "Error");
          }, 2000);
        }
      })
    }else{
      // alert("contraseña o usuario incorrecto")
      setTimeout(() => {
        this.spinner.hide();
        this.toastMessage("contraseña o usuario incorrecto", "Error");
      }, 2000);
    }
  }

  toastMessage(titulo : string , mensaje : string){
    this.toastr.error(`${titulo}`, `${mensaje}`, { 
      positionClass: 'toast-top-center',
    });
  }

}
