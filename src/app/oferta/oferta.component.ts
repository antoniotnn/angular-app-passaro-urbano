import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';
import { CarrinhoService } from '../carrinho.service';
import { OfertasService } from '../ofertas.service';

import { Oferta } from '../shared/oferta.model';

//import { interval, Subscription, Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  //private tempoObservableSubscription: Subscription;
  //private meuObservableTesteSubscription: Subscription;

  public oferta: Oferta;

  constructor(private route: ActivatedRoute,
     private ofertasService: OfertasService,
     private carrinhoService: CarrinhoService
     ) { }

  ngOnInit(): void {

    this.route.params.subscribe((parametros: Params) => {
      
      this.ofertasService.getOfertaPorId(parametros.id)
        .then(( oferta: Oferta) => {
          this.oferta = oferta;
        })
      });
    }
    //console.log('Id recuperado da rota: ', this.route.snapshot.params['id']);

    /*
    this.route.params.subscribe(
      (parametro: any) => { console.log(parametro) },
      (erro: any) => console.log(erro),
      () => console.log('processamento foi classificado como concluído!')
    );
    
    let tempo = interval(2000);

    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo);
    });
    
  
    //observable (observável)
    let meuObservableTeste = new Observable((observer: Observer<number> ) => {
      observer.next(1);
      observer.next(3);
      observer.complete();
      observer.next(3);
    });

    //observable (observador)
    
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos foi finalízada')
    );
    */

  
  ngOnDestroy(): void {
    /*
    this.meuObservableTesteSubscription.unsubscribe();
    this.tempoObservableSubscription.unsubscribe();
    */
  }

  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItens());
  }

}
