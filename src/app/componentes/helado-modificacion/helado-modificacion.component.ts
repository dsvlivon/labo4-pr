import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';

enum Tipo {
  agua = 'agua',
  crema = 'crema'
}

@Component({
  selector: 'app-helado-modificacion',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './helado-modificacion.component.html',
  styleUrl: './helado-modificacion.component.css'
})
export class HeladoModificacionComponent {
  @Input() obj: any;
  form: FormGroup;
  tipos: string[] = Object.values(Tipo);
  nombre: string = "";
  upd: any;
  aux: any;

  constructor(
    public formBuilder: FormBuilder,
    private fireStore: FirebaseService
  ) {
    //nombre para el sabor, un tipo (agua, crema), precio y un peso aproximado (entre 250 gramos y 1000 gramos)
    this.form = this.formBuilder.group({
      nombre: [{ value: '', disabled: true }],
      tipo: new FormControl(),
      precio: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
      peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]],
    })
  }

  ngOnChanges() {
    if (this.obj) {
      console.log('Modif seleccionado:', this.obj);
      this.nombre = this.obj.nombre;
      this.form.patchValue({
        nombre: this.obj.nombre,
        tipo: this.obj.tipo,
        precio: this.obj.precio,
        peso: this.obj.peso
      });
    }
  }

  onRegistrar() {
    if (this.form.valid) {
      this.upd = {
        'nombre': this.nombre,
        'tipo': this.form.value['tipo'] || '',
        'precio': this.form.value['precio'] || '',
        'peso': this.form.value['peso'] || '',
        'id': this.obj.id
      };
      if (this.upd) {
        this.fireStore.actualizarHelado(this.upd);
        console.log("modificado: ", this.upd);
      }
    }
    this.refresh();
  }

  refresh() {
    setTimeout(() => {
      this.form.patchValue({
        nombre: '',
        tipo: '',
        precio: null,
        peso: null
      });
    }, 2500);
  }


  get Nombre() {
    return this.form.get('nombre');
  }
  get Tipo() {
    return this.form.get('tipo');
  }
  get Precio() {
    return this.form.get('precio');
  }
  get Peso() {
    return this.form.get('peso');
  }
}
