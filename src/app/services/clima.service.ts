import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClimaResponse } from '../interfaces/clima-response';
import { ClimaCiudadModel } from '../models/climaCiudad.models';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private url = 'https://climaapp-57763-default-rtdb.firebaseio.com'

  constructor( private http: HttpClient) { }

  getClimaCiudad( climaCiudad: ClimaCiudadModel){

    const ciudad = climaCiudad.ciudad; 

    // Retorna un Response que contiene el tipado que se necesita

    return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&units=metric&appid=1d351472fc3b77dbfc6f41012ed2cc89`);

  }

  getConsultaHistorial( ){

    return this.http.get(`${ this.url }/climaCiudad.json`);

  }

  setGuardarConsulta( wheathers: any ){

    const climaCiudadData = {
      ciudad:  wheathers.name,
      pronostico: wheathers.weather[0].description,
      temperatura: wheathers.main.temp.toString(),
      temperaturaMinima: wheathers.main.temp_min.toString(),
      temperaturaMaxima: wheathers.main.temp_max.toString(),
      
    };

    return this.http.post(`${ this.url }/climaCiudad.json`, climaCiudadData );

  }

    deleteBorrarHistorial() {
          
          return this.http.delete(`${ this.url }/climaCiudad.json`);


    }



}
