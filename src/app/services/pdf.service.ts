import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  public exportarPDf(data: any[], fileName: string): void {
    const doc = new jsPDF();

    // Definir las columnas y las filas
    const columns = Object.keys(data[0]).map(key => ({ header: key, dataKey: key }));
    const rows = data.map(item => Object.assign({}, item));

    // Usar autotable para crear la tabla
    (doc as any).autoTable({
      columns: columns,
      body: rows,
    });

    // Guardar el archivo PDF
    doc.save(`${fileName}.pdf`);
  }
}