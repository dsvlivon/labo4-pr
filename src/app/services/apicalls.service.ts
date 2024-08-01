import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';


const movies_API_URL = 'https://api.themoviedb.org/3/movie/popular';
const movies_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZDQ3OGY2ZmVhOWI0ZDM0YzQwZjZhMTc5MGRhM2U5OSIsInN1YiI6IjY2NTI1NWZjNDZjNWNiMWU5ODdmMzk4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hUqh8EA08b9V3NDHDiSLOFV4JhB4tPVWemsL04tKEXg';
const paises_API_URL = 'https://restcountries.com/v3.1/all';


@Injectable({
  providedIn: 'root'
})
export class ApicallsService {
  public peliculas:any[] = [];

  constructor(private http: HttpClient) { }

  getObjetoOrdenadoNombre(link:string) {
    return this.http.get<any[]>(link)
    .pipe(map(objetos => objetos.sort((a,b) => {
        if (a.name.common < b.name.common) {
          return -1;
        } else if (a.name.common > b.name.common) {
          return 1;
        } else {
          return 0;
        }
      })));
  }
  getTop10PaisesPorPoblacion(): Observable<any[]> {
    return this.http.get<any[]>(paises_API_URL).pipe(
      map(objetos => objetos.sort((a, b) => b.population - a.population)),
      map(objetosOrdenados => objetosOrdenados.slice(0,10))
    );
  }

  getPais(pais: string): Observable<any[]> {
    return this.http.get<any[]>(paises_API_URL).pipe(
      map(paises => paises.filter(obj => obj.name.common === pais))
    );
  }  

  getPaisesPorCriterio(cant?: number, continentes?: Array<string>): Observable<any[]> {
    return this.http.get<any[]>(paises_API_URL).pipe(
      map(paises => {
        // Filtrar los países por continentes si continentes no es null o undefined
        if (continentes && continentes.length > 0) {
          paises = paises.filter(pais => 
            pais.continents.some((continent: string) => continentes.includes(continent))
          );
        }
        paises = paises.sort((a, b) => b.population - a.population)
          if (cant) {
          paises = paises.slice(0, cant);
        }  
        return paises;
      })
    );
  }
  

}
