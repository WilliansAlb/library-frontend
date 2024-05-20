import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: ['./simple-modal.component.scss']
})
export class SimpleModalComponent {
  @Input() title: string = "";
  @Output() close = new EventEmitter<any>();
  @Input() showRequired: boolean = true;
}

