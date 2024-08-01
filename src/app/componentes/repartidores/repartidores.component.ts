import { Component, EventEmitter, Output } from '@angular/core';
import { FirebaseService } from '../../services/firestore.service';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ExcelService } from '../../services/excel.service';

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
  
  usuario: any;
  email: any;
  mostrarBoton:boolean =false;
  
  constructor( 
    private fireStore: FirebaseService,
    private excelService: ExcelService
  ){  }
  
  ngOnInit(): void {
    this.fireStore.obtenerDato('repartidores').subscribe(
      respuesta => { this.lista = respuesta;
        console.log("lista: ", this.lista);
    })
    this.email = localStorage.getItem('user');
    this.fireStore.obtenerDatoPorCriterio('repartidores', 'email', this.email).subscribe(data => {
      this.usuario = data[0];
      console.log('Usuario:', this.usuario);

      if(this.usuario.rol == 'admin') { this.mostrarBoton = true; }
    });
  }

  emitirDetalles(obj: any) {
    this.objSeleccionado.emit(obj);
    console.log("detalle emit: ", obj);
  }

  excel(): void {
    this.excelService.exportarExcel(this.lista, 'Lista de Repartidores');
  }
}
