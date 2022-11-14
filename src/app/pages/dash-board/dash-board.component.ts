import { StorageService } from './../../_service/storage.service';
import { ActivatedRoute } from '@angular/router';
import { VentaService } from '../../_service/venta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {

  id: string | null;

  constructor(
    private _ventaService: VentaService,
    private activatedRoute : ActivatedRoute,
    private _storageService: StorageService
  ) { }

  ngOnInit(): void {
    //this._ventaService.getItems().subscribe(data => console.log(data));
    // setTimeout(this.getParamId, 1000);
  }

  getParamId(){
    // this.activatedRoute.params.subscribe(data =>{
    //   this.id = data["id"];
      this.id = localStorage.getItem("idRuta")
      console.log(this.id);
    // });
  }

}
