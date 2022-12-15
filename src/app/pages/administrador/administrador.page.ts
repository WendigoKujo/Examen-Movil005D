import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {

  estudiante = new FormGroup({

    id: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    apellido: new FormControl('',[Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    correo: new FormControl('', [Validators.required, Validators.maxLength(80) ,Validators.pattern('[a-z]{2,40}.[a-z]{1,40}')]),
    fecha_nac: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.min(0), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('', Validators.required)

  });

  usuarios: any [] = [];
  verificar_password: string;
  KEY_PERSONAS = 'personas';
  id_modificar: any = '';
  id: any;
  v_registrar: boolean = false;
  nombres: any[] = [];
  results = [...this.nombres];

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastController: ToastController, 
    private validaciones: ValidacionesService,
    private alertController: AlertController,
    private fire: FireService
    ){}

  async ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.cargarDatos();
    this.estudiante.controls.id.setValue(v4());
    this.cargarNombres();

  }

  handleChange(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.nombres.filter(d => d.toLowerCase().indexOf(query) > -1);
  }

  cargarDatos(){
    this.fire.getDatos(this.KEY_PERSONAS).subscribe(

      data => {
        this.usuarios = [];
        for (let usuario of data){
          let usu = usuario.payload.doc.data();
          usu['id'] = usuario.payload.doc.id;
          this.usuarios.push(usu);
        }
      }
    )
  }

  cargarNombres(){

    this.fire.getDatos(this.KEY_PERSONAS).subscribe(


        data => {
          this.nombres = [];
          for (let usuario of data){
            let usu = usuario.payload.doc.data();
            usu['id'] = usuario.payload.doc.id;
            this.nombres.push(usu['nombre']);
          }
        }
    )

  }

  async registrar(){

    this.v_registrar = true;

    if (!this.validaciones.validarRut(this.estudiante.controls.rut.value)) {
      this.tostadaError('Rut Incorrecto!');
      return;
    };

    if (!this.validaciones.validarEdad(17, this.estudiante.controls.fecha_nac.value)) {
      this.tostadaError('Edad minima 17 años!');
    };

    if (this.estudiante.controls.password.value != this.verificar_password) {
      this.tostadaError('Las contraseñas no coinciden!');
      return;
    };

    if (this.estudiante.controls.nombre.value.trim() == '') {
      this.tostadaError('El Nombre no puede estar en blanco!');
      return;
    }else if(this.estudiante.controls.apellido.value.trim() == ''){
      this.tostadaError('El Apellido no puede estar en blanco!');
      return;
    };

    for (let usu of this.usuarios){

      if (usu.rut == this.estudiante.controls.rut.value) {
        this.tostadaError('El Rut ya esta registrado, vuelva a Ingresar!')
        return;
      }else if(usu.correo == this.estudiante.controls.correo.value){
        this.tostadaError('El Correo ya esta registrado, vuelva a Ingresar!')
        return;
      }

    }

    var correoForm = this.estudiante.controls.correo.value;
    var tipoForm = this.estudiante.controls.tipo_usuario.value;

    if (tipoForm != 'Alumno') {
      this.estudiante.controls.correo.setValue(correoForm + '@profesor.duoc.cl')
    }else{
      this.estudiante.controls.correo.setValue(correoForm + '@duocuc.cl')
    }

    var registrado = this.fire.agregar(this.KEY_PERSONAS, this.estudiante.controls.id.value, this.estudiante.value);
    if (registrado) {
      this.tostadaError('Usuario Registrado con exito!');
      this.limpiar();
      this.estudiante.controls.id.setValue(v4());
      this.cargarDatos();
    };
    
  }

  async eliminar(identificador){
    const alert = await this.alertController.create({
      header: 'Está seguro de que desea eliminar el usuario?',
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
            this.fire.eliminar(this.KEY_PERSONAS, identificador);
            this.tostadaError('Usuario Eliminado con exito!');
            this.estudiante.reset();
            this.estudiante.controls.id.setValue(v4());
          },
        },
      ],
    });

    await alert.present();
    
  }

  async buscar(identificador){

    this.fire.getDato(this.KEY_PERSONAS, identificador).subscribe(

      (response: any) => {
        this.estudiante.setValue(response.data());
        this.id_modificar = response.id;
        this.verificar_password = response.data().password;
      }

    )

  }

  modificar(){

    let usu = this.estudiante.value;

    if (this.verificar_password == this.estudiante.controls.password.value) {
      
      if (!this.validaciones.validarEdad(17, this.estudiante.controls.fecha_nac.value)) {
        this.tostadaError('Edad minima 17 años!');
      };
      if (!this.validaciones.validarRut(this.estudiante.controls.rut.value)) {
        this.tostadaError('Rut Incorrecto!');
        return;
      };
      if (this.estudiante.controls.password.value != this.verificar_password) {
        this.tostadaError('Las contraseñas no coinciden!');
        return;
      };
      if (this.estudiante.controls.nombre.value.trim() == '') {
        this.tostadaError('El Nombre no puede estar en blanco!');
        return;
      }else if(this.estudiante.controls.apellido.value.trim() == ''){
        this.tostadaError('El Apellido no puede estar en blanco!');
        return;
      };
      this.fire.modificar(this.KEY_PERSONAS, this.id_modificar, usu);
      this.tostadaError('Usuario Modificado Con Exito!')
      this.estudiante.reset();
      this.estudiante.controls.id.setValue(v4());
      this.id_modificar = '';
      this.verificar_password = '';

    }else{
      this.tostadaError('Las Contraseñas deben coincidir!');
    }

  }

  limpiar(){
    this.estudiante.reset();
    this.verificar_password = '';
    this.estudiante.controls.id.setValue(v4());
  }

  async tostadaError(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}
