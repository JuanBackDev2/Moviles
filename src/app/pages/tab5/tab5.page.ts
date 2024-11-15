import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private dbservice:DbserviceService,private router: Router,private http: HttpClient,private ionTabs: IonTabs,private route: ActivatedRoute,private authService: AuthService) { }

  firstData:any = []
  username!: string;

  ngOnInit() {
    this.getSubastas();

    this.ionTabs.ionTabsDidChange.subscribe(() => {
      console.log("Tab has changed, reloading data...");
      this.getSubastas()
    });

    this.route.queryParams.subscribe(params => {
      if (params['reload']) {
        this.getSubastas();
      }
    });

    this.authService.username$.subscribe((name) => {
      this.username = name;
    });

  }

  ionViewWillEnter() {
    console.log("Page is about to enter, reloading data...");
    this.getSubastas();
  }
/*
  tableData = [
    { owner: 'Dom', name: 6000,img:"https://rickandmortyapi.com/api/character/avatar/361.jpeg"},
    { owner: 'Melissa', name: 5150,img:"https://rickandmortyapi.com/api/character/avatar/361.jpeg" },
    // Add more rows as needed
  ];
*/

  async getSubastas(): Promise<void> {
    (await this.dbservice.getSubastas()).subscribe({
      next: async (data) => {
        this.firstData = data; /*now we gotta get the second data calling rick api to get the img and name based on id we received and then store the condensed data in an object and then push to the array we will use in html*/ 
        console.log("Data received:", data); //rememver id original can't be the same as idintercambio wouldn't make sense
        
        for (let item of this.firstData) {
          try {
            // Make an API request for each item individually
            let response = await this.http.get<any>(`https://rickandmortyapi.com/api/character/${item.idori}`).toPromise();
      
            // Merge the current item with the response data
            item.characterName = response.name;
      
          } catch (error) {
            console.error(`Error fetching data for id ${item.idori}:`, error);
          }
        }

      },
      error: (err) => console.error("Error fetching data:", err), 
      complete: () => console.log("Data fetch complete") 
    });
  }


  goTrade(row:any){
    if(row.nombreduenoori===this.username){
      alert("You can't trade your own character!")
      return
    }

    this.router.navigate(['/offer-two'], { queryParams: { data: JSON.stringify(row) } });
  }

  add(){
    this.router.navigate(['offer']);
  }
}
