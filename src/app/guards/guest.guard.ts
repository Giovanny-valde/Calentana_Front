import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem("idRuta") == null && localStorage.getItem("admin") == null) {
      console.log('ola');
      return true;
    }
    if(localStorage.getItem("idRuta") != null){
      this.router.navigate([`pages/venta`]);
      console.log("ruatas");
    }
    if(localStorage.getItem("admin") != null){
      this.router.navigate([`pages/reporte-ventas`]);
      console.log("admin");
    }
    return false;
  }
  
}
