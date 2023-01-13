import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  titulo = 'Listado de Personas';

  constructor(private loginService: LoginService){

  }

  // personaAgregada(persona: Persona) {
  //   //this.loggingService.enviarMensajeAConsola("Enviamos al arreglo a la nueva persona:"+persona.nombre+" apellido:"+persona.apellido);
  //   //this.personas.push(persona);
  //   this.personasService.agregarPersona(persona);
  // }

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyAl7k0oR3nplOqZbp7P4VHVynxX2QpOpKE',
      authDomain: 'listado-personas-3df8a.firebaseapp.com',
    });
  }

  isAutenticado(){
   return this.loginService.isAutenticado();
  }

  salir(){
    this.loginService.logout();
  }

}
