import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-pagina1',
  templateUrl: './pagina1.page.html',
  styleUrls: ['./pagina1.page.scss'],
})
export class Pagina1Page implements OnInit {

  unIdLugar!:number;
  lugar:any;

  constructor(private activatedRoute: ActivatedRoute,private bd: RickyMortyBdService) {
    this.activatedRoute.params.subscribe(params=>{
      this.unIdLugar = params['id'];
      this.cargarLugar();
    })
  }

  ngOnInit() {
  }

  async cargarLugar() {

    await this.bd
      .getLugarId(this.unIdLugar)
      .toPromise()
      .then((resp: any) => {
        this.lugar = resp;

        console.log("MIPERSONAJE", this.lugar);

      });
  }

}
