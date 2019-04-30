import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable()
export abstract class ServiceBase {

    protected urlServiceV1 = 'https://localhost:5001/api/v1/';

    protected ObterHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    protected ObterAuthHeaderJson() {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.obterTokenUsuario()}`
            })
        };
    }

    protected obterTokenUsuario(): string {
        return localStorage.getItem('base-project.token');
    }

    public obterUsuario() {
        return JSON.parse(localStorage.getItem('base-project.user'));
    }

    protected extractData(response: any) {
        return response.data || {};
    }

    protected serviceError(error: Response | any) {
        let errMsg: string;

        if (error instanceof Response) {

            errMsg = `${error.status} - ${error.statusText || ''}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return throwError(error);
    }
}
