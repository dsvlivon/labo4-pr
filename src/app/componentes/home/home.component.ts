import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FirebaseService } from '../../services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AltaComponent } from "../alta/alta.component";
import { TablaComponent } from "../tabla/tabla.component";
import { RepartidoresComponent } from '../repartidores/repartidores.component';
import { DetalleComponent } from '../detalle/detalle.component';
import { DetallepaisComponent } from '../detallepais/detallepais.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatToolbarModule, MatIconModule, MatCardModule, 
    AltaComponent, TablaComponent, RepartidoresComponent, DetalleComponent, DetallepaisComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  mostrarAlta: boolean = false;
  mostrarCards: boolean = true;
  mostrarHelados: boolean = false;
  mostrarRepartidorDetalle: boolean = false;
  usuario: any;
  email: any;
  rol: any;
  nombre: any;
  objSeleccionado: any;


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
    this.rol = "Usuario"
    this.nombre = this.email

    this.fireStore.obtenerDatoPorCriterio('repartidores', 'email', this.email).subscribe(data => {
      this.usuario = data[0];
      this.rol = this.usuario.rol;
      this.nombre = this.usuario.nombre;
      console.log('Usuario:', this.usuario);

      if(this.rol == 'admin') { this.mostrarHelados = true; }
    });
    
  }

  goHome() {
    this.mostrarAlta = !this.mostrarAlta;
    this.mostrarCards = !this.mostrarCards;
  }

  goAltas() {
    this.mostrarAlta = true;
    this.mostrarCards = !this.mostrarCards;
  }

  goRepartidorDetalle() {
    this.mostrarAlta = false;
    this.mostrarCards = false;
    this.mostrarRepartidorDetalle = !this.mostrarRepartidorDetalle;
    // this.mostrarCards = !this.mostrarCards;
  }

  goHeladosMenu() { 
    this.router.navigateByUrl('helados-menu', { replaceUrl: true})
  }

  goLogOut() { 
    // console.log("spinner: ", this.mostrarSpinner)
    setTimeout(() => {
      this.authService.logout()
      // console.log("spinner: ", this.mostrarSpinner)
      this.router.navigateByUrl('bienvenida', { replaceUrl: true})
    }, 1000);
  }
}
