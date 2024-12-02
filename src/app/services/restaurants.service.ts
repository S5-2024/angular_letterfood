import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private _restaurantURL = "http://localhost:3000/rest";
  constructor(private http: HttpClient) {}


  create(restaurant: object): Observable<any>{
    console.info(restaurant)
    return this.http.post(this._restaurantURL, restaurant).pipe(
      catchError(this.errorHandler)
    )
  }
  getRestaurantList(): Observable<any>{
    return this.http.get(this._restaurantURL).pipe(
      catchError(this.errorHandler)
    )
  }
  getRestaurantById(id: any) {
    return this.http.get(`${this._restaurantURL}/${id}`)
  }

  private errorHandler(error: HttpErrorResponse): Observable<any>{
    let errorMessage = ''
    
    if(error.error instanceof ErrorEvent){
      errorMessage = `Erro: ${error.error.message}`;
    }else{
      errorMessage = `Erro na requisição: Código ${error.status}, ` +
                     `Mensagem: ${error.message}`;
    }
    console.error(errorMessage)
    return throwError(() => new Error(errorMessage))
  }
}
