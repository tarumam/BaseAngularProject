import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { Evento, Categoria, Endereco } from '../models/evento';
import { GenericValidator } from './../../utils/generic-form-validator.';
import { EventoService } from 'src/app/services/evento.service';
import { DateUtils } from './../../utils/data-type-utils';


@Component({
  selector: 'app-adicionar-evento',
  templateUrl: './adicionar-evento.component.html',
})
export class AdicionarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public myDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public eventoForm: FormGroup;
  public errors: any[] = [];
  public evento: Evento;
  public categorias: Categoria[];
  public gratuito: boolean;
  public online: boolean;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private router: Router,
              private eventoService: EventoService) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      dataInicio: {
        required: 'Informe a data de início'
      },
      dataFim: {
        required: 'Informe a data de encerramento'
      },
      categoriaId: {
        required: 'Informe a categoria'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.evento = new Evento();
    this.evento.endereco = new Endereco();
  }

  public displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  ngOnInit(): void {
    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      categoriaId: ['', Validators.required],
      descricaoCurta: '',
      descricaoLonga: '',
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
      gratuito: '',
      valor: '0',
      online: '',
      nomeEmpresa: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
    });

    this.eventoService.obterCategorias()
      .subscribe(
        categorias => this.categorias = categorias,
        error => this.errors = error
      );
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  adicionarEvento() {
    if (this.eventoForm.dirty && this.eventoForm.valid) {
      const p = Object.assign({}, this.evento, this.eventoForm.value);

      const user = this.eventoService.obterUsuario();
      // p.valor = CurrencyUtils.ToDecimal(p.valor);
      p.dataInicio = DateUtils.getMyDatePickerDate(p.dataInicio);
      p.dataFim = DateUtils.getMyDatePickerDate(p.dataFim);
      p.organizadorId = user.id;
      p.endereco.logradouro = p.logradouro;
      p.endereco.numero = p.numero;
      p.endereco.complemento = p.complemento;
      p.endereco.bairro = p.bairro;
      p.endereco.cep = p.cep;
      p.endereco.cidade = p.cidade;
      p.endereco.estado = p.estado;

      this.eventoService.registrarEvento(p)
        .subscribe(
          result => { this.onSaveComplete(); },
          fail => { this.onError(fail); }
        );
    }
  }

  onError(fail) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
    this.errors = fail.error.errors;
  }

  onSaveComplete() {

    this.eventoForm.reset();
    this.errors = [];

    const toastrMessage = this.toastr.success('Evento registrado.', 'Sucesso');

    if (toastrMessage) {
      toastrMessage.onHidden.subscribe(() => {
        this.router.navigate(['/proximos-eventos']);
      });
    }
  }
}
