import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const gColaboratorGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyectar el servicio Router
  const userId = sessionStorage.getItem('user_id');

  if (userId) {
    return true; // Permitir acceso
  } else {
    router.navigate(['/login']); // Redirigir al login si no está autenticado
    return false;
  }
};
