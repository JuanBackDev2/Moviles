import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  constructor(private http: HttpClient) { }

  async saveFavorite(personaje:any){
    let img = personaje.image
    let id = personaje.id 
    let name = personaje.name
    let owner = "Jhon"
    let apiUrlOne = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/savefav'
    let apiUrlTwo = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/existsfav'
    const body = { img, id,name,owner};  

    let params = new HttpParams().set('id', id).set('owner',"Jhon");

    this.http.get<any>(apiUrlTwo, { params }).subscribe(response => {
      if (response === "exists") {
        return this.deleteFav(id)
      } else{
        console.log("ADDED")
      }
    }, error => {
      // Handle any errors that occur during the HTTP request
      console.error("Error occurred:", error);
    });

    return this.http.post<any>(apiUrlOne,body);
  }


  deleteFav(id:any){
    let apiUrl = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/deletefav'

    const params = new HttpParams().set('id', id).set('owner','Jhon');

    this.http.delete(apiUrl, { params }).subscribe(
      response => {
        console.log('Item deleted successfully:', response);
        return 'Item deleted successfully:'
      },
      error => {
        console.error('Error deleting item:', error);
        // Handle error actions here
      }
    );
  }


  esFav(personaje:any){
    let params = new HttpParams().set('id', personaje.id).set('owner',"Jhon");
    let apiUrlTwo = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/existsfav'

    return this.http.get<any>(apiUrlTwo,{params});
  }

  getFavoritos(){
    let params = new HttpParams().set('owner', "Jhon");
     let apiUrl = 'https://nodemovilesback-gsa4hgdkabf5cac3.canadacentral-01.azurewebsites.net/getfavoritos'
     return this.http.get<any>(apiUrl,{params});
  }
}
