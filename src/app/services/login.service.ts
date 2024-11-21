import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}


  auth(body: object): Observable<any>{
    return this.http.post("http://localhost:3000/user/login", body).pipe(
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
