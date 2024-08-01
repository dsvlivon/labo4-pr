import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FirebaseService } from '../services/firestore.service';
import { map, Observable } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const fireStore = inject(FirebaseService);
  const router = inject(Router);

  const email = localStorage.getItem('user');

  var usuario: any;

  if (!email) {
    router.navigate(['/login']);
    return false;
  }
  usuario = authService.getCurrentUser();

  return fireStore.obtenerDatoPorCriterio('repartidores', 'email', email).pipe(
    map((users: any[]) => {
      const user = users[0];

      if ( usuario != null && user.rol === 'admin') {
        return true;
      } else {
        router.navigate(['/home']);
        return false;
      }
    })
  );
};
