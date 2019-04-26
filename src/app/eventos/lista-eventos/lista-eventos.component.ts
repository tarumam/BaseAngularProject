import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from './../../services/seo.service';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css']
})
export class ListaEventosComponent implements OnInit {

  constructor(seoService: SeoService) {
    let seoModel: SeoModel;
    seoModel = {
      title: 'Eventos',
      robots: 'Index,Follow',
      description: '',
      keywords: ''
    };
    seoService.setSeoData(seoModel);
  }

  ngOnInit() {
  }

}
