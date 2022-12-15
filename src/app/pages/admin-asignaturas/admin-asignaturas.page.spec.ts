import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment';

import { AdminAsignaturasPage } from './admin-asignaturas.page';

describe('PRUEBA UNITARIAS: Admin-Asignaturas', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [
        AdminAsignaturasPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Administrador-Asignaturas', ()=>{
    const fixture = TestBed.createComponent(AdminAsignaturasPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(AdminAsignaturasPage);
    const app = fixture.componentInstance;

    let id = app.asignatura.controls['id'];
    id.setValue('7aee1f22-256e-43ad-941a-f65323a268f0');
    let nombre_asig = app.asignatura.controls['nombre_asig'];
    nombre_asig.setValue('Prog');
    let sigla = app.asignatura.controls['sigla'];
    sigla.setValue('MDY3121');
    let profesor = app.asignatura.controls['profesor'];
    profesor.setValue('21.224.263-2');

    expect(app.asignatura.valid).toBeFalse();
  });

  it('3. Formulario Válido', ()=> {
    const fixture = TestBed.createComponent(AdminAsignaturasPage);
    const app = fixture.componentInstance;

    let id = app.asignatura.controls['id'];
    id.setValue('7aee1f22-256e-43ad-941a-f65323a268f0');
    let nombre_asig = app.asignatura.controls['nombre_asig'];
    nombre_asig.setValue('Programacion De Base De Datos');
    let sigla = app.asignatura.controls['sigla'];
    sigla.setValue('MDY3121');
    let profesor = app.asignatura.controls['profesor'];
    profesor.setValue('21.224.263-2');

    expect(app.asignatura.valid).toBeTrue();
  });
  

  it('4. Ejecutar el boton registrar', ()=>{
    const fixture = TestBed.createComponent(AdminAsignaturasPage);
    const app = fixture.componentInstance;
  
    app.registrar();

    expect(app.v_registrar).toBeTrue();
  });

});