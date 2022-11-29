import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  estudiante = new FormGroup({

    id: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]')]),
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
    apellido: new FormControl('',[Validators.required, Validators.minLength(2)]),
    correo: new FormControl('', [Validators.required, Validators.maxLength(80),Validators.pattern('[a-z]{2,40}.[a-z]{2,40}')]),
    fecha_nac: new FormControl('', [Validators.required]),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('Alumno', [Validators.required])

  });

  usuarios: any[] = [];
  verificar_password: string;
  KEY_PERSONAS = 'personas';
  v_registrar: boolean = false;

  constructor(private usuarioService: UsuarioService, private router: Router, private toastController: ToastController, private validaciones: ValidacionesService, private storage: StorageService, private fire: FireService) { }

  async ngOnInit() {
    this.estudiante.controls.id.setValue(v4());
    this.cargarDatos();
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

  registrar(){

    var mensaje: string;

    if (!this.validaciones.validarRut(this.estudiante.controls.rut.value)) {

      this.tostadaError('El Rut no existe, ingrese uno correcto!');
      return;
      
    };
    
    if (!this.validaciones.validarEdad(17, this.estudiante.controls.fecha_nac.value)) {
  
      this.tostadaError('No tiene la edad minima para registrarse en el sistema!');
      return;

    };
    
    if (this.estudiante.controls.password.value != this.verificar_password) {

      this.tostadaError('Las Contraseñas no coinciden!');
      return;

    };
    
    if (this.estudiante.controls.nombre.value.trim() == "") {
      this.tostadaError('El nombre no puede estar en blanco, ingrese algo!');
      return;
    }else if (this.estudiante.controls.apellido.value.trim() == "") {
      this.tostadaError('El apellido no puede estar en blanco, ingrese algo!');
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
    this.estudiante.controls.correo.setValue(correoForm + '@duocuc.cl')
    var registradoFire = this.fire.agregar(this.KEY_PERSONAS, this.estudiante.controls.id.value, this.estudiante.value);
    if (registradoFire) {
      this.tostadaError('Alumno registrado con exito!');
      this.v_registrar = true;
      this.limpiar();
      this.estudiante.controls.id.setValue(v4());
      this.router.navigate(['/login'])
    }

  } 

  limpiar(){
    this.estudiante.reset();
    this.verificar_password = '';
  }

  //Metodo Toast

  async tostadaError(message){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  }


}
