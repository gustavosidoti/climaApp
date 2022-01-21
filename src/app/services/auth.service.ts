import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apikey = 'AIzaSyBASBIvfhJ2RqbacdY_EpcyVw1oUezv-nk';

  userToken: string;
  // crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


  // login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  

  constructor( private http: HttpClient) {

    // ejecutamos el método que comprueba si hay un token
    this.leerToken();

   }

  logout(){

    localStorage.removeItem('token');
    localStorage.removeItem('expira');

  }

  login( usuario: UsuarioModel){

    const authData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signInWithPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }

  nuevoUsuario( usuario: UsuarioModel){
    // información que debemos enviar a Firebase
    
    const authData = {
        email: usuario.email,
        password: usuario.password,
        returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }signUp?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp =>{
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );
  }


  private guardarToken( idToken: string ){

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    // obtener la expiración del token
    let hoy = new Date();
    //hoy.setSeconds ( 3600 );
    hoy.setTime( hoy.getTime() + 3600 * 1000);

    localStorage.setItem('expira', hoy.getTime().toString());


  }

  leerToken(){
    // si existe token lo leermos y asignamos a la variable userToken
    if( localStorage.getItem('token') ) {
    
      this.userToken = localStorage.getItem('token');
    
    }else{
    // sino existe asignamos un string vacio
      this.userToken = '';
    }

    return this.userToken;

  }

  estaAutenticado(): boolean {
    
    // // valida si hay un token
    if (this.userToken.length < 2) return false;

    // verificamos que el token almacenado no supere 1 hora 
    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    return expiraDate > new Date();
     

  }


}
