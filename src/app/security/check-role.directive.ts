import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appCheckRole]'
})
export class CheckRoleDirective implements OnInit {

  @Input() roles: RoleEnum[] = [];

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    if (!this.roles.length) return;
    const userRoles = this.authService.getRoles();
	  console.log(userRoles);
    for (let i = 0; i < this.roles.length; i++) {
      const element = this.roles[i];
      if (userRoles[element]) {
        return;
      }
    }
    
    this.elementRef.nativeElement.remove();
  }
}