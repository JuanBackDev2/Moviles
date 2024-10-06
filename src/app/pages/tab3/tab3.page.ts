import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  personajes: any[] = [];
  constructor(private storageService:StorageService) {
    this.personajes = this.storageService.getLocalPersonajes;
    
  }

}
