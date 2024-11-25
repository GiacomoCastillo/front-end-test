import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskColaboratorDTO, TaskColaboratorRequestDTO } from '../../../shared/interfaces/task-colaborator-dto';
import { TaskColaboratorService } from '../../../shared/services/task-colaborator.service';
import { SweetAlertService } from '../../../shared/services/sweet-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { CModalInfoComponent } from '../c-modal-info/c-modal-info.component';

@Component({
  selector: 'app-c-tasks',
  templateUrl: './c-tasks.component.html',
  styleUrl: './c-tasks.component.css'
})
export class CTasksComponent {

  taskForm: FormGroup;
  
  tasks: TaskColaboratorDTO[] = [];

  dataSource = new MatTableDataSource<TaskColaboratorDTO>();
  displayedColumns: string[] = ['title', 'due_date', 'is_complete', 'description', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private taskColaboratorService: TaskColaboratorService,
    private sweetAlertService: SweetAlertService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
  ) {
    // Inicialización del formulario de tareas
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      due_date: ['', Validators.required],
      is_complete: [false]
    });
  }

  ngOnInit(): void {
    // Cargar todas las tareas al iniciar
    this.loadTasks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  
  // Método para cargar todas las tareas
  loadTasks(): void {
    this.spinner.show();
    const observer: Observer<TaskColaboratorDTO[]> = {
      next: (response) => {
        this.tasks = response;
        this.dataSource.data = this.tasks; // Almacena las tareas en el arreglo
        this.spinner.hide();
      },
      error: (error) => {
        console.error(error);
        this.sweetAlertService.sweetError('Error', 'No se pudieron cargar las tareas.', 3000);
        this.spinner.hide();
      },
      complete: () => {}
    };

    this.taskColaboratorService.getAllTaskColaborators().subscribe(observer);
  }

  // Método para crear una tarea
  onSubmit(): void {
    if (this.taskForm.valid) {
      this.spinner.show();
      const newTask: TaskColaboratorRequestDTO = this.taskForm.value;

      const observer: Observer<TaskColaboratorDTO> = {
        next: (response) => {
          this.sweetAlertService.sweetSuccess('Tarea Creada', 'La tarea se creó correctamente.', 3000);
          this.tasks.push(response); // Añade la nueva tarea a la lista
          this.spinner.hide();
          this.taskForm.reset();
          window.location.reload(); // Limpia el formulario
        },
        error: (error) => {
          console.error(error);
          this.sweetAlertService.sweetError('Error', 'No se pudo crear la tarea.', 3000);
          this.spinner.hide();
        },
        complete: () => {}
      };

      this.taskColaboratorService.createTaskColaborator(newTask).subscribe(observer);
    }
  }

  // Método para eliminar una tarea
  deleteTask(id: number): void {
    this.spinner.show();

    const observer: Observer<{ Message: string }> = {
      next: (response) => {
        this.sweetAlertService.sweetSuccess('Tarea Eliminada', response.Message, 3000);
        this.tasks = this.tasks.filter((task) => task.task_id !== id); // Filtra la tarea eliminada
        this.spinner.hide();
      },
      error: (error) => {
        console.error(error);
        this.sweetAlertService.sweetError('Error', 'No se pudo eliminar la tarea.', 3000);
        this.spinner.hide();
      },
      complete: () => {}
    };

    this.taskColaboratorService.deleteTaskColaborator(id).subscribe(observer);
  }

  openInfoDialog(taskId: number): void {
    this.dialog.open(CModalInfoComponent, {
      width: '400px',
      data: { taskId } // Pasas el ID de la tarea
    });
  }

}
