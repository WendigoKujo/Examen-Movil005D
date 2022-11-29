import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [];

  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage: Storage, private router: Router) {
    storage.create();
  }

  async agregarUsuario(key, dato){

    var varRut = await this.validarRut(key, dato.rut);
    var varCorreo = await this.validarCorreo(key, dato.correo)
    
    if (varRut == undefined && varCorreo == undefined) {

      this.datos = await this.storage.get(key) || [];

      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;

    }else{

      return false;

    }

  }
  async agregar(key, dato){
    
    this.datos = await this.storage.get(key) || [];

    this.datos.push(dato);
    await this.storage.set(key, this.datos);

  }

  async getDato(key, identificador){

    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.id == identificador);

  }

  async getDatos(key){
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  }

  async eliminar(key, identificador){

    this.datos = await this.storage.get(key) || [];

    this.datos.forEach((value, index) => {
      if (value.id == identificador) {
        this.datos.splice(index, 1);
      }
    });

    await this.storage.set(key, this.datos);

  }

  async actualizar(key, dato){

    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(value => value.id == dato.id);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);

  }

  async validarLogin(key, correo, password){

    this.datos = await this.storage.get(key) || [];

    var usuarioLogin = this.datos.find( dato => dato.correo == correo && dato.password == password);
    if (usuarioLogin != undefined){
      
      this.isAuthenticated.next(true);
      return usuarioLogin;

    }

  }

  getAuth(){

    return this.isAuthenticated.value;

  }

  logOut(){

    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);

  }

  async validarRut(key, rut){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.rut == rut)
  }

  async validarCorreo(key, correo){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.correo == correo);
  }
  
  async validarFecha(key, fecha, id){

    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.fecha == fecha && dato.codigo_asig == id);

  }

}
