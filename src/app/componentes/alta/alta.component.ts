import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';


enum TipoRol {
  admin = 'admin',
  empleado = 'empleado'
}

@Component({
  selector: 'app-alta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './alta.component.html',
  styleUrl: './alta.component.css'
})
export class AltaComponent implements OnInit {
  formRegistro: FormGroup;
  tiposRol: string[] = Object.values(TipoRol);
  @Input() pais: any;

  constructor(
    private userService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private fireStore: FirebaseService
  ) {
    //        dni , nombre, edad, capacidad de transporte(unidades de potes de helados), país de origen,unidad Propia (true o false)).
    this.formRegistro = this.formBuilder.group({
      nombre: new FormControl(),
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,8}$/)]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],

      capacidad: ['', [Validators.required, Validators.min(1), Validators.max(12  )]],
      pais: ['', [Validators.required]],
      unidadPropia: [false],

      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    // this.getDatos();
  }

  onRegistrar() {
    if (this.formRegistro.valid) {
      this.userService.registrar(this.formRegistro.value).then(response => {
        const email = response.user.email || "null";
      }).catch((error: any) => console.log(error));

      setTimeout(() => {
        let obj = {
          'nombre': this.formRegistro.value['nombre'] || '',
          'dni': this.formRegistro.value['dni'] || '',
          'edad': this.formRegistro.value['edad'] || '',

          'capacidad': this.formRegistro.value['capacidad'] || '',
          'pais': this.formRegistro.value['pais'] || '',
          'unidadPropia': this.formRegistro.value['unidadPropia'] || '',
          'rol': TipoRol.empleado,

          'email': this.formRegistro.value['email'] || '',
          'clave': this.formRegistro.value['clave'] || ''
        };
        this.fireStore.setData(obj, 'repartidores');
        // localStorage.setItem('user', this.formRegistro.value['email']);
        console.log("Usuario Guardado:", obj);
      }, 1000);
      this.refresh();
    }
  }

  ngOnChanges() {
    if (this.pais) {
      console.log('País seleccionado:', this.pais);
      this.formRegistro.patchValue({
        pais: this.pais.name.common
      });
    }
  }

  refresh(){
    this.router.navigateByUrl('home', { replaceUrl: true})
  }

  get Email() {
    return this.formRegistro.get('email');
  }
  get Edad() {
    return this.formRegistro.get('edad');
  }
  get Dni() {
    return this.formRegistro.get('dni');
  }
  get Capacidad() {
    return this.formRegistro.get('capacidad');
  }

}
