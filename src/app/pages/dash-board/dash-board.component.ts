import {  Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  id: string | null;
  localStorage = localStorage

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  getParamId(){
    this.id = localStorage.getItem("idRuta")
  }

  cerrarSesion() {
    localStorage.clear()
    this._router.navigate([`login`]);
  }

}
