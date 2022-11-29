import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  datos: any[] = [];
  isAuthenticated = new BehaviorSubject(false);

  constructor(private fire: AngularFirestore, private router: Router) { }

  agregar(coleccion,id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  getDatos(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log(error);
    }
  }

  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  }

  getDato(coleccion, id){
    try {
      return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log(error);
    }
  }

  modificar(coleccion, id, value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log(error);
    }
  }

  validarLogin(usuario){

    try {
      if (usuario != undefined) {
        this.isAuthenticated.next(true);
      }
    } catch (error) {
      console.log(error);
    }

  }

  getAuth(){

    return this.isAuthenticated.value;

  }

  logOut(){

    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);

  }

}
