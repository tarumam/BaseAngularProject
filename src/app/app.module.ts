import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Bootstrap
import { CollapseModule } from 'ng2-bootstrap/collapse';
import { CarouselModule } from 'ng2-bootstrap/carousel';
import { ToastrModule } from 'ngx-toastr';

// Shared components
import { MenuSuperiorComponent } from './shared/menu-superior/menu-superior.component';
import { MainPrincipalComponent } from './shared/main-principal/main-principal.component';
import { FooterComponent } from './shared/footer/footer.component';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuLoginComponent } from './shared/menu-login/menu-login.component';
import { ListaEventosComponent } from './eventos/lista-eventos/lista-eventos.component';
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';

// Services
import { SeoService } from './services/seo.service';
import { CustomFormsModule } from 'ng2-validation';
import { OrganizadorService } from './services/organizador.service';
import { LoginComponent } from './usuario/login/login.component';

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
    OrganizadorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
