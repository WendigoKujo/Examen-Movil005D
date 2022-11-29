import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  recuperar = new FormGroup({

    correo: new FormControl('', [Validators.required, Validators.maxLength(80) ,Validators.pattern('([a-z]{2,40}.[a-z]{1,40}@duocuc.cl|[a-z]{2,40}.[a-z]{1,40}@profesor.duoc.cl)')])

  });

  constructor() { }

  ngOnInit() {
  }

}
