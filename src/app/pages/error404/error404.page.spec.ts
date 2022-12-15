import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from "@angular/router/testing";

import { Error404Page } from './error404.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('PRUEBA UNITARIAS: Error404', ()=>{
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
        Error404Page
      ]
    }).compileComponents();
  });


  it('1. Levantar la página Error404', ()=>{
    const fixture = TestBed.createComponent(Error404Page);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

});
