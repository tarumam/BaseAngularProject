import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ServiceBase } from './service.base';
import { Categoria, Evento } from './../eventos/models/evento';

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
}

