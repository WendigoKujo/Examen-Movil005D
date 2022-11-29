import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { DetalleApiPage } from './detalle-api.page';

describe('PRUEBA UNITARIAS: Detalle-Api', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        DetalleApiPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Detalle-Api', ()=>{
    const fixture = TestBed.createComponent(DetalleApiPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

});
