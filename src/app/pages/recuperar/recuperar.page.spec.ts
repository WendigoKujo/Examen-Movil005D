import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { RecuperarPage } from './recuperar.page';

describe('PRUEBA UNITARIAS: Recuperar', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        RecuperarPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Recuperar', ()=>{
    const fixture = TestBed.createComponent(RecuperarPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

});