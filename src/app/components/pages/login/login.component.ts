import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AuthRequest, AuthResponse } from 'src/app/models/auth.model';
import { StudentResponse } from 'src/app/models/student.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
declare let $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  newLogin: AuthRequest = new AuthRequest();
  loading = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastrService
  ) {

  }

  applyBlur() {
    document.querySelector('.background')?.classList.add('blur-effect');
  }

  removeBlur() {
    document.querySelector('.background')?.classList.remove('blur-effect');
  }

  login() {
    this.loading = true;
    this.authService.login(this.newLogin).subscribe({
      next: (response: AuthResponse) => {
        this.authService.setToken(response.token);
        const roles = this.authService.getRoles();
        const username = this.authService.getUsername();
        if (roles[RoleEnum.LIBRARIAN]) {
          void this.router.navigate(['/library/catalog']);
        } else if (roles[RoleEnum.STUDENT]) {
          this.userService.findStudentByUsername(username).subscribe({
            next: (response: StudentResponse) => {
              this.authService.setStudent(response);
              void this.router.navigate(['/library/catalog']);
            },
            error: (error: HttpErrorResponse) => {
              this.toastService.error(error.error);
            }
          })
        } else {
          this.authService.logout();
        }
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
      }
    })
  }
}
