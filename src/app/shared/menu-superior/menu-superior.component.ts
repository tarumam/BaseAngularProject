import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-superior',
  templateUrl: './menu-superior.component.html',
  styleUrls: ['./menu-superior.component.css']
})
export class MenuSuperiorComponent {

  private token: string;
  isCollapsed = false;

  usuarioLogado(): boolean {
    this.token = localStorage.getItem('base-project.token');
    if (!this.token) {
      return false;
    }
    return true;
  }
}
