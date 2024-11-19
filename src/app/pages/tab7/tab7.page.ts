import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  
  firstData:any = []
  constructor(private dbservice:DbserviceService,private http: HttpClient,private ionTabs: IonTabs,private route: ActivatedRoute) { }

  ngOnInit() {
    this.getIntercambiados()

    this.ionTabs.ionTabsDidChange.subscribe(() => {
      console.log("Tab has changed, reloading data...");
      this.getIntercambiados()
    });

    
    this.route.queryParams.subscribe(params => {
      if (params['reload']) {
        this.getIntercambiados();
      }
    });
  }

  async getIntercambiados(): Promise<void> {
    (await this.dbservice.getIntercambiados()).subscribe({
      next: async (data) => {
        this.firstData = data; /*now we gotta get the second data calling rick api to get the img and name based on id we received and then store the condensed data in an object and then push to the array we will use in html*/ 
        console.log("Data received:", data); //rememver id original can't be the same as idintercambio wouldn't make sense
        
        for (let item of this.firstData) {
          try {
            // Make an API request for each item individually
            let response = await this.http.get<any>(`https://rickandmortyapi.com/api/character/${item.idnuevo}`).toPromise();
            let responseTwo = await this.http.get<any>(`https://rickandmortyapi.com/api/character/${item.idviejo}`).toPromise();
            // Merge the current item with the response data
            item.characterName = response.name;
            item.exchangedByName = responseTwo.name;

      
          } catch (error) {
            console.error(`Error fetching data for id ${item.idori}:`, error);
          }
        }

      },
      error: (err) => console.error("Error fetching data:", err), 
      complete: () => console.log("Data fetch complete") 
    });
  }

}
