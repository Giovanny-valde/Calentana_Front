import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private idRuta: string;

  constructor() { }

  getIdRuta(){
    return this.idRuta;
  }

  setIdRuta(idRuta: string){
    this.idRuta = idRuta;
  }
}
