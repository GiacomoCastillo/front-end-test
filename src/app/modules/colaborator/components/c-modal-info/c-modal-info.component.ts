import { Component, Inject } from '@angular/core';
import { TaskColaboratorDTO } from '../../../shared/interfaces/task-colaborator-dto';
import { TaskColaboratorService } from '../../../shared/services/task-colaborator.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-c-modal-info',
  templateUrl: './c-modal-info.component.html',
  styleUrl: './c-modal-info.component.css'
})
export class CModalInfoComponent {

  taskDetails!: TaskColaboratorDTO | null;

  constructor(
    private taskColaboratorService: TaskColaboratorService,
    private dialogRef: MatDialogRef<CModalInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number } // Recibe el ID como parámetro
  ) {

  }

  ngOnInit(): void {
    this.loadTaskDetails(this.data.taskId);
  }

  loadTaskDetails(taskId: number): void {
    this.taskColaboratorService.getTaskColaboratorById(taskId).subscribe({
      next: (response) => {
        this.taskDetails = response;
      },
      error: (err) => {
        console.error('Error fetching task details:', err);
        this.taskDetails = null;
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  

}
