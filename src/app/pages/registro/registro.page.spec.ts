import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { RegistroPage } from './registro.page';

describe('PRUEBA UNITARIAS: Registro', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        RegistroPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Registro', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let id = app.estudiante.controls['id'];
    id.setValue('7aee1f22-256e-43ad-941a-f65323a268f0');
    let rut = app.estudiante.controls['rut'];
    rut.setValue('17.888.444-k');
    let nombre = app.estudiante.controls['nombre'];
    nombre.setValue('Alan');
    let apellido = app.estudiante.controls['apellido'];
    apellido.setValue('Gajardo');
    let correo = app.estudiante.controls['correo'];
    correo.setValue('alan.gajardo@profesor.duoc.cl');
    let fecha_nac = app.estudiante.controls['fecha_nac'];
    fecha_nac.setValue('2003-01-30');
    let semestre = app.estudiante.controls['semestre'];
    semestre.setValue('4');
    let password = app.estudiante.controls['password'];
    password.setValue('123123');
    let tipo_usuario = app.estudiante.controls['tipo_usuario'];
    tipo_usuario.setValue('Profesor');

    expect(app.estudiante.valid).toBeFalse();
  });

  it('3. Formulario Válido', ()=> {
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;

    let id = app.estudiante.controls['id'];
    id.setValue('7aee1f22-256e-43ad-941a-f65323a268f0');
    let rut = app.estudiante.controls['rut'];
    rut.setValue('17.888.444-k');
    let nombre = app.estudiante.controls['nombre'];
    nombre.setValue('Alan');
    let apellido = app.estudiante.controls['apellido'];
    apellido.setValue('Gajardo');
    let correo = app.estudiante.controls['correo'];
    correo.setValue('alan.gajardo');
    let fecha_nac = app.estudiante.controls['fecha_nac'];
    fecha_nac.setValue('2003-01-30');
    let semestre = app.estudiante.controls['semestre'];
    semestre.setValue('4');
    let password = app.estudiante.controls['password'];
    password.setValue('123123');
    let tipo_usuario = app.estudiante.controls['tipo_usuario'];
    tipo_usuario.setValue('Profesor');

    expect(app.estudiante.valid).toBeTrue();
  });
  

  it('4. Ejecutar el boton registrar', ()=>{
    const fixture = TestBed.createComponent(RegistroPage);
    const app = fixture.componentInstance;
  
    app.registrar();

    expect(app.v_registrar).toBeTrue();
  });

});
