import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMainComponent } from './components/c-main/c-main.component';
import { CAcccountComponent } from './components/c-acccount/c-acccount.component';
import { CTasksComponent } from './components/c-tasks/c-tasks.component';

const routes: Routes = [
  {
    path: '', component: CMainComponent,
    children:[
      {path: '', component: CAcccountComponent},
      {path: 'account', component: CAcccountComponent},
      {path: 'task', component: CTasksComponent},      
    ]    
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColaboratorRoutingModule { }
