import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Pedido } from './shared/pedido.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { URL_API } from './app.api';

@Injectable()
export class OrdemCompraService {

    constructor(private http: HttpClient) {}

    public efetivarCompra(pedido: Pedido): Observable<number> {
        return this.http.post(
            `${URL_API}/pedidos`,
            pedido
        ).pipe(map( (resposta: Response) => resposta['id'] ));
    }
}