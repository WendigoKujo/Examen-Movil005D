import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from 'src/environments/environment';
import { AsistenciaPage } from './asistencia.page';

describe('PRUEBA UNITARIAS: Asistencia', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule
      ],
      declarations: [
        AsistenciaPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Asistencia', ()=>{
    const fixture = TestBed.createComponent(AsistenciaPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

});
