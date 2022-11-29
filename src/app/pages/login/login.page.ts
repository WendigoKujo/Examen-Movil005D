import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { v4 } from 'uuid';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {

  estudiante = new FormGroup({

    correo: new FormControl('', [Validators.required, Validators.pattern('([a-z]{2,40}.[a-z]{1,40}@duocuc.cl|[a-z]{2,40}.[a-z]{1,40}@profesor.duoc.cl)')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18), Validators.maxLength(18)])

  })

  KEY_PERSONAS = 'personas';
  datos: any[] = [];
  isAuthenticated = new BehaviorSubject(false);
  v_ingresar: boolean = true;

  constructor(private toastController: ToastController, private router: Router, private usuarioService: UsuarioService, private storage: StorageService, private fire: FireService) { }

  async ngOnInit() {
    this.fire.getDatos(this.KEY_PERSONAS).subscribe(
      data => {
        this.datos = [];
        for (let usuarios of data){
          let dato = usuarios.payload.doc.data();
          dato['id'] = usuarios.payload.doc.id;
          this.datos.push(dato)
        }
      }
    )
  }

  login(){

    var correoForm = this.estudiante.controls.correo.value;
    var passwordForm = this.estudiante.controls.password.value;

    var usuarioLogin = this.datos.find( dato => dato.correo == correoForm && dato.password == passwordForm);
    if (usuarioLogin != undefined) {
      var navigationExtras: NavigationExtras = {

        state: {
          usuario: usuarioLogin
        }

      };
      this.fire.validarLogin(usuarioLogin);
      this.v_ingresar = true;
      this.isAuthenticated.next(true);
      this.router.navigate(['/home'], navigationExtras);
      this.limpiar();

    }else{

      this.tostadaError('Usuario o contraseña incorrectos!');

    }

  }

  limpiar(){

    this.estudiante.reset();

  }

  getAuth(){

    return this.isAuthenticated.value;

  }

  async tostadaError(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}
