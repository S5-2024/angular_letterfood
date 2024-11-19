import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GeneralApiService {
  private _urlList = {
    "brasilAPI_CNPJ": "https://brasilapi.com.br/api/cnpj/v1/",
    "viacep": "https://viacep.com.br/ws/"
  }
  constructor(private http: HttpClient) { }



  fetchCnpjInfo(cnpj: string) {
    return this.http.get<any>(this._urlList.brasilAPI_CNPJ + cnpj).pipe(
      catchError(this.errorHandler)
    )
  }

  fetchCEP(cep: string){
    return this.http.get<any>(this._urlList.viacep + cep + "/json").pipe(
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
