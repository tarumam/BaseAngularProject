import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, enableProdMode } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, fromEvent, merge, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { IMyOptions, IMyDateModel } from 'mydatepicker';

import { Evento, Categoria, Endereco } from '../models/evento';
import { GenericValidator } from './../../utils/generic-form-validator.';
import { EventoService } from 'src/app/services/evento.service';
import { DateUtils } from './../../utils/data-type-utils';
import { CurrencyUtils } from './../../utils/currency-utils';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html'
})
export class EditarEventoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  public MyDatePickerOptions = DateUtils.getMyDatePickerOptions();

  public errors: any[] = [];
  public errorsEndereco: any[] = [];
  public eventoForm: FormGroup;
  public enderecoForm: FormGroup;
  public evento: Evento;
  public endereco: Evento;
  public categorias: Categoria[];
  public eventoId = '';

  public gratuito: boolean;
  public online: boolean;
  isDataAvailable = false;
  modalVisible = false;

  public displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  public sub: Subscription;


  constructor(private fb: FormBuilder,
              private eventoService: EventoService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {

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

  ngOnInit() {

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
      nomeEmpresa: ''
    });

    this.enderecoForm = this.fb.group({
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cep: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required],
    });

    this.sub = this.route.params.subscribe(
      params => {
        this.eventoId = params.id;
        this.obterEvento(this.eventoId);
      }
    );

    this.eventoService.obterCategorias()
      .subscribe(categorias => this.categorias = categorias,
        error => this.errors);
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.eventoForm);
    });
  }

  obterEvento(id: string) {
    this.eventoService.obterMeuEvento(id)
      .subscribe(
        evento => {
          this.preencherFormEvento(evento);
          this.isDataAvailable = true;
        }
      );
  }

  preencherFormEvento(evento: Evento): void {
    const valorBrl = CurrencyUtils.ToPrice(this.evento.valor);

    this.evento = evento;

    this.eventoForm.patchValue({
      nome: this.evento.nome,
      categoriaId: this.evento.categoriaId,
      descricaoCurta: this.evento.descricaoCurta,
      descricaoLonga: this.evento.descricaoLonga,
      dataInicio: DateUtils.setMyDatePickerDate(this.evento.dataInicio),
      dataFim: DateUtils.setMyDatePickerDate(this.evento.dataFim),
      gratuito: this.evento.gratuito,
      valor: valorBrl,
      online: this.evento.online,
      nomeEmpresa: this.evento.nomeEmpresa
    });

    this.online = this.evento.online;
    this.gratuito = this.evento.gratuito;

    if (this.evento.endereco) {
      this.enderecoForm.patchValue({
        logradouro: this.evento.endereco.logradouro,
        numero: this.evento.endereco.numero,
        complemento: this.evento.endereco.complemento,
        bairro: this.evento.endereco.bairro,
        cep: this.evento.endereco.cep,
        cidade: this.evento.endereco.cidade,
        estado: this.evento.endereco.estado
      });
    }
  }

  editarEvento() {

    if (this.eventoForm.dirty && this.eventoForm.valid) {
      const p = Object.assign({}, this.evento, this.eventoForm.value);
      const user = this.eventoService.obterUsuario();

      p.organizadorId = user.id;
      p.dataInicio = DateUtils.getMyDatePickerDate(p.dataInicio);
      p.dataFim = DateUtils.getMyDatePickerDate(p.dataFim);
      p.valor = CurrencyUtils.ToDecimal(p.valor);

      this.eventoService.atualizarEvento(p).subscribe(
        result => { this.onSaveComplete(); },
        error => { this.onError(error); }
      );
    }
  }

  atualizarEndereco() {
    if (this.enderecoForm.dirty && this.enderecoForm.valid) {
      const p = Object.assign({}, this.endereco, this.enderecoForm.value);
      p.eventoId = this.eventoId;

      if (this.evento.endereco) {
        p.id = this.evento.endereco.id;
        this.eventoService.atualizarEndereco(p)
          .subscribe(
            result => { this.onEnderecoSaveComplete(); },
            fail => { this.onErrorEndereco(fail); });
      } else {
        this.eventoService.adicionarEndereco(p)
          .subscribe(
            result => { this.onEnderecoSaveComplete(); },
            fail => { this.onErrorEndereco(fail); });
      }
    }
  }

  onEnderecoSaveComplete(): void {
    this.hideModal();

    this.toastr.success('Endereco Atualizado', 'Oba :D');
    this.obterEvento(this.eventoId);
  }

  onSaveComplete(): void {
    this.errors = [];

    const toastrMessage = this.toastr.success('Evento registrado.', 'Sucesso');
    if (toastrMessage) {
      toastrMessage.onHidden.subscribe(() => {
        this.router.navigate(['/eventos/meus-eventos']);
      });
    }
  }

  onError(fail) {
    this.toastr.error('Ocorreu um erro no processamento', 'Ops! :(');
    this.errors = fail.error.errors;
  }

  onErrorEndereco(fail) {
    this.toastr.error('Ocorreu um erro no processamento do Endereço', 'Ops! :(');
    this.errorsEndereco = fail.error.errors;
  }

  public showModal(): void {
    this.modalVisible = true;
  }

  public hideModal(): void {
    this.modalVisible = false;
  }
}
