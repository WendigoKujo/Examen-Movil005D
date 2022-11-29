import { TestBed } from "@angular/core/testing";
import { AngularFireModule } from "@angular/fire/compat";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { HomePage } from "./home.page";


describe('PRUEBA UNITARIAS: home', ()=>{
  
  //configurar nuestro ambiente de pruebas:
  beforeEach( async ()=>{
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ],
      declarations: [
        HomePage
      ]
    }).compileComponents();
  });


  it('1. Levantar la página home', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it('2. Ejecutar el boton LogOut', ()=>{
    const fixture = TestBed.createComponent(HomePage);
    const app = fixture.componentInstance;
  
    app.logOut();

    expect(app.v_log).toBeTrue();
  });


});