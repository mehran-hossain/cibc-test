import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Payee } from '../../../services/payee.service';

@Component({
  selector: 'app-payee-verification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payee-verification-modal.component.html',
  styleUrl: './payee-verification-modal.component.css'
})
export class PayeeVerificationModalComponent {
  @Input() payee: Payee | null = null;
  @Input() nickname: string = '';
  @Input() accountNumber: string = '';

  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() add = new EventEmitter<void>();

  onCancel() { this.cancel.emit(); }
  onBack() { this.back.emit(); }
  onAdd() { this.add.emit(); }
}
