import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['./menu-login.component.css']
})
export class MenuLoginComponent {

  public token;
  public user;
  public nome: string = "";

  constructor(private router: Router) {
    this.token = localStorage.getItem('eio.token');
    this.user = JSON.parse(localStorage.getItem('eio.user'));
  }

  usuarioLogado(): boolean {

    this.token = localStorage.getItem('base-project.token');
    this.user = JSON.parse(localStorage.getItem('base-project.user'));

    if (this.user) {
      this.nome = this.user.nome;
    }

    return this.token !== null;
  }

  logout() {
    
    localStorage.removeItem('base-project.token');
    localStorage.removeItem('base-project.user');
    this.router.navigateByUrl('/');
  }

}
