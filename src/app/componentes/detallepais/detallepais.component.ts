import { Component, Input, OnInit } from '@angular/core';
import { ApicallsService } from '../../services/apicalls.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detallepais',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detallepais.component.html',
  styleUrl: './detallepais.component.css'
})
export class DetallepaisComponent implements OnInit{
  @Input() repa: any;
  pais: any;
  nombre: string="";
  population:number = 0;
  capital:string="";
  flag:string="";
  continente:string="";

  constructor( private apicall: ApicallsService ){}

  ngOnInit(): void {
      
  }

  ngOnChanges() {
    if (this.repa) {
      console.log('País seleccionado:', this.repa.pais);
      //population: 102334403
      //capital: ['Cairo']
      //continents: ['Africa']
      //flags: {png: 'https://flagcdn.com/w320/eg.png', svg: 'https://flagcdn.com/eg.svg', alt: 'The flag of Egypt is composed of three equal horiz…ld eagle of Saladin — centered in the white band.'}
      this.apicall.getPais(this.repa.pais).subscribe(obj => {
        this.pais = obj[0];
        this.nombre = this.pais.name.common;
        this.capital = this.pais.capital[0];
        this.continente = this.pais.continents[0];
        this.population = this.pais.population;
        this.flag = this.pais.flags.png;
        console.log(
          // "pais selec: ", this.pais, "\n",
          "nombre: ", this.nombre, "\n",
          "continente: ", this.continente, "\n",
          "capital: ", this.capital, "\n",
          "gente: ", this.population, "\n",
          "bandera: ", this.flag, "\n",
        );
      });    
    }    
  }
}
