import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-detalle-api',
  templateUrl: './detalle-api.page.html',
  styleUrls: ['./detalle-api.page.scss'],
})
export class DetalleApiPage implements OnInit {

  id: number = 0;
  personaje: any = {};

  constructor(private activatedRouted: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.id = +this.activatedRouted.snapshot.paramMap.get('id');

    let dato = this.apiService.getDato(this.id);

    dato.subscribe(
      dataPersonaje => {
        
        this.personaje = dataPersonaje;

      }
    )
  }

}
