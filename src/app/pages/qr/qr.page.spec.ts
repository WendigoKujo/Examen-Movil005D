import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { QrPage } from './qr.page';

describe('PRUEBA UNITARIAS: QR', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [
        QrPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página QR', ()=>{
    const fixture = TestBed.createComponent(QrPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });
  
  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(QrPage);
    const app = fixture.componentInstance;

    let id = app.clase.controls['id'];
    id.setValue('7aee1f22-256e-43ad-941a-f65323a268f0');
    let codigo_asig = app.clase.controls['codigo_asig'];
    codigo_asig.setValue('');
    let fecha = app.clase.controls['fecha'];
    fecha.setValue('2003-01-30');
    let alumnos = app.clase.controls['alumnos'];
    alumnos.setValue(['21.224.263-2']);

    expect(app.clase.valid).toBeFalse();
  });

  it('3. Formulario Válido', ()=> {
    const fixture = TestBed.createComponent(QrPage);
    const app = fixture.componentInstance;

    let id = app.clase.controls['id'];
    id.setValue('7aee1f22-256e-43ad-941a-f65323a268f0');
    let codigo_asig = app.clase.controls['codigo_asig'];
    codigo_asig.setValue('1aee1f35-156e-12ad-941a-f42123a268f0');
    let fecha = app.clase.controls['fecha'];
    fecha.setValue('2003-01-30');
    let alumnos = app.clase.controls['alumnos'];
    alumnos.setValue(['21.224.263-2']);

    expect(app.clase.valid).toBeTrue();
  });
  

  it('4. Ejecutar el boton registrar', ()=>{
    const fixture = TestBed.createComponent(QrPage);
    const app = fixture.componentInstance;
  
    app.registrar('7aee1f22-256e-43ad-941a-f65323a268f0');

    expect(app.v_registrar).toBeTrue();
  });

});
