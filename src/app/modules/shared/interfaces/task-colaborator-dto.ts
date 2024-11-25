export interface TaskColaboratorDTO {
    task_id: number;
    title: string;
    description: string;
    due_date: string;
    is_complete: boolean;
}

export interface TaskColaboratorRequestDTO {
    title: string;
    description: string;
    due_date: string; // formato ISO
    is_complete: boolean;
  }