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

  doTrade(){
    alert("Acc")
  }
}
