import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  email: string = '';  // Store the email input value
  password: string = '';  // Store the password input value

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    // Navigate to the 'e' route when the form is submitted

    this.authService.obtenerDatos(this.email,this.password).subscribe({
      next: (data) => {
        console.log("Datos recibidos:", JSON.stringify(data)); 
        if(data === "Invalid email or password"){
          alert("Invalid email or pass")
        }else{
          this.router.navigate(['/e/tabs']);
        }
        
        console.log("here")
      },
      error: (error) => {
        console.error("Error al hacer la petición:", JSON.stringify(error));
        alert("Invalid email or pass")
      }
    });

  }
}
