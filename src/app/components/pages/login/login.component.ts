import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AuthRequest, AuthResponse } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router
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
        if (roles[RoleEnum.LIBRARIAN] || roles[RoleEnum.STUDENT]) {
          void this.router.navigate(['/library/catalog']);
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
