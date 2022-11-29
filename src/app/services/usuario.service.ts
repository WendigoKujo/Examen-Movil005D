import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 
  usuarios: any[] = [
    {

      rut: '1.111.111-1',
      nombre: 'Claudio',
      apellido: 'Montecinos',
      correo: 'usu.usu@profesor.duoc.cl',
      semestre: 4,
      password: 'diosito',
      tipo_usuario: 'Admin'

    },
    {

      rut: '21.224.263-2',
      nombre: 'Esteban',
      apellido: 'Saez',
      correo: 'est.saez@duocuc.cl',
      semestre: 4,
      password: '123123',
      tipo_usuario: 'Alumno'

    },
    {

      rut: '2.222.222-2',
      nombre: 'Alan',
      apellido: 'Gajardo',
      correo: 'alan.gajardo@profesor.duoc.cl',
      semestre: 4,
      password: '123123',
      tipo_usuario: 'Profesor'

    }
  ];

  isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router) { }

  
  agregarUsuario(usuario): boolean{

    if (this.obtenerUsuario(usuario.rut) == undefined) {
      
      this.usuarios.push(usuario);
      return true;

    }
    return false;

  }

  eliminarUsuario(rut){

    this.usuarios.forEach((usu, index) =>{

      if (usu.rut == rut) {

        this.usuarios.splice(index, 1)
        
      }

    });

  }

  actualizarUsuario(usuario){

    var index = this.usuarios.findIndex(usu => usu.rut == usuario.rut);
    this.usuarios[index] = usuario;

  }

  obtenerUsuario(rut){

    return this.usuarios.find(usu => usu.rut == rut);

  }

  obtenerUsuarios(){

    return this.usuarios;

  }

  //Metodo customer

  validarLogin(correo, password){
    
    var usuarioLogin = this.usuarios.find(usu => usu.correo == correo && usu.password == password);
    if (usuarioLogin != undefined) {
      
      this.isAuthenticated.next(true);
      return usuarioLogin;
      
    }

  }

  getAuth(){

    return this.isAuthenticated.value;

  }

  logout(){

    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);

  }

  validarCorreo(correo){

    return this.usuarios.find(usu => usu.correo == correo);

  }

}
