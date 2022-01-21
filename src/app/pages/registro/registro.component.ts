import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme: Boolean = false;

  constructor( private auth: AuthService,
               private router: Router  ) { }

  ngOnInit() { 

    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ){

    // si hay un error en el formulario retorna
    if( form.invalid ) { return; }

    // Ejecutamos el sweet alert para una mejor presentación
    

    this.auth.nuevoUsuario( this.usuario )
        .subscribe( resp => {
        
          console.log(resp);
          
          // cierre del sweetalert
          
          // botón recordar usuario
          if( this.recordarme ){
            localStorage.setItem('email', this.usuario.email);
          }else{
            localStorage.removeItem('email');
          }

          // navegación al home
          this.router.navigateByUrl('/home');

        
        }, (err) => {

          console.log(err.error.error.message);
           // Ejecutamos el sweet alert para una mejor presentación del error
           
        });
        
  }


}
