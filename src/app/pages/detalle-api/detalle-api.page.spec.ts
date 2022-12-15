import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";

import { DetalleApiPage } from './detalle-api.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('PRUEBA UNITARIAS: Detalle-Api', ()=>{
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        HttpClientModule
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
