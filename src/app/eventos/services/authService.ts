import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {

    public token: string;
    public user;

    constructor(private router: Router) { }

    canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.token = localStorage.getItem('base-project.token');
        this.user = JSON.parse(localStorage.getItem('base-project.user'));

        if (!this.token || !this.user) {
            this.router.navigate(['/entrar']);
            return false;
        }

        const claim: any = routeAc.data[0];

        if (claim !== undefined) {

            const validClaim = routeAc.data[0].claim;

            if (validClaim) {
                if (this.user.claim) {
                    this.router.navigate(['/acesso-negado']);
                }
                const userClaims = this.user.claims.some(x => x.type === validClaim.nome && x.value === validClaim.valor);
                if (!userClaims) {
                    this.router.navigate(['/acesso-negado']);
                }
            }
        }
        return true;
    }
}
