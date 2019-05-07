import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// 3d's Components
import { CollapseModule } from 'ng2-bootstrap/collapse';

// Components
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { FooterComponent } from './footer/footer.component';
import { MainPrincipalComponent } from './main-principal/main-principal.component';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { NaoEncontradoComponent } from './nao-encontrado/nao-encontrado.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        CollapseModule
    ],
    declarations: [
        MenuSuperiorComponent,
        FooterComponent,
        MainPrincipalComponent,
        MenuLoginComponent,
        AcessoNegadoComponent,
        NaoEncontradoComponent
    ],
    exports: [
        MenuSuperiorComponent,
        FooterComponent,
        MainPrincipalComponent,
        MenuLoginComponent,
        AcessoNegadoComponent,
        NaoEncontradoComponent
    ]
})

export class SharedModule { }