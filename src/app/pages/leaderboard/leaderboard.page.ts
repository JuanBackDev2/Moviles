
import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
})
export class LeaderboardPage implements OnInit {

  constructor(private dbservice:DbserviceService) { }

  firstData:any = []
  tableData:any

  ngOnInit() {

    this.getAllInter();
    
  }



  async getAllInter(): Promise<void> {
    (await this.dbservice.getAllInter()).subscribe(
      (data) => {
        this.firstData = data; /*now we gotta get the second data calling rick api to get the img and name based on id we received and then store the condensed data in an object and then push to the array we will use in html*/ 
        console.log("Data received:", data); //rememver id original can't be the same as idintercambio wouldn't make sense

        // Count occurrences
        const nameCounts = data.reduce((acc:any, item:any) => {
          const name = item.nombrenuevo;
          if (name) {
            acc[name] = (acc[name] || 0) + 1;
          }
          return acc;
        }, {});

        // Prepare data for the table
        this.tableData = Object.entries(nameCounts).map(([name, count]) => ({
          owner: name,
          intercambios: count as number
        })).sort((a: any, b: any) => b.intercambios - a.intercambios);
      }
      )
  };

  }


