import { Injectable } from '@angular/core';
import { ApiResponse, UserColabDTO, UserColabLoginDTO } from '../interfaces/user-colab-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserColabService {

  private readonly baseUrl = 'https://localhost:7282/api/UserColab'; // Reemplaza xxxx con el puerto del backend

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(user: UserColabDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/register`, user);
  }

  // Login de usuario
  login(credentials: UserColabLoginDTO): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.baseUrl}/login`, credentials);
  }
}
