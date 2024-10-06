import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-lugar',
  templateUrl: './lugar.component.html',
  styleUrls: ['./lugar.component.scss'],
})
export class LugarComponent  implements OnInit {

  @Input() lugar:any;
  residentes: any[] = [];
  constructor(private http: HttpClient,private bd: RickyMortyBdService) { 
    /*this.lugar.residents.forEach((residentUrl:any) => {
      this.http.get(residentUrl, {}).pipe(
        map((res: any) => {
          this.residentes.push(res)
          console.log("aquiii");
        })
      );
    });
    */
  }

  ngOnInit() {
   
    if (this.lugar && this.lugar.residents) {
      console.log("herewS")
      this.lugar.residents.forEach((residentUrl: any) => {
        this.bd
        .getPersonajeId(residentUrl.split('/').pop())
        .toPromise()
        .then((resp: any) => {
          console.log(resp)
          this.residentes.push(resp);

        });
      });
    }
  }

}
