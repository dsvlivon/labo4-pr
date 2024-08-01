import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HeladoAltaComponent } from "../helado-alta/helado-alta.component";
import { HeladoModificacionComponent } from "../helado-modificacion/helado-modificacion.component";
import { HeladoBajaComponent } from '../helado-baja/helado-baja.component';
import { HeladoTablaComponent } from '../helado-tabla/helado-tabla.component';

@Component({
  selector: 'app-helados-menu',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatCardModule, 
    HeladoAltaComponent, HeladoModificacionComponent, HeladoBajaComponent, HeladoTablaComponent
  ],
  templateUrl: './helados-menu.component.html',
  styleUrl: './helados-menu.component.css'
})
export class HeladosMenuComponent {
  objSeleccionado: any;
  usuario: any;
  email: any;

  manejarSeleccion(obj: any) {
    this.objSeleccionado = obj;
  }

  constructor(
    private fireStore: FirebaseService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.email = localStorage.getItem('user');
    this.fireStore.obtenerDatoPorCriterio('repartidores', 'email', this.email).subscribe(data => {
      this.usuario = data[0];

      console.log('Usuario:', this.usuario);
    });
  }

  goHome() {
    this.router.navigateByUrl('home', { replaceUrl: true})
  }

  goLogOut() { 
    setTimeout(() => {
      this.authService.logout()
      this.router.navigateByUrl('bienvenida', { replaceUrl: true})
    }, 1000);
  }
}
