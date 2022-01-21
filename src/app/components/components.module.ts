import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ClimaCiudadComponent } from './clima-ciudad/clima-ciudad.component';

@NgModule({
  declarations: [NavbarComponent, ClimaCiudadComponent],
  exports: [
    NavbarComponent,
    ClimaCiudadComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ComponentsModule { }
