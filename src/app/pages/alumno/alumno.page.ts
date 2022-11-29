import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  id: any;
  usuario: any = {};
  KEY_PERSONAS = 'personas';
  v_log: boolean = false;


  constructor(private activatedRoute: ActivatedRoute, private storageService: StorageService, private fire: FireService) { }

  async ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.fire.getDato(this.KEY_PERSONAS, this.id).subscribe(
      (response: any) => {
        this.usuario = response.data();
      }
    );

  }

  logOut(){

    this.fire.logOut();
    this.v_log = true;

  }

}