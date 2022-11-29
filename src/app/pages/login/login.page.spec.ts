import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { environment } from "src/environments/environment";
import { LoginPage } from './login.page';
import { AngularFireModule } from "@angular/fire/compat";

describe('Pruebas Unitarias: Login', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        LoginPage
      ]
    }).compileComponents();
  });

  it('1. Levantar la página Login', ()=>{
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('2. Formulario inválido', ()=> {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.estudiante.controls['correo'];
    let password = app.estudiante.controls['password'];
    correo.setValue('est.saez@duocuc.cl');
    password.setValue('123123')

    expect(app.estudiante.valid).toBeFalse();
  });

  it('3. Formulario Valido', ()=> {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.estudiante.controls['correo'];
    let password = app.estudiante.controls['password'];
    correo.setValue('est.saez@duocuc.cl');
    password.setValue('123123')

    expect(app.estudiante.valid).toBeTrue();
  });

  it('4. Probar Boton Ingresar', ()=> {
    const fixture = TestBed.createComponent(LoginPage);
    const app = fixture.componentInstance;

    let correo = app.estudiante.controls['correo'];
    let password = app.estudiante.controls['password'];
    correo.setValue('est.saez@duocuc.cl');
    password.setValue('123123')

    app.login();

    expect(app.v_ingresar).toBeTrue();
  });
  
});
