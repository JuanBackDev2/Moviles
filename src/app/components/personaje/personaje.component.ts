import { Component, Input, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.scss'],
})
export class PersonajeComponent  implements OnInit {

  @Input() personaje:any;
  isFavorite:any
  
  constructor(private dbservice:DbserviceService) { }

  ngOnInit() {
    this.dbservice.esFav(this.personaje).subscribe(
      response => {
        // Add the isFavorite property dynamically based on the response
        console.log(response)
        console.log(this.personaje.id)
        if(response === "exists"){
          console.log("here i am")
          this.isFavorite = true;
        }else{
          this.isFavorite = false;
        }
      },
      error => {
        console.error('Error checking favorite:', error);
        this.isFavorite = false; // Default to not favorite in case of error
      }
    );
  }

  async toggleFavorite(personaje: any) {
    // Ensure the property exists before toggling
    this.isFavorite = !this.isFavorite;
    
    (await this.dbservice.saveFavorite(personaje)).subscribe();

  }

}
//Desde los lugares a los personajes