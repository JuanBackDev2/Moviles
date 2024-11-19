import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  currentDate = new Date(); 
  constructor(private dbservice:DbserviceService,private ionTabs: IonTabs,private router: Router) { }

  messages:any[] = []
 
  async ngOnInit() {
    (await this.dbservice.getExRequests()).subscribe(res=>{
      this.messages = res
    })

    this.ionTabs.ionTabsDidChange.subscribe(async () => {
      console.log("Tab has changed, reloading data...");
      (await this.dbservice.getExRequests()).subscribe(res=>{
        this.messages = res
      })
    });
  }

  async doTrade(trade:any){
    let obj = {
      idori: trade.idori,
      nombreduenori: trade.nombreduenoori,
      nombreduenointer: trade.nombreduenointer,
      idinter: trade.idinter
    }
    
    this.dbservice.saveAcceptExchange(obj).subscribe(
      response => {
        console.log('Response:', response);
        alert("Se ha realizado el intercambio")
        //window.location.reload(); 
        this.router.navigate(['/e/tabs/tab7'], { queryParams: { reload: true } });
      },
      error => {
        console.error('Error:', error);
        // Handle the error, maybe show an error message
      });

      
  }
}
