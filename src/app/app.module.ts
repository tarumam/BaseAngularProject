import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Registrando locais para trabalhar com cultura
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

// External components
import { CustomFormsModule } from 'ng2-validation';
import { ToastrModule } from 'ngx-toastr';

// Bootstrap
import { CarouselModule } from 'ng2-bootstrap/carousel';

// Common components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SharedModule } from './shared/shared.module';

// Organizador Components
import { InscricaoComponent } from './usuario/inscricao/inscricao.component';
import { LoginComponent } from './usuario/login/login.component';

// Services
import { SeoService } from './services/seo.service';
import { OrganizadorService } from './services/organizador.service';
import { ErrorInterceptor } from './services/ErrorInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InscricaoComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    CustomFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [
    Title,
    SeoService,
    OrganizadorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
