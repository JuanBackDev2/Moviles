import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { URL_RM } from '../config/url.servicios';



@Injectable({
  providedIn: 'root'
})
export class RickyMortyBdService {

  constructor(private http: HttpClient) { }

  getAllPersonajes():any{
    let url = `${URL_RM}/character`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('PERSONAJES_RK',res);
        return res;
      })
    );
  } 

  getPersonajeId(unId:number):any{
    let url = `${URL_RM}/character/${unId}`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        
        return res;
      })
    );
  } 

  getAllLocations():any{
    let url = `${URL_RM}/location`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('Location_RK',res);
        return res;
      })
    );
  } 


  getLugarId(unId:number):any{
    let url = `${URL_RM}/location/${unId}`;

    return this.http.get(url, {}).pipe(
      map((res: any) => {
        
        return res;
      })
    );
  } 

  getMorePersonajes(next_url:string):any{


    let url = `${URL_RM}/character`;
 
 
    if (next_url.length > 0){
      url = `${next_url}`
    }
 
 
    return this.http.get(url, {}).pipe(
      map((res: any) => {
        console.log('PERSONAJES_RK',res);
        return res;
      })
    );
  }
 


}
