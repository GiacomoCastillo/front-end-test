import { Component } from '@angular/core';

@Component({
  selector: 'app-c-acccount',
  templateUrl: './c-acccount.component.html',
  styleUrl: './c-acccount.component.css'
})
export class CAcccountComponent {

  userId: string | null = '';
  username: string | null = '';
  email: string | null = '';
  create_at : string | null = '';

  ngOnInit(): void {
    // Obtener la información de la sesión
    this.userId = sessionStorage.getItem('user_id');
    this.username = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email');
    this.create_at = sessionStorage.getItem('createdAt');
    console.log("this.createdAt");
    console.log(this.create_at);
  }

}
