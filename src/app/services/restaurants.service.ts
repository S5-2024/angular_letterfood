import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private _restaurantURL = "http://localhost:3000/restaurantes";
  private _reviewURL = "http://localhost:3000/avaliacoes"
  /* private _restaurantURL = "https://letterfood-back.onrender.com/restaurantes"; */
  constructor(private http: HttpClient) { }

  getRestaurants(): Observable<any> {
    return this.http.get(this._restaurantURL).pipe(
      catchError(this.errorHandler)
    )
  }

  createRestaurant(body: FormData): Observable<any>{
    return this.http.post(this._restaurantURL + "/registro", body).pipe(
      catchError(this.errorHandler)
    )
  }

  getAvaliacoes(): Observable<any> {
    return this.http.get(this._reviewURL).pipe(
      catchError(this.errorHandler)
    )
  }
  createAvaliacoes(body: Object): Observable<any>{
    return this.http.post(this._reviewURL, body).pipe(
      catchError(this.errorHandler)
    )
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    let errorMessage = ''

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      errorMessage = `Erro na requisição: Código ${error.status}, ` +
        `Mensagem: ${error.message}`;
    }
    console.error(errorMessage)
    return throwError(() => new Error(errorMessage))
  }
}
