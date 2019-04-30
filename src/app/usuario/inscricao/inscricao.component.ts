import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator } from './../../utils/generic-form-validator.';
import { CustomValidators } from 'ng2-validation';
import { ToastrService } from 'ngx-toastr';

import { Organizador } from '../models/organizador';
import { OrganizadorService } from './../../services/organizador.service';

@Component({
  selector: 'app-inscricao',
  templateUrl: './inscricao.component.html',
})
export class InscricaoComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  inscricaoForm: FormGroup;
  organizador: Organizador;
  validationMessages: { [key: string]: { [key: string]: string } };
  displayMessage: { [key: string]: string } = {};
  genericValidator: GenericValidator;
  public errors: any[] = [];

  constructor(private fb: FormBuilder,
              private organizadorService: OrganizadorService,
              private router: Router,
              private toastr: ToastrService) {

    this.validationMessages = {
      nome: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'CPF deve conter 11 caracteres'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
        equalTo: 'As senhas não conferem'
      }
    };
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    const senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.inscricaoForm = this.fb.group({
      nome: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      cpf: ['', [Validators.required,
      CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required,
      CustomValidators.email]],
      senha,
      senhaConfirmacao
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
    });
  }

  adicionarOrganizador() {

    this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);

    if (this.inscricaoForm.dirty && this.inscricaoForm.valid) {
      const org = Object.assign({}, this.organizador, this.inscricaoForm.value);
      this.organizadorService.registrarOrganizador(org)
        .subscribe(
          result => { this.onSaveComplete(result); },
          fail => { this.onError(fail); }
        );
    }
  }

  onSaveComplete(response: any) {
    this.inscricaoForm.reset();
    this.errors = [];

    localStorage.setItem('base-project.token', response.access_token);
    localStorage.setItem('base-project.user', JSON.stringify(response.user));

    const toastrMessage = this.toastr.success('Usuário registrado.', 'Sucesso');

    if (toastrMessage) {
      toastrMessage.onHidden.subscribe(() => this.router.navigate(['/home']));
    }
  }

  onError(fail: any) {
    this.toastr.error('Ocorreram erros durante a operação.', 'Ops!');
    this.errors = fail.error.errors;
  }
}
