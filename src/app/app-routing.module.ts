import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { StudentsComponent } from './components/pages/students/students.component';
import { CareersComponent } from './components/pages/careers/careers.component';
import { InvitationComponent } from './components/pages/invitation/invitation.component';
import { LoansComponent } from './components/pages/loans/loans.component';
import { authGuard } from './security/auth.guard';
import { RoleEnum } from './enums/role.enum';
import { BookingComponent } from './components/pages/booking/booking.component';
import { ReportsComponent } from './components/pages/reports/reports.component';

const routes: Routes = [{
  path: '', redirectTo: 'library/catalog', pathMatch: 'full'
},
{
  path: 'library', component: SidebarComponent, children: [
    {
      path: 'catalog',
      component: CatalogComponent,
      canActivate: [authGuard],
      data: { roles: [RoleEnum.LIBRARIAN, RoleEnum.STUDENT] }
    },
    {
      path: 'students',
      component: StudentsComponent,
      canActivate: [authGuard],
      data: { roles: [RoleEnum.LIBRARIAN] }
    },
    {
      path: 'careers',
      component: CareersComponent,
      canActivate: [authGuard],
      data: { roles: [RoleEnum.LIBRARIAN] }
    },
    {
      path: 'loans',
      component: LoansComponent,
      canActivate: [authGuard],
      data: { roles: [RoleEnum.LIBRARIAN, RoleEnum.STUDENT] }
    },
    {
      path: 'booking',
      component: BookingComponent,
      canActivate: [authGuard],
      data: { roles: [RoleEnum.LIBRARIAN, RoleEnum.STUDENT] }
    },
    {
      path: 'reports',
      component: ReportsComponent,
      canActivate: [authGuard],
      data: { roles: [RoleEnum.LIBRARIAN] }
    }
  ]
}, {
  path: 'invitation/:license', component: InvitationComponent, pathMatch: 'full'
}, {
  path: 'login', component: LoginComponent,
  canActivate: [authGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
