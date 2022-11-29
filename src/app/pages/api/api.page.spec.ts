import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';

import { ApiPage } from './api.page';

describe('PRUEBA UNITARIAS: ApiPage', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        ApiPage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Api-Page', ()=>{
    const fixture = TestBed.createComponent(ApiPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

});
