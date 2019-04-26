import { Injectable } from '@angular/core';
import { ServiceBase } from './service.base';
import { HttpClient } from '@angular/common/http';
import { Organizador } from '../usuario/models/organizador';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class OrganizadorService extends ServiceBase {
    constructor(private http: HttpClient) { super(); }

    registrarOrganizador(organizador: Organizador): Observable<Organizador> {

        return this.http.post(this.urlServiceV1 + 'nova-conta', organizador, this.ObterHeaderJson())
            .pipe(
                map(super.extractData),
                catchError(super.serviceError)
            )
    }


}


