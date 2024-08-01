import { Component, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firestore.service';

enum TipoRol {
  admin = 'admin',
  Otros = 'otros'
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string ="";
  clave: string ="";
  checked: boolean = false;
  checked2: boolean = false;
  mostrarLogin: boolean = true;
  mostrarRegistro: boolean = !this.mostrarLogin;
  mostrarMensaje: boolean = false;
  mensaje: string ="";
  formLogin: FormGroup;
  validationUserMessage = { type: 'errorType', message: 'El email es incorrecto. Pruebe nuevmaente' }
  validationFormUser: FormGroup = new FormGroup({});
  rol: TipoRol = TipoRol.Otros;
  tiposRol: string[] = Object.values(TipoRol);  
  lista: any[] = [];

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private fireStore: FirebaseService,
    private userService: AuthService
  ){
    this.formLogin = new FormGroup({
      email: new FormControl(),
      clave: new FormControl(),
      rol: new FormControl()
    })
  }

  getDatos(){
    this.fireStore.obtenerDato('usuarios').subscribe( respuesta => {
      this.lista = respuesta;
    })
  }
  
  onSubmit() {    
    this.userService.login(this.formLogin.value)
      .then((response: any) => {

        const email = response.user.email;
        // this.fireStore.agregarLog(email);
        localStorage.setItem('user',  email);

        this.router.navigate(['/home']);
      }).catch(error => this.setMensaje(error, 2))
  }
  
  onGoogleLogin() {
    this.userService.loginWithGoogle()
    .then((response: any) => {
      console.log("onClick success: "+ response);

      const email = response.user.email;
      // this.fireStore.agregarLog(email);
      localStorage.setItem('user',  email);

      this.router.navigate(['/home']);      
    }).catch((error: any) => console.log('Error -> onClick: '+ error))
  }
  
  onCheckboxChange() {
    if (!this.checked) {
      this.checked2 = false;
      this.formLogin.patchValue({
        email: 'dsvlivon@gmail.com',
        clave: 111111
      });
    } else {
      this.formLogin.patchValue({
        email: '',
        clave: ''
      });
    }
  }
  
  // onCheckboxChange2(event: Event) {
  onCheckboxChange2() {
    // event.preventDefault();
    if (!this.checked2) {
      this.checked = false;
      this.formLogin.patchValue({
        email: 'tito@empleado.com',
        clave: 111111
      });
    } else {
      this.formLogin.patchValue({
        email: '',
        clave: ''
        });
      }
    }

  yaEsUsuario() {
    this.mostrarLogin = !this.mostrarLogin;
    console.log("mostrar Login: ", this.mostrarLogin)
    this.mostrarRegistro = !this.mostrarRegistro;
    console.log("mostrar Registro: ", this.mostrarRegistro)
    return false; 
  }

  onRegistrar(){
    this.userService.registrar(this.formLogin.value)
      .then(response => {
        console.log('Ingreso Correcto: ' + this.formLogin.value)

        const email = response.user.email ? response.user.email : "null";
        localStorage.setItem('user', email);
        this.fireStore.setData(this.formLogin.value, 'usuarios');

      this.router.navigate(['/home']);
    }).catch((error: any) => this.setMensaje(error, 1))
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
