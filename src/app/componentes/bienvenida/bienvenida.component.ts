import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GitService } from '../../services/git.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css'
})
export class BienvenidaComponent implements OnInit{

  gitData: any;

  constructor(
    private router: Router,
    private git: GitService
  ){}  
    
  ngOnInit(): void {
    this.git.getgit().subscribe(data => {
      this.gitData = data[0];
    });
  }
  
  goLogin() {
    this.router.navigate(['/login']);
  }
  goRegistro() {
    this.router.navigate(['/registro']);
  }
}
