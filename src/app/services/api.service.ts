import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ou você pode fazer isso diretamente no componente, se preferir
})
export class ApiService {
  private apiUrl = 'http://localhost:8800/'; // URL do seu backend

  constructor(private http: HttpClient) {}

  // Exemplo de método para buscar dados
  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dados`);
  }

  // Exemplo de método para enviar dados
  postData(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/dados`, data);
  }
}
