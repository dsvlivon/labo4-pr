import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../../services/firestore.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-repartidores',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './repartidores.component.html',
  styleUrl: './repartidores.component.css'
})
export class RepartidoresComponent {
  lista:string[]=[];
  @Output() objSeleccionado = new EventEmitter<any>();
  
  displayedColumns: string[] = ['nombre', 'pais', 'capacidad', 'edad', 'unidadPropia'];
  mostrarTabla:boolean =false;
  dataSource: any[] = [];
  
  constructor( private fireStore: FirebaseService ){  }
  
  ngOnInit(): void {
    this.fireStore.obtenerDato('repartidores').subscribe(
      respuesta => { this.lista = respuesta;
        console.log("lista: ", this.lista);
      })  
  }

  emitirDetalles(obj: any) {
    this.objSeleccionado.emit(obj);
    console.log("detalle emit: ", obj);
  }
}
