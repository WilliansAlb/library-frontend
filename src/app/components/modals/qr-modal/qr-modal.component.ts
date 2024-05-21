import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-qr-modal',
  templateUrl: './qr-modal.component.html',
  styleUrls: ['./qr-modal.component.scss']
})
export class QrModalComponent {
  @Output() close = new EventEmitter<any>();
  @Input() license = "201830221";
  URL_BACK = environment.LIBRARY_BACKEND_URL;
}
