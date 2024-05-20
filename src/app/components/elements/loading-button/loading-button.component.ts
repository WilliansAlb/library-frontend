import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonLoading } from 'src/app/models/loading-button.model';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent {
  @Input() object: ButtonLoading = new ButtonLoading("btn-success", false, "GUARDAR", "fa-save");
  @Input() disabled: boolean = false;
  @Output() clicked = new EventEmitter();
}