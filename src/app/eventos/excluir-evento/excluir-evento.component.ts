import { Component, OnInit, ViewChildren, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Evento } from '../models/evento';
import { ToastrService } from 'ngx-toastr';
import { EventoService } from 'src/app/eventos/services/evento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControlName } from '@angular/forms';

@Component({
  selector: 'app-excluir-evento',
  templateUrl: './excluir-evento.component.html',
})

export class ExcluirEventoComponent implements OnInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public sub: Subscription;
  public eventoId: string = '';
  public evento: Evento;
  isDataAvailable: boolean = false;

  constructor(private eventoService: EventoService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => { this.eventoId = params.id; }
    );

    this.eventoService.obterMeuEvento(this.eventoId)
      .subscribe(
        evento => {
          this.evento = evento;
          this.isDataAvailable = true;
        }
      );
  }

  public excluirEvento() {
    this.eventoService.excluirEvento(this.eventoId)
      .subscribe(
        evento => { this.onDeleteComplete(evento); },
        error => { this.onError(); }
      );
  }

  public onDeleteComplete(evento: any) {
    const toast = this.toastr.success('Evento excluído com sucesso!', 'Good bye =)');
    if (toast) {
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/eventos/meus-eventos']);
      });
    }
  }

  public onError() {
    this.toastr.error('Houve um erro no processamento!', 'Ops! =(');
  }
}
