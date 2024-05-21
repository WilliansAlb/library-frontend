import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SidebarComponent } from './components/pages/sidebar/sidebar.component';
import { CatalogComponent } from './components/pages/catalog/catalog.component';
import { AuthInterceptor } from './security/auth.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BookModalComponent } from './components/modals/book-modal/book-modal.component';
import { SimpleModalComponent } from './components/modals/simple-modal/simple-modal.component';
import { LoadingButtonComponent } from './components/elements/loading-button/loading-button.component';
import { CheckRoleDirective } from './security/check-role.directive';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentsComponent } from './components/pages/students/students.component';
import { CareersComponent } from './components/pages/careers/careers.component';
import { InvitationComponent } from './components/pages/invitation/invitation.component';
import { QrcodeComponent } from './components/elements/qrcode/qrcode.component';
import { QrModalComponent } from './components/modals/qr-modal/qr-modal.component';
import { LoansComponent } from './components/pages/loans/loans.component';
import { InputAutocompleteComponent } from './components/elements/input-autocomplete/input-autocomplete.component';
import { CreateLoanModalComponent } from './components/modals/create-loan-modal/create-loan-modal.component';
import { ResultLoanModalComponent } from './components/modals/result-loan-modal/result-loan-modal.component';
import { BalanceModalComponent } from './components/modals/balance-modal/balance-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    CatalogComponent,
    BookModalComponent,
    SimpleModalComponent,
    LoadingButtonComponent,
    CheckRoleDirective,
    StudentsComponent,
    CareersComponent,
    InvitationComponent,
    QrcodeComponent,
    QrModalComponent,
    LoansComponent,
    InputAutocompleteComponent,
    CreateLoanModalComponent,
    ResultLoanModalComponent,
    BalanceModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
