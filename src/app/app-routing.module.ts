import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { StudentsComponent } from './components/pages/students/students.component';
import { CareersComponent } from './components/pages/careers/careers.component';
import { InvitationComponent } from './components/pages/invitation/invitation.component';

const routes: Routes = [{
  path: '', component: LoginComponent
},
{
  path: 'library', component: SidebarComponent, children: [
    { path: 'catalog', component: CatalogComponent },
    { path: 'students', component: StudentsComponent },
    { path: 'careers', component: CareersComponent }
  ]
}, {
  path: 'invitation/:license', component: InvitationComponent, pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
