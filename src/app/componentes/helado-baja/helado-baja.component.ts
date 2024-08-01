import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-helado-baja',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './helado-baja.component.html',
  styleUrl: './helado-baja.component.css'
})
export class HeladoBajaComponent {
  @Input() obj: any;
  form: FormGroup;


  constructor(
    public formBuilder: FormBuilder,
    private fireStore: FirebaseService
  ) {
    //nombre para el sabor, un tipo (agua, crema), precio y un peso aproximado (entre 250 gramos y 1000 gramos)
    this.form = this.formBuilder.group({
      nombre: [{ value: '', disabled: true }],
      tipo: [{ value: '', disabled: true }],
      precio: [{ value: '', disabled: true }],
      peso: [{ value: '', disabled: true }]
    })
  }

  ngOnChanges() {
    if (this.obj) {
      
      this.form.patchValue({
        nombre: this.obj.nombre,
        tipo: this.obj.tipo,
        precio: this.obj.precio,
        peso: this.obj.peso
      });
    }
  }

  onRegistrar() {
    this.fireStore.deleteDato(this.obj, "helados").then(() => {
      console.log('Delete:', this.obj);
      // this.showSuccessMessage();
    }).catch(error => {
      console.error('Error al eliminar el documento:', error);
      // this.showErrorMessage();
    });
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
    }, 2000);
  }

}
