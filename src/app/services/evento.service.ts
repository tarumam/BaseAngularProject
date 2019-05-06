import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ServiceBase } from './service.base';
import { Categoria, Evento, Endereco } from './../eventos/models/evento';

@Injectable()
export class EventoService extends ServiceBase {

    constructor(private http: HttpClient) { super(); }

    obterCategorias(): Observable<Categoria[]> {
        return this.http
            .get<Categoria[]>(this.urlServiceV1 + 'eventos/categorias')
            .pipe(
                catchError(super.serviceError));
    }

    obterTodos(): Observable<Evento[]> {
        return this.http
            .get<Evento[]>(this.urlServiceV1 + 'eventos')
            .pipe(
                catchError(super.serviceError));
    }

    registrarEvento(evento: Evento): Observable<Evento> {
        return this.http
            .post(this.urlServiceV1 + 'eventos', evento, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    atualizarEvento(evento: Evento): Observable<Evento> {
        return this.http
            .put(this.urlServiceV1 + 'eventos', evento, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    excluirEvento(id: string): Observable<Evento> {
        return this.http
            .delete(this.urlServiceV1 + 'eventos/' + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterMeusEventos(): Observable<Evento[]> {
        return this.http
            .get<Evento[]>(this.urlServiceV1 + 'eventos/meus-eventos', super.ObterAuthHeaderJson())
            .pipe(
                catchError(super.serviceError));
    }

    obterMeuEvento(id: string): Observable<Evento> {
        return this.http
            .get<Evento>(this.urlServiceV1 + 'eventos/meus-eventos/' + id, super.ObterAuthHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError));
    }

    obterEvento(id: string): Observable<Evento> {
        return this.http
            .get<Evento>(this.urlServiceV1 + 'eventos/' + id)
            .pipe(
                catchError(super.serviceError));
    }

    adicionarEndereco(endereco: Endereco): Observable<Endereco> {
        const response = this.http
            .post(this.urlServiceV1 + 'endereco', endereco, super.ObterAuthHeaderJson()).pipe(
                map(super.extractData),
                catchError((super.serviceError)));
        return response;
    };

    atualizarEndereco(endereco: Endereco): Observable<Endereco> {
        const response = this.http
            .put(this.urlServiceV1 + 'endereco', endereco, super.ObterAuthHeaderJson()).pipe(
                map(super.extractData),
                catchError((super.serviceError)));
        return response;
    };
}

