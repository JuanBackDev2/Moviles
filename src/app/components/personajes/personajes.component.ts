import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.scss'],
})
export class PersonajesComponent  implements OnInit {

  @Input() personajes: any[] = [];
  @Input() titulo:string = '';
  @Input() subtitulo:string = '';
  iconVisible: boolean = false;

  constructor(private router:Router, private storageService:StorageService, private dbservice:DbserviceService) { }

  ngOnInit() {}

  irAPersonaje(unIdPersonaje:number){
    console.log(unIdPersonaje);
    this.router.navigate(['/pagina2',unIdPersonaje])
  }

  /*
  addFavorito(unPersonaje:any){
    console.log("ADDFavorite",unPersonaje);
    this.storageService.saveRemovePersonaje(unPersonaje);

  }

  esFavorito(unPersonaje:any):boolean{

    if(this.storageService.personajeInFavorites(unPersonaje)){
      return true;
    }
    else {
      return false;
    }
  }

  */
  async addFavorito(unPersonaje:any){
    (await this.dbservice.saveFavorite(unPersonaje)).subscribe(
      response => {
        console.log('Response:', response);
        // Handle the response, maybe show a success message
      },
      error => {
        console.error('Error:', error);
        // Handle the error, maybe show an error message
      }
    );
  }

  
  esFavorito(unPersonaje: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.dbservice.esFav(unPersonaje).subscribe(
        (response) => {
          console.log('Response:', response);
          if (response === 'exists') {
            observer.next(true);
          } else {
            observer.next(false);
          }
          observer.complete();
        },
        (error) => {
          console.error('Error:', error);
          observer.next(false);
          observer.complete();
        }
      );
    });
  }

  toggleIcon() {
    this.iconVisible = !this.iconVisible;
  }
}
