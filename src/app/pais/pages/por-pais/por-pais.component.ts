import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country, Languages } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [`
    li{
      cursor:pointer;
    }
  `]
})
export class PorPaisComponent {

  termino:string='';
  hayError: boolean=false;
  paises:Country[]=[];
  paisesSugeridos:Country[]=[];

  constructor(private paisService:PaisService) { }

  buscar(termino:string){
    
    this.termino=termino;
    this.hayError=false;

    console.log(this.termino);
    this.paisService.buscarPais(this.termino)
    .subscribe((paises)=>{
      console.log(paises)
      this.paises=paises;
    }, (err)=>{
      this.hayError=true;
      this.paises=[];
      console.log('Error');
      console.info(err);
    });
  }

  sugerencias(termino:string){
    this.hayError=false;
    
    this.paisService.buscarPais(termino)
    .subscribe(paises=>this.paisesSugeridos = paises.splice(0,4),
    (err)=>this.paisesSugeridos=[])
  }

}
