import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
})
export class LugaresComponent  implements OnInit {

  @Input() locations: any[] = [];
  @Input() titulo:string = '';
  @Input() subtitulo:string = '';
  
  constructor(private router:Router) { }

  ngOnInit() {}

  irALocation(unIdLocation:number){
    this.router.navigate(['/pagina1',unIdLocation])
  }

}
