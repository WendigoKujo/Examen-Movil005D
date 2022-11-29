import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { ProfesorPage } from './profesor.page';

describe('PRUEBA UNITARIAS: Profesor', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        ProfesorPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Profesor', ()=>{
    const fixture = TestBed.createComponent(ProfesorPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('2. Ejecutar el boton cerrar sesion', ()=>{
    const fixture = TestBed.createComponent(ProfesorPage);
    const app = fixture.componentInstance;
  
    app.logOut();

    expect(app.v_log).toBeTrue();
  });

});
