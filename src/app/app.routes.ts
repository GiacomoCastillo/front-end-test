import { Routes } from '@angular/router';
import { SLoginComponent } from './modules/shared/components/s-login/s-login.component';
import { gColaboratorGuard } from './shared/guards/g-colaborator.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: SLoginComponent, },
    { path: 'colaborator', 
        canActivate: [gColaboratorGuard],
        loadChildren: () => import('./modules/colaborator/colaborator.module').then(m => m.ColaboratorModule)
    },

];
