import { Component } from '@angular/core';
declare let $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  applyBlur() {
    document.querySelector('.background')?.classList.add('blur-effect');
  }

  removeBlur() {
    document.querySelector('.background')?.classList.remove('blur-effect');
  }
}
