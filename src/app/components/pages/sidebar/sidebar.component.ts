import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RoleEnum } from 'src/app/enums/role.enum';
declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './sidebar-books.component.scss']
})
export class SidebarComponent implements OnInit {
  selected: number;
  role = RoleEnum;

  constructor(private router: Router) { }

  ngOnInit(): void {
    $('ul li').on('click', function () {
      $('li').removeClass('active');
      $(this).addClass('active');
    });
    this.router.events.subscribe(event => {
      this.updateSelected(event['routerEvent']['url']);
    });
  }

  private updateSelected(url: string): void {
    if (url.includes('catalog')) {
      this.selected = 1;
    } else if (url.includes('loans')) {
      this.selected = 2;
    } else if (url.includes('reservations')) {
      this.selected = 3;
    } else if (url.includes('students')) {
      this.selected = 4;
    } else if (url.includes('careers')) {
      this.selected = 5;
    }
  }
}
