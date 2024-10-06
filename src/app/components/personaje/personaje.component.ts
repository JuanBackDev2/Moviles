import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss'],
})
export class PersonajeComponent  implements OnInit {

  @Input() personaje:any;
  
  constructor() { }

  ngOnInit() {}

}
//Desde los lugares a los personajes