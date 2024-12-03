import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private urls = {
    authUrl: "http://localhost:3000/usuarios/login",
    general : "http://localhost:3000/api/usuarios/",
    general2: "http://localhost:3000/usuarios"
  }
  constructor(private http: HttpClient) {}


  auth(body: Object): Observable<any>{
    return this.http.post(this.urls.authUrl, body).pipe(
      catchError(this.errorHandler)
    )
  }
  
  create(user: object): Observable<any>{
    return this.http.post(``, user).pipe(
      catchError(this.errorHandler)
    )
  }
  getById(userId: string){
    return this.http.get(`${this.urls.general2}/${userId}`).pipe(
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
