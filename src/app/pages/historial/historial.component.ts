import { Component, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';

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
      Swal.close();
  }

  cargarHistorial() {
    this.climaService.getConsultaHistorial()
        .subscribe( historial => {
         this.historiales = historial;

         let me = this;
         me.historiales = Object.keys(me.historiales).map(function(key) {return me.historiales [key];});
        })
  }

  borrarHistorial = async() =>{
    
    this.climaService.deleteBorrarHistorial()
        .subscribe();
        window.location.reload();
        Swal.fire({  
          allowOutsideClick: false, 
          icon: 'info', 
          text: 'Espera por Favor..',
          timer: 2000,
          
        });
         
        Swal.showLoading();
        
        
        
        
  }

}
