import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';

const routes: Routes = [{
  path: '', component: LoginComponent
},
{
  path: 'library', component:SidebarComponent, children: [
    { path: 'catalog', component: CatalogComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
