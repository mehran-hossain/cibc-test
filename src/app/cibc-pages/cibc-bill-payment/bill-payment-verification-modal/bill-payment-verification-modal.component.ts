import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface BillPaymentData {
  payee: string;
  account: string;
  amount: number;
  paymentDate: string;
}

@Component({
  selector: 'app-bill-payment-verification-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bill-payment-verification-modal.component.html',
  styleUrl: './bill-payment-verification-modal.component.css'
})
export class BillPaymentVerificationModalComponent {
  @Input() paymentData: BillPaymentData | null = null;
  @Input() isVisible: boolean = false;

  @Output() cancel = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();
  @Output() payBill = new EventEmitter<void>();

  onCancel() { this.cancel.emit(); }
  onBack() { this.back.emit(); }
  onPayBill() { this.payBill.emit(); }
} 