import { Component, OnInit } from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './sidebar-books.component.scss']
})
export class SidebarComponent implements OnInit{
  selected = 1;

  constructor(){
    
  }

  ngOnInit(): void {
    $('ul li').on('click', function() {
      $('li').removeClass('active');
      $(this).addClass('active');
    });
  }
}
