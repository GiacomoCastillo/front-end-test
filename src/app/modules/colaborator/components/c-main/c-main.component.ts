import { Component } from '@angular/core';
import { CTopbarService } from '../../services/c-topbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-main',
  templateUrl: './c-main.component.html',
  styleUrl: './c-main.component.css'
})
export class CMainComponent {

  listMenu: any = [];
  sessionUser:any = [];

  menuActive = false;
  
  toggleMenu(): void {
    this.menuActive = !this.menuActive;
  }

  constructor(
    private topBarService: CTopbarService,
    private router : Router,
  ){
    this.listMenu = this.topBarService.menus;
  }

  navigate(route: string) {
    if (route != "log-out") {
      this.router.navigate(['colaborator/'+route]);
    }else{
      this.logout();
    }
  }

  logout(): void {
    // Eliminar las variables de sesión
    sessionStorage.removeItem('user_id');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('email');

    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
