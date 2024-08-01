import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApicallsService } from '../../services/apicalls.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  @Output() objSeleccionado = new EventEmitter<any>();
  paises: string[] = [];
  displayedColumns: string[] = ['bandera', 'pais'];
  dataSource: any[] = [];
  
  mostrarTabla: boolean = false;

  constructor(private apicall: ApicallsService) { }

  ngOnInit(): void {
    this.apicall.getPaisesPorCriterio(6, ['Europe', 'Africa'])
      .subscribe(paises => {
        this.paises = paises;
        console.log("paises: ", this.paises);
      });
  }

  emitirDetalles(pais: any) {
    this.objSeleccionado.emit(pais);
  }
}
