import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private dbservice:DbserviceService,private router: Router) { }

  ngOnInit() {
  }

  email: string = '';
  user: string = '';
  psw: string = '';

  onSubmit() {
    let obj = {
      email:this.email,
      user:this.user,
      psw:this.psw
    }
    
    this.dbservice.saveAccount(obj).subscribe(
      response => {
        console.log('Response:', response);
        alert("Se ha registrado el usuario")
        //window.location.reload(); 
        this.router.navigate(['/']);
      },
      error => {
        console.error('Error:', error);
        // Handle the error, maybe show an error message
      });
  }

}
