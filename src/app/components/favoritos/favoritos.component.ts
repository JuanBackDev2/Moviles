import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss'],
})
export class FavoritosComponent  implements OnInit {

  @Input() personajesFav: any[] = [];
  @Input() titulo:string = '';
  @Input() subtitulo:string = '';

  constructor(private router:Router, private storageService:StorageService, private dbservice:DbserviceService, private ionTabs: IonTabs) { 
    
  }

  ngOnInit() {
    this.getFavorites("Jhon")

    this.ionTabs.ionTabsDidChange.subscribe(() => {
      console.log("Tab has changed, reloading data...");
      this.getFavorites("Jhon");
    });
    
   
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        // You can check the event.url or event.urlAfterRedirects for specific routes
        console.log('Navigation started to: ', event.url);
        this.getFavorites('Jhon');
        if (event.url === '/pagina2') {
          this.getFavorites('Jhon'); // Call your function to reload data
        }
      }
    });
  }

  irAPersonaje(unIdPersonaje:number){
    console.log(unIdPersonaje);
    this.router.navigate(['/pagina2',unIdPersonaje])
  }

  

  getFavorites(owner: string): void {
    this.dbservice.getFavoritos().subscribe(
      (response) => {
        this.personajesFav = response;
        console.log('Favorites:', this.personajesFav);
      },
      (error) => {
        console.error('Error fetching favorites:', error);
      }
    );
  }

}
