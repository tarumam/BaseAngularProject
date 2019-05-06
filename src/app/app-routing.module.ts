import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';
import { AuthService } from './services/authService';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';
import { NaoEncontradoComponent } from './shared/nao-encontrado/nao-encontrado.component';
import { EditarEventoComponent } from './eventos/editar-evento/editar-evento.component';
import { MeusEventosComponent } from './eventos/meus-eventos/meus-eventos.component';
import { ExcluirEventoComponent } from './eventos/excluir-evento/excluir-evento.component';
import { DetalhesEventoComponent } from './eventos/detalhes-evento/detalhes-evento.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'acesso-negado', component: AcessoNegadoComponent },
  { path: 'nao-encontrado', component: NaoEncontradoComponent },

  { path: 'proximos-eventos', component: ListaEventosComponent },
  { path: 'inscricao', component: InscricaoComponent },
  { path: 'entrar', component: LoginComponent },
  { path: 'detalhes-evento/:id', component: DetalhesEventoComponent },
  {
    path: 'novo-evento', component: AdicionarEventoComponent, canActivate: [AuthService],
    data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }],
  },
  {
    path: 'editar-evento/:id', component: EditarEventoComponent, canActivate: [AuthService],
    data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }],
  },
  {
    path: 'meus-eventos', component: MeusEventosComponent, canActivate: [AuthService],
    data: [{ claim: { nome: 'Eventos', valor: 'Ler' } }],
  },
  {
    path: 'excluir-evento/:id', component: ExcluirEventoComponent, canActivate: [AuthService],
    data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
