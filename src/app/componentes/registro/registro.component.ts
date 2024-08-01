import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firestore.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  email: string ="";
  clave: string ="";
  mensaje: string ="";
  mostrarMensaje: boolean = false;
  form: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private fireStore: FirebaseService,
    private userService: AuthService
  ){
    this.form = new FormGroup({
      email: new FormControl(),
      clave: new FormControl(),
    })
  }

  onSubmit() {    
    this.userService.registrar(this.form.value).then(response => {
      const email = response.user.email || "null";
      localStorage.setItem('user', email);          
      this.router.navigate(['/terminos']);
    }).catch((error: any) => this.setMensaje(error, 1));    
  }

  setMensaje(error:any, num:number) {
    this.mostrarMensaje = true;
    switch (error.code) {
      case "auth/invalid-credential":
        this.mensaje = "La contraseña proporcionada no es válida.";
        break;
      case "auth/invalid-email":
        this.mensaje = "El correo electrónico proporcionado no es válido.";
        break;
      case "auth/missing-password":
        this.mensaje = "La contraseña es obligatoria.";
        break;
      case "auth/missing-email":
          this.mensaje = "El correo electrónico es obligatorio.";
          break;
      
      case "auth/email-already-in-use":
        this.mensaje = "El correo electrónico ya está en uso.";
        break;
      case "NaN":
        this.mensaje = "La contraseña es incorrecta.";
        break;
      
      default:
        this.mensaje = "Se produjo un error desconocido.";
        console.log(this.mensaje + " Api Response: "+ error);
        break;
    }
    
    setTimeout(() => {
      this.mostrarMensaje = false;
      this.mensaje = "";
    }, 3000);
  }
}
