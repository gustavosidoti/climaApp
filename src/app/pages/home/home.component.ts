import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ClimaResponse} from 'src/app/interfaces/clima-response';
import { AuthService } from '../../services/auth.service';
import { ClimaService } from '../../services/clima.service';
import { Weather, Main } from '../../interfaces/clima-response';
import { ClimaCiudadModel } from 'src/app/models/climaCiudad.models';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  forma: FormGroup;
  wheathers ;
  climaCiudad: ClimaCiudadModel = new ClimaCiudadModel();


  constructor( private auth: AuthService,
               private router: Router,
               private climaService: ClimaService,
               private fb: FormBuilder ) {

  
      this.crearFormulario()          
  }

  ngOnInit(){ }
  // Formulario Reactivo
  crearFormulario(){
    this.forma = this.fb.group({
      ciudad: ['', Validators.required]
    });
  } 
  
  
   obtenerClima = async() =>{
    Swal.showLoading();
    this.climaCiudad.ciudad = this.forma.value['ciudad'];

    try{
      
      this.climaService.getClimaCiudad(this.climaCiudad)
      .subscribe( resp => {
      
      this.wheathers = resp;
      Swal.close();
      this.guardarHistorial();
      
      })
 
      

    } catch (error) {
      
      console.log(error);
     
    }

    
  }

  guardarHistorial = async() =>{

    try{

      this.climaService.setGuardarConsulta( this.wheathers )
          .subscribe( resp => { });

    }catch (error){

          console.log(error);
    
        }
    
  }

  salir(){

    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
