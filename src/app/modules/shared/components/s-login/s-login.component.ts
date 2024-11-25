//import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserColabService } from '../../services/user-colab.service';
import { UserColabDTO, UserColabLoginDTO } from '../../interfaces/user-colab-dto';
import { Observer } from 'rxjs';
import { SweetAlertService } from '../../services/sweet-alert.service';
import Swal from 'sweetalert2';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-s-login',
  templateUrl: './s-login.component.html',
  styleUrl: './s-login.component.css'
})
export class SLoginComponent {

  loginForm: FormGroup;
  registerForm: FormGroup;

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userColabService: UserColabService,
    private sweetAlertService: SweetAlertService,
    private spinner: NgxSpinnerService
  ) {
    // Inicialización del formulario de login
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // Inicialización del formulario de registro
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // Método para manejar el login
  // Método para manejar el login
  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      this.spinner.show(); // Muestra el spinner mientras se realiza el login
      const credentials: UserColabLoginDTO = this.loginForm.value;
  
      const observer: Observer<any> = {
        next: (response) => {
          console.log("response");
          console.log(response.user);
          console.log(response.Message);
          sessionStorage.setItem('user_id', response.user.user_id);
          sessionStorage.setItem('username', response.user.username);
          sessionStorage.setItem('email', response.user.email);
          sessionStorage.setItem('createdAt', response.user.created_at);

          this.sweetAlertService.sweetSuccess('Login Exitoso', response.Message, 3000); // Muestra mensaje de éxito
          this.router.navigate(['/colaborator']);
          this.spinner.hide();
        },
        error: (error) => {
          console.error(error.error.Message); // Manejo de errores
          this.sweetAlertService.sweetError('Error', error.error.Message, 3000); // Mostrar alerta de error
          this.spinner.hide();
        },
        complete: () => {
          // Optional: Handle completion if needed (e.g., reset forms)
        }
      };
  
      this.userColabService.login(credentials).subscribe(observer);
    }
  }
  
  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      this.spinner.show(); // Muestra el spinner mientras se realiza el registro
      const newUser: UserColabDTO = this.registerForm.value;
  
      const observer: Observer<any> = {
        next: (response: { Message: any; }) => {
          console.log(response.Message); // Muestra mensaje de éxito
          this.spinner.hide();

          // Mueve al tab de login después del registro
          if (this.tabGroup) {
            this.tabGroup.selectedIndex = 0; // Cambia al primer tab (Login)
          }
          this.sweetAlertService.sweetSuccess('Registro Exitoso', 'Ahora puedes iniciar sesión con tus credenciales.', 3000); // Muestra mensaje de éxito
          // Mensaje de éxito con SweetAlert          
        },
        error: (error: { error: { Message: any; }; }) => {
          console.error(error.error.Message); // Manejo de errores
          this.spinner.hide();
          this.sweetAlertService.sweetError('Error', error.error.Message, 3000); // Mostrar alerta de error          
        },
        complete: () => {
          // Optional: Handle completion if needed (e.g., reset forms)
        }
      };
  
      this.userColabService.register(newUser).subscribe(observer);
    }
  }

}
