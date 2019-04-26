import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'proximos-eventos', component: ListaEventosComponent },
  { path: 'inscricao', component: InscricaoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
