import { Routes } from '@angular/router';
import { EventoComponent } from './evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { AuthService } from './services/authService';
import { AdicionarEventoComponent } from './adicionar-evento/adicionar-evento.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';

export const eventoRouterConfig: Routes = [
    {
        path: '', component: EventoComponent, children: [
            { path: '', component: ListaEventosComponent },
            { path: 'lista-eventos', component: ListaEventosComponent },
            { path: 'meus-eventos', canActivate: [AuthService], component: MeusEventosComponent },
            { path: 'detalhes-evento/:id', component: DetalhesEventoComponent },
            {
                path: 'novo', component: AdicionarEventoComponent, canActivate: [AuthService],
                data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }],
            },
            {
                path: 'editar/:id', component: EditarEventoComponent, canActivate: [AuthService],
                data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }],
            },
            {
                path: 'excluir/:id', component: ExcluirEventoComponent, canActivate: [AuthService],
                data: [{ claim: { nome: 'Eventos', valor: 'Gravar' } }],
            },
        ]
    }
];

