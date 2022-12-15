import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-admin-asignaturas',
  templateUrl: './admin-asignaturas.page.html',
  styleUrls: ['./admin-asignaturas.page.scss'],
})
export class AdminAsignaturasPage implements OnInit {

  asignatura = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre_asig: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
    sigla: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{3}[1-9]{4}')]),
    profesor: new FormControl('')

  });

  asignaturas: any[] = [];
  id_profesor: any;
  profesor: any = {};
  KEY_ASIGNATURAS = 'asignaturas';
  KEY_PERSONAS = 'personas';
  id_modificar: any = '';
  v_registrar: boolean = false;

  constructor(private toastController: ToastController, private activatedRoute: ActivatedRoute, private alertController: AlertController, private fire: FireService) { }

  async ngOnInit() {

    this.asignatura.controls.id.setValue(v4());
    this.cargarDatos();
    this.id_profesor = this.activatedRoute.snapshot.paramMap.get('id');
    this.fire.getDato(this.KEY_PERSONAS, this.id_profesor).subscribe(
      (response: any)=>{
        this.profesor = response.data();
      }
    )
    this.asignatura.controls.profesor.setValue(this.id_profesor);
     
  }

  //Metodos a utilizar.

  async cargarDatos(){
    this.fire.getDatos(this.KEY_ASIGNATURAS).subscribe(
      data => {
        this.asignaturas = [];
        for (let asignatura of data){
          let asig = asignatura.payload.doc.data();
          asig['id'] = asignatura.payload.doc.id;
          this.asignaturas.push(asig);
        }
      }
    )
  }

  async registrar(){

    this.v_registrar = true;

    if (this.asignatura.controls.nombre_asig.value.trim() == '') {
      this.tostadaError('La asignatura no puede estar en blanco!');
      return;
    }

    if (this.asignatura.controls.sigla.value.trim() == '') {
      this.tostadaError('La sigla no puede estar en blanco!');
      return;
    }
    
    for (let a of this.asignaturas){
        if (a.sigla == this.asignatura.controls.sigla.value) {
          this.tostadaError('La sigla no se puede repetir!');
          return;
        }
    }

    this.fire.agregar(this.KEY_ASIGNATURAS, this.asignatura.controls.id.value, this.asignatura.value)
    this.tostadaError('Asignatura registrada con exito!');
    this.asignatura.reset();
    this.asignatura.controls.id.setValue(v4());
    this.asignatura.controls.profesor.setValue(this.id_profesor);
    this.cargarDatos();

  }

  async eliminar(identificador){
    const alert = await this.alertController.create({
      header: 'Está seguro de que desea eliminar la asignatura?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('No se ha eliminado!')
          }
        },
        {
          text: 'Si!',
          role: 'confirm',
          handler: async() => {
            this.fire.eliminar(this.KEY_ASIGNATURAS, identificador);
            this.tostadaError('Asignatura Eliminada!');
            this.asignatura.controls.id.setValue(v4());
            this.cargarDatos();
          },
        },
      ],
    });

    await alert.present();
    
  }

  async buscar(identificador){

    this.fire.getDato(this.KEY_ASIGNATURAS, identificador).subscribe(

      (response: any) => {
        this.asignatura.setValue(response.data());
        this.id_modificar = response.id;
      }

    )

  }

  async modificar(){

    let asig = this.asignatura.value;

    this.fire.modificar(this.KEY_ASIGNATURAS, this.id_modificar, asig);
    this.tostadaError('Asignatura Modificada!');
    this.asignatura.reset();
    this.asignatura.controls.id.setValue(v4());
    this.asignatura.controls.profesor.setValue(this.id_profesor);
    this.id_modificar = '';
  }

  limpiar(){

    this.asignatura.reset();
    this.asignatura.controls.id.setValue(v4());

  }

  async tostadaError(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}
