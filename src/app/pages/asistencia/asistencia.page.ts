import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  id: any;
  usuario: any = {};
  clase: any = {};
  KEY_PERSONAS = 'personas';
  KEY_CLASES = 'clases'
  id_clase: any;

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private fire: FireService) { }

  async ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.fire.getDato(this.KEY_PERSONAS, this.id).subscribe(
      (response: any) => {
        this.usuario = response.data();
      }
    );

  }

  async marcar(){

    this.fire.getDato(this.KEY_CLASES, this.id_clase).subscribe(
      (response: any) => {
        this.clase = response.data();
      }
    );

    if (this.clase == undefined) {
      this.tostadaError('No existe clase para quedar presente!');
      return;
    }else{

      if (this.clase.alumnos.includes(this.usuario.rut)) {
        this.tostadaError('Usted ya esta Presente!');
      }else{

        this.clase.alumnos.push(this.usuario.rut);
        this.fire.modificar(this.KEY_CLASES, this.id_clase, this.clase);
        this.tostadaError('El alumno ha quedado presente!');

      }

    }

  }

  async tostadaError(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
