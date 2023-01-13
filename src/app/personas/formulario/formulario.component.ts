import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../persona.model';
import { PersonasService } from '../../personas.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit{
  
//@Output() personaCreada = new EventEmitter<Persona>();

  nombreInput: string = '';
  apellidoInput: string = '';
  index: number;
  modoEdicion: number;
  //@ViewChild('nombreRef') nombre: ElementRef;
  //@ViewChild('apellidoRef' ) apellido: ElementRef;
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private personasService: PersonasService){
    this.personasService.saludar.subscribe((indice: number)=>alert("El indice es: "+indice))
  }

  ngOnInit(){
    this.index = this.route.snapshot.params['id'];
    this.modoEdicion = +this.route.snapshot.queryParams['modoEdicion'];
    // if(this.index){
      if(this.modoEdicion != null && this.modoEdicion === 1){
      let persona: Persona = this.personasService.encontrarPersona(this.index);
      this.nombreInput = persona.nombre;
      this.apellidoInput = persona.apellido;
    }
  }


  // agregarPersona(nombre: HTMLInputElement, apellido: HTMLInputElement){
  //let persona1 = new Persona(this.nombreInput, this.apellidoInput);
  // let persona1 = new Persona(nombre.value, apellido.value);
  //let persona1 = new Persona(this.nombre.nativeElement.value,this.apellido.nativeElement.value); 
  // this.personas.push(persona1);
  //this.loggingService.enviarMensajeAConsola("Enviamos persona:"+persona1.nombre+" apellido:"+persona1.apellido);
  //this.personaCreada.emit(persona1); 

  onGuardarPersona(){
    let persona1 = new Persona(this.nombreInput, this.apellidoInput);
    // if(this.index){
      if(this.modoEdicion != null && this.modoEdicion === 1){
    this.personasService.modificarPersona(this.index, persona1);
    }else{
    this.personasService.agregarPersona(persona1);
    }
   this.router.navigate(['personas']);
  }

  eliminarPersona(){
    if(this.index != null){
      this.personasService.eliminarPersona(this.index);
    }
    this.router.navigate(['personas']);
  }
}
