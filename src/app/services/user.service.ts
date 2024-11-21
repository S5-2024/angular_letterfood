import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userURL = "http://localhost:3000/user/"
  constructor(private http: HttpClient) {}


  auth(body: object): Observable<any>{
    return this.http.post(`${this._userURL}/login`, body).pipe(
      catchError(this.errorHandler)
    )
  }
  create(user: object): Observable<any>{
    return this.http.post(`${this._userURL}`, user).pipe(
      catchError(this.errorHandler)
    )
  }
  getById(userId: string){
    return this.http.get(`${this._userURL}/${userId}`).pipe(
      catchError(this.errorHandler)
    )
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
