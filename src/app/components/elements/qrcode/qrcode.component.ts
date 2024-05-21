import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() qrData: string;

  ngAfterViewInit(): void {
    this.generateQRCode();
  }

  async generateQRCode(): Promise<void> {
    try {
      const canvas = this.canvas.nativeElement;
      await QRCode.toCanvas(canvas, this.qrData, { errorCorrectionLevel: 'H' });
    } catch (error) {
      console.error('Error generating QR code', error);
    }
  }
}

