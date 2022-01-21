import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  public historiales: any;
  public page: number;
  public filterHistorial = '';

  constructor(private auth: AuthService,
              private router: Router,
              private climaService: ClimaService,
              private fb: FormBuilder) { }

  ngOnInit() {

      this.cargarHistorial();
      // cierre del sweetalert
      
  }

  cargarHistorial= async() =>{
    
    try {
      this.climaService.getConsultaHistorial()
        .subscribe( historial => {
         this.historiales = historial;
          
         // si el historial viene vacío retornamos
         if(historial === null){
           return;
         }
          // esta funcionalidad sirve para realizar el arreglo de objetos que necesita la tabla
         let me = this;
         me.historiales = Object.keys(me.historiales).map(function(key) {return me.historiales [key];});
         
        })
    } catch (error) {
      console.log(error);
    }
    
  }

  borrarHistorial = async() =>{
    
      await this.climaService.deleteBorrarHistorial().subscribe();
      
      this.climaService.getConsultaHistorial()
        .subscribe( historial => {
         this.historiales = historial;
          
         // si el historial viene vacío retornamos
         if(historial === null){
          window.location.reload(); 
          return;
         }
      })
     
  }

}
