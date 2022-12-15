import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.page.html',
  styleUrls: ['./profesor.page.scss'],
})
export class ProfesorPage implements OnInit {

  id: any;
  usuario: any = {};
  KEY_PERSONAS = 'personas';
  v_log: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private fire: FireService){ }

  async ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.fire.getDato(this.KEY_PERSONAS, this.id).subscribe(
      (response: any) => {
        this.usuario = response.data();
      }
    )

  }

  logOut(){

    this.fire.logOut();
    this.v_log = true;

  }

}