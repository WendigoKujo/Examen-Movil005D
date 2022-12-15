import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";

import { AlumnoPage } from './alumno.page';

describe('PRUEBA UNITARIAS: Alumno', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [
        AlumnoPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Alumno', ()=>{
    const fixture = TestBed.createComponent(AlumnoPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('2. Ejecutar el boton cerrar sesion', ()=>{
    const fixture = TestBed.createComponent(AlumnoPage);
    const app = fixture.componentInstance;
  
    app.logOut();

    expect(app.v_log).toBeTrue();
  });

});
