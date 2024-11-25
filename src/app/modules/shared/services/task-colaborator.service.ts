import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskColaboratorDTO, TaskColaboratorRequestDTO } from '../interfaces/task-colaborator-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskColaboratorService {

  private readonly baseUrl = 'https://localhost:7282/api/TaskColaborator'; // Reemplaza xxxx con el puerto del backend

  constructor(private http: HttpClient) {}

  // Crear una tarea
  createTaskColaborator(task: TaskColaboratorRequestDTO): Observable<TaskColaboratorDTO> {
    return this.http.post<TaskColaboratorDTO>(`${this.baseUrl}`, task);
  }

  // Obtener todas las tareas
  getAllTaskColaborators(): Observable<TaskColaboratorDTO[]> {
    return this.http.get<TaskColaboratorDTO[]>(`${this.baseUrl}`);
  }

  // Obtener una tarea por ID
  getTaskColaboratorById(id: number): Observable<TaskColaboratorDTO> {
    return this.http.get<TaskColaboratorDTO>(`${this.baseUrl}/${id}`);
  }

  // Actualizar una tarea
  updateTaskColaborator(id: number, task: TaskColaboratorRequestDTO): Observable<TaskColaboratorDTO> {
    return this.http.put<TaskColaboratorDTO>(`${this.baseUrl}/${id}`, task);
  }

  // Eliminar una tarea
  deleteTaskColaborator(id: number): Observable<{ Message: string }> {
    return this.http.delete<{ Message: string }>(`${this.baseUrl}/${id}`);
  }
  
}
