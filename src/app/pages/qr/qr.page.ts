import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  //Variables para general el QR;
  elementType = 'canvas';
  qr = '';
  KEY_ASIGNATURAS = 'asignaturas';
  KEY_PERSONAS = 'personas';
  KEY_CLASES = 'clases'
  asignaturas: any[] = [];
  clases: any[] = [];
  id_profesor: any;
  profesor: any = {};
  fecha: any = new Date().toDateString();
  v_registrar: boolean = false;

  clase = new FormGroup({

    id: new FormControl(''),
    codigo_asig: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    alumnos: new FormControl([])

  });

  constructor(private activatedRoute: ActivatedRoute, private toastController: ToastController, private fire: FireService) { }

  async ngOnInit() {

    this.clase.controls.fecha.setValue(this.fecha);

    this.fire.getDatos(this.KEY_ASIGNATURAS).subscribe(
      data => {
        this.asignaturas = [];
        for (let asi of data){
          let asig = asi.payload.doc.data();
          asig['id'] = asi.payload.doc.id;
          this.asignaturas.push(asig);
        }
      }
    )
    this.id_profesor = this.activatedRoute.snapshot.paramMap.get('id');
    this.fire.getDato(this.KEY_PERSONAS, this.id_profesor).subscribe(
      (response: any) => {
        this.profesor = response.data();
      }
    )

    this.cargarDatos();

  }

  cargarDatos(){

    this.fire.getDatos(this.KEY_CLASES).subscribe(
      data => {
        this.clases = [];
        for (let cla of data){
          let clas = cla.payload.doc.data();
          clas['id'] = cla.payload.doc.id;
          this.clases.push(clas)
        }
      }
    )

  }

  async registrar(id_asignatura){

    var idAsigForm = this.clase.controls.codigo_asig.value;
    var fechaForm = this.clase.controls.fecha.value

    for (let clas of this.clases){
      if (clas.fecha == fechaForm && clas.codigo_asig == idAsigForm) {
        this.tostadaError('Solo se puede crear una clase por dia!');
        return;
      }
    };

    this.clase.controls.id.setValue(v4());
    this.qr = this.clase.controls.id.value;
    this.clase.controls.codigo_asig.setValue(id_asignatura);
    this.fire.agregar(this.KEY_CLASES, this.clase.controls.id.value, this.clase.value);
    this.v_registrar = true;
    this.tostadaError('Clase Iniciada!');
    this.clase.reset();
    this.clase.controls.fecha.setValue(this.fecha);
    this.clase.controls.alumnos.setValue([]);
    this.clase.controls.codigo_asig.reset();

  }

  async tostadaError(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
