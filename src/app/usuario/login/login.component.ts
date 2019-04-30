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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  loginForm: FormGroup;
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
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres'
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, CustomValidators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]],
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const p = Object.assign({}, this.organizador, this.loginForm.value);

      this.organizadorService.login(p)
        .subscribe(
          result => { this.onSaveComplete(result); },
          fail => { this.onError(fail); }
        );
    }
  }

  onSaveComplete(response: any): void {
    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('base-project.token', response.access_token);
    localStorage.setItem('base-project.user', JSON.stringify(response.user));

    const toastrMessage = this.toastr.success('Login realizado', 'Sucesso');
    if (toastrMessage) {
      toastrMessage.onHidden.subscribe(() => this.router.navigate(['/home']));
    }
  }

  onError(fail: any) {
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
    this.errors = fail.error.errors;
  }
}
