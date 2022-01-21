import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Instanciamos el modelo usuario
  usuario: UsuarioModel = new UsuarioModel();

  // botón recordar usuario
  recordarme = false;

  constructor( private auth: AuthService,
               private router: Router ) { }

  ngOnInit() {

    // botón recordar usuario
    if( localStorage.getItem('email') ){
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  
  }

  login( form: NgForm ) {

    if( form.invalid ){ return; }
    
    // Ejecutamos el sweet alert para una mejor presentación
    

    this.auth.login( this.usuario )
        .subscribe( resp => {

          console.log(resp);

          // cierre del sweetalert
          
         
          // botón recordar usuario
          if( this.recordarme ){
            localStorage.setItem('email', this.usuario.email);
          }

          // navegación al home
          this.router.navigateByUrl('/home');

        }, (err) => {

          console.log(err.error.error.message);
          // Ejecutamos el sweet alert para una mejor presentación del error
         
        })
  }

}
