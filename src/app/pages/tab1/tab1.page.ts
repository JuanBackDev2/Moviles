import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { RickyMortyBdService } from 'src/app/services/ricky-morty-bd.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  //Variable donde vamos a colocar los personajes.
  personajes: any[] = [];
  url_next!: string;

  //La injeccion del servicio para traer los datos
  constructor(private bd: RickyMortyBdService) {

   }

   ngOnInit() {
    //Aqui realizo la carga real de los personajes, 
    //despues que toda la pagina ha sido cargada
    this.cargarPersonajes();  
 }



  //El metodo que va a cargar los personajes
  /*async cargarPersonajes() {

    await this.bd
      .getAllPersonajes()
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignacion de los personajes de la respuesta
        this.personajes = resp.results;

        console.log("MISPERSONAJES", this.personajes);

      });
  }
      */


  
//El metodo que va a cargar los personajes
 async cargarPersonajes() {
  //this.cargando = true;
  await this.bd
    .getAllPersonajes()
    .toPromise()
    .then((resp: any) => {
      //Aqui se realiza la asignacion de los personajes de la respuesta
      this.personajes = resp.results;
      console.log("MISPERSONAJES",this.personajes);


      this.url_next = resp.info.next;
      console.log("SIGUIENTE",this.url_next);


    });
}


  async cargarPersonajesSiguientes() {
    //this.cargando = true;
    await this.bd
      .getMorePersonajes(this.url_next)
      .toPromise()
      .then((resp: any) => {
        //Aqui se realiza la asignacion de los personajes de la respuesta
        let masPersonajes = resp.results;
        this.personajes.push( ...masPersonajes );
 
 
        /*
        for(let i=0;i< masPersonajes.length;i++){
          let unPersonaje = masPersonajes[i];
          this.personajes.push(unPersonaje)
        }
        */ 
 
        this.url_next = resp.info.next;
        console.log("SIGUIENTE",this.url_next);
 
 
      });
  }
 

  onIonInfinite(ev:any) {
    this.cargarPersonajesSiguientes();
 
 
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
 




}
