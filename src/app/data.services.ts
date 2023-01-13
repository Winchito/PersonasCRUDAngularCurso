import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';
import { Persona } from './persona.model';

@Injectable()
export class DataServices{
    constructor(private httpClient: HttpClient,
        private loginService: LoginService){}

    cargarPersonas(): Observable <any>{
        const token = this.loginService.getIdToken();
        return this.httpClient.get('https://listado-personas-3df8a-default-rtdb.firebaseio.com/datos.json?auth='+token);
    }

    guardarPersonas(personas: Persona[]){
    const token = this.loginService.getIdToken();
    this.httpClient.put('https://listado-personas-3df8a-default-rtdb.firebaseio.com/datos.json?auth='+token, personas)
    .subscribe(
        response => console.log("Resultado guardar respuesta"+ response),
            error => console.log("Error al guardar personas:"+ error)
    );
    }

    modificarPersona(index: number, persona: Persona){
    const token = this.loginService.getIdToken();
    let url: string;
    url = 'https://listado-personas-3df8a-default-rtdb.firebaseio.com/datos/' + index+ '.json?auth='+token;
    this.httpClient.put(url, persona).subscribe(
        response => console.log("resultado modificar persona: "+ response),
        error => console.log("Error en modificar persona:"+ error)
    )
    }

    eliminarPersona(index: number){
    const token = this.loginService.getIdToken();
    let url: string;
    url = 'https://listado-personas-3df8a-default-rtdb.firebaseio.com/datos/' + index+ '.json?auth='+token;
    this.httpClient.delete(url).subscribe(
        response => console.log("resultado eliminar persona: "+ response),
        error => console.log("Error en eliminar persona:"+ error)
    )
    }
}
