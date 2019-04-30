import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Registrando locais para trabalhar com cultura
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

// Bootstrap
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { ToastrModule } from 'ngx-toastr';

// Shared components
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';

// Common components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

// Eventos Components
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { AdicionarEventoComponent } from './eventos/adicionar-evento/adicionar-evento.component';

// Organizador Components
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';
import { AcessoNegadoComponent } from './shared/acesso-negado/acesso-negado.component';

// Services
import { SeoService } from './services/seo.service';
import { CustomFormsModule } from 'ng2-validation';
import { OrganizadorService } from './services/organizador.service';
import { AuthService } from './services/authService';
import { ErrorInterceptor } from './services/ErrorInterceptor';
import { EventoService } from './services/evento.service';
import { NaoEncontradoComponent } from './shared/nao-encontrado/nao-encontrado.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuSuperiorComponent,
    MainPrincipalComponent,
    FooterComponent,
    HomeComponent,
    MenuLoginComponent,
    ListaEventosComponent,
    InscricaoComponent,
    LoginComponent,
    AdicionarEventoComponent,
    AcessoNegadoComponent,
    NaoEncontradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    CustomFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    Title,
    SeoService,
    OrganizadorService,
    AuthService,
    EventoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
