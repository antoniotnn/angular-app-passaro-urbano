import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { debounceTime, distinctUntilChanged, map, switchMap, catchError } from 'rxjs/operators';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;
  //public ofertas2: Oferta[];

  private subjectPesquisa: Subject<string> = new Subject<string>();


  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), // executa a ação do switchMap após 1 seg
      distinctUntilChanged(), // para fazer pesquisas distintas
      switchMap(((termo: string) => {
        //console.log('requisição http para a api');
        
        if(termo.trim() === '') {
          //retornar um observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      })),
      catchError((erro) => {
        //console.log(erro);
        return of<Oferta[]>([]);
      })
    )    
    /*
    this.ofertas.subscribe((ofertas: Oferta[]) => { 
      console.log(ofertas);
      this.ofertas2 = ofertas;
    });
    */
  }

  
  public pesquisa(termoDaBusca: string): void { //caso abaixo o parametro é event: Event
    //console.log((<HTMLInputElement>event.target).value); 
    /*
    this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);

    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro: any) => console.log('Erro status: ' + erro.status),
      () => console.log('Fluxo de eventos completo')
    );
    */
    //console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);

  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }

}
