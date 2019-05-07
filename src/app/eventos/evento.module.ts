import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Router
import { eventoRouterConfig } from './evento.routes';

// 3'ds part
import { MyDatePickerModule } from 'mydatepicker';

// Components
import { EventoComponent } from './evento.component';
import { ListaEventosComponent } from './lista-eventos/lista-eventos.component';
import { EditarEventoComponent } from './editar-evento/editar-evento.component';
import { ExcluirEventoComponent } from './excluir-evento/excluir-evento.component';
import { DetalhesEventoComponent } from './detalhes-evento/detalhes-evento.component';
import { AdicionarEventoComponent } from './adicionar-evento/adicionar-evento.component';
import { MeusEventosComponent } from './meus-eventos/meus-eventos.component';

// Services
import { Title } from '@angular/platform-browser';
import { SeoService } from '../services/seo.service';
import { EventoService } from 'src/app/eventos/services/evento.service';
import { AuthService } from './services/authService';
import { ErrorInterceptor } from './../services/ErrorInterceptor';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MyDatePickerModule,
        RouterModule.forChild(eventoRouterConfig)
    ],
    declarations: [
        EventoComponent,
        ListaEventosComponent,
        AdicionarEventoComponent,
        MeusEventosComponent,
        EditarEventoComponent,
        ExcluirEventoComponent,
        DetalhesEventoComponent
    ],
    providers: [
        Title,
        SeoService,
        AuthService,
        EventoService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        }
    ],
    exports: [
        RouterModule
    ]
})

export class EventoModule {

}
