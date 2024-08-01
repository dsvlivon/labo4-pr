import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { FirebaseService } from '../../services/firestore.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-helado-tabla',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './helado-tabla.component.html',
  styleUrl: './helado-tabla.component.css'
})
export class HeladoTablaComponent implements OnInit{
  
  @Output() objSeleccionado = new EventEmitter<any>();
  lista: string[] = [];
  displayedColumns: string[] = ['nombre', 'tipo', 'precio', 'peso'];
  dataSource: any[] = [];


  constructor( 
    private fireStore: FirebaseService,
    private pdfService: PdfService
  ){  }

  ngOnInit(): void {
    this.fireStore.obtenerDato('helados').subscribe(
      respuesta => { this.lista = respuesta;
        console.log("lista: ", this.lista);
      })  
  }

  emitirDetalles(pais: any) {
    console.log("seleccionado: ", pais);
    this.objSeleccionado.emit(pais);
  }

  pdf(): void {
    this.pdfService.exportarPDf(this.lista, 'Lista de Helados');
  }

}
