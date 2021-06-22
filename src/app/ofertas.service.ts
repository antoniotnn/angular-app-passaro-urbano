import { Oferta } from './shared/oferta.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';


import { URL_API } from './app.api';



@Injectable()
export class OfertasService {
    
    //private url_api = 'http://localhost:3000/ofertas';

    constructor(private http: HttpClient){}
    
    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisição Http
    
        return this.http.get(`${URL_API}/ofertas?destaque=true`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta);
               
        //retornar uma promise Oferta[]
    }

    public getOfertasPorCategoria(categoria: String): Promise<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`)
            .toPromise()
            .then((resposta: Oferta[]) => resposta);
        }

    public getOfertaPorId(id: number): Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
            .toPromise()
            .then((resposta: Oferta) => {
            // console.log(resposta.shift()); ou resposta[0]
                return resposta[0];
        })
    }

    public getComoUsarOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`)
            .toPromise()
            .then((resposta: Promise<string>) =>{
                //console.log(resposta[0].descricao);
                return resposta[0].descricao;   
        })

    }

    public getOndeFicaOfertaPorId(id: number): Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`)
            .toPromise()
            .then((resposta: Promise<string>) =>{
                //console.log(resposta[0].descricao);
                return resposta[0].descricao;   
        })

    }

    public pesquisaOfertas(termo: string): Observable<Oferta[]> {
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`)
            .pipe(
                retry(10),
                map((resposta: Oferta[]) => resposta)
            )
    }
    
}
