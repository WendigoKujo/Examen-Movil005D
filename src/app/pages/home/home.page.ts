import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario: any;
  v_log: boolean = true;

  constructor(private router: Router, private storage: StorageService, private fire: FireService) {}

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
  }

  logOut(){

    this.fire.logOut();
    this.v_log = true;

  }

}
