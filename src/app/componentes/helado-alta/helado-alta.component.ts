import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firestore.service';
import { CommonModule } from '@angular/common';
import { DocumentData, DocumentReference } from 'firebase/firestore';


enum Tipo {
  agua = 'agua',
  crema = 'crema'
}

@Component({
  selector: 'app-helado-alta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './helado-alta.component.html',
  styleUrl: './helado-alta.component.css'
})
export class HeladoAltaComponent implements OnInit {
  formRegistro: FormGroup;
  tipos: string[] = Object.values(Tipo);
  @Input() obj: any;
  @Output() objSeleccionado = new EventEmitter<any>();

  constructor(
    private userService: AuthService,
    private router: Router,
    public formBuilder: FormBuilder,
    private fireStore: FirebaseService
  ) {
    //nombre para el sabor, un tipo (agua, crema), precio y un peso aproximado (entre 250 gramos y 1000 gramos)
    this.formRegistro = this.formBuilder.group({
      nombre: new FormControl(),
      tipo: new FormControl(),
      precio: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
      peso: ['', [Validators.required, Validators.min(250), Validators.max(1000)]],
    })
  }

  ngOnInit(): void {
    // this.getDatos();
  }

  onRegistrar() {
    if (this.formRegistro.valid) {
      let obj = {
        'nombre': this.formRegistro.value['nombre'] || '',
        'tipo': this.formRegistro.value['tipo'] || '',
        'precio': this.formRegistro.value['precio'] || '',
        'peso': this.formRegistro.value['peso'] || '',
        'id': ""
      };
      this.fireStore.setData2(obj, 'helados').then((docRef: DocumentReference<any, DocumentData>) => {
        console.log('Documento guardado con ID:', docRef.id);  
        obj.id = docRef.id;
        this.emitirDetalles(obj);
        // this.showSuccessMessage(docRef.id);
      }).catch(error => {
        console.error('Error al guardar el documento:', error);
        // this.showErrorMessage(error);
      });
    }
    this.refresh();
  }

  emitirDetalles(obj: any) {
    console.log("seleccionado: ", obj);
    this.objSeleccionado.emit(obj);
  }

  refresh() {
    setTimeout(() => {
      this.formRegistro.patchValue({
        nombre: '',
        tipo: '',
        precio: null,
        peso: null
      });
    }, 2000);
  }

  get Nombre() {
    return this.formRegistro.get('nombre');
  }
  get Tipo() {
    return this.formRegistro.get('tipo');
  }
  get Precio() {
    return this.formRegistro.get('precio');
  }
  get Peso() {
    return this.formRegistro.get('peso');
  }
}
