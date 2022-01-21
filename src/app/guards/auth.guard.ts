import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

// Guard que revisa si el usuario está autenticado y proteje las rutas

export class AuthGuard implements CanActivate {
  
  constructor( private auth: AuthService,
               private router: Router) {}

  canActivate(): boolean {

    // 

    if( this.auth.estaAutenticado() ) {
      return true;

    }else{
      
      this.router.navigateByUrl('/login');
      
      return false;
    }
    
  }
  
}
