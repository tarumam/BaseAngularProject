import { Component, OnInit } from '@angular/core';
import { SeoService, SeoModel } from './../../services/seo.service';
import { EventoService } from 'src/app/eventos/services/evento.service';
import { Evento } from './../models/evento';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
})
export class ListaEventosComponent implements OnInit {

  public eventos: Evento[];
  errorMessage: string;

  constructor(seoService: SeoService, private eventoService: EventoService) {
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
    this.eventoService.obterTodos()
      .subscribe(
        eventos => this.eventos = eventos,
        error => this.errorMessage = error
      );
  }
}
