import { RouterModule, Routes } from '@angular/router';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { AltaComponent } from './componentes/alta/alta.component';
import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { adminGuard } from './guards/admin.guard';
import { TerminosCondicionesComponent } from './componentes/terminos-condiciones/terminos-condiciones.component';
import { TerminosGuard } from './guards/terminos.guard';

export const routes: Routes = [
  { path: 'bienvenida', component: BienvenidaComponent },
  { path: '', pathMatch: 'full', redirectTo: 'bienvenida' },
  { path: '', redirectTo: '/bienvenida', pathMatch: "full" },
  // { path: 'home', component: HomeComponent},
  // { path: 'alta', component: AltaComponent },
  //////////////////////////////////////////////////////// OPCION IMPORTAR DIRECTO STAND ALONE
  { path: 'login', loadComponent:()=>import ('./componentes/login/login.component').then(m=>m.LoginComponent)},
  { path: 'home', loadComponent:()=>import ('./componentes/home/home.component').then(m=>m.HomeComponent), canActivate: [AuthGuard]},
  { path: 'helados-menu', loadComponent:()=>import ('./componentes/helados-menu/helados-menu.component').then(m=>m.HeladosMenuComponent), canActivate: [adminGuard]},
  { path: 'terminos', component: TerminosCondicionesComponent, canDeactivate: [TerminosGuard] },
  { path: 'registro', loadComponent:()=>import ('./componentes/registro/registro.component').then(m=>m.RegistroComponent)},


  { path: '**', redirectTo: 'bienvenida' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

//{ path: 'about-me', loadComponent:()=>import ('./componentes/pages/about-me/about-me.component').then(m=>m.AboutMeComponent)},
// { path: 'about-me', component: AboutMeComponent },
// { path: 'ahorcado', loadComponent:()=>import ('./componentes/juegos/ahorcado/ahorcado.component').then(m=>m.AhorcadoComponent)},
// { path: 'power-marge', loadComponent:()=>import ('./componentes/juegos/juan-topo/juan-topo.component').then(m=>m.JuanTopoComponent)},
// { path: 'mayor-menor', loadComponent:()=>import ('./componentes/juegos/mayor-menor/mayor-menor.component').then(m=>m.MayorMenorComponent)},
//{ path: 'preguntados', loadComponent:()=>import ('./componentes/juegos/preguntados/preguntados.component').then(m=>m.PreguntadosComponent)},