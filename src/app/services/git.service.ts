import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';


const githubApi = 'https://api.github.com/users/dsvlivon'

@Injectable({
  providedIn: 'root'
})
export class GitService {

  public datos: Subject<any>;

  constructor(
    private http : HttpClient
  ) {
    this.datos = new Subject();
  }

  obtenerDatos(){
    this.http.get(githubApi).subscribe(respuesta => {
      this.datos.next(respuesta);
    });
  }



  getgit(): Observable<any[]> {
    return this.http.get<any[]>(githubApi).pipe(
      map((response: any) => {
        // Transforma la respuesta para obtener solo login, avatar_url y name
        return [{
          login: response.login,
          avatar_url: response.avatar_url,
          name: response.name
        }];
      })
    );
  }
}
