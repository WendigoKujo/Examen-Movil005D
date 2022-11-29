import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {

  personajes: any[] = [];
  cantidad: number;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let datos = this.apiService.getDatos();

    datos.subscribe(
      (dataPersonajes: any) => {
        console.log(dataPersonajes);
        this.personajes = dataPersonajes.results;
        this.cantidad = dataPersonajes.info.count;
      }
    )
  }

}
