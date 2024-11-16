import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  currentDate = new Date(); 
  constructor(private dbservice:DbserviceService) { }

  messages:any[] = []
 
  async ngOnInit() {
    (await this.dbservice.getExRequests()).subscribe(res=>{
      this.messages = res
    })
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
        window.location.reload(); 
      },
      error => {
        console.error('Error:', error);
        // Handle the error, maybe show an error message
      });

      
  }
}
