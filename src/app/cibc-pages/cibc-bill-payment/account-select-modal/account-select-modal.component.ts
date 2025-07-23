import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AccountOption {
  type: string; // e.g., 'Chequing', 'Savings'
  accountNumber: string;
  balance: number | null; // null if not available
}

@Component({
  selector: 'app-account-select-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account-select-modal.component.html',
  styleUrl: './account-select-modal.component.css'
})
export class AccountSelectModalComponent {
  @Input() isVisible: boolean = false;
  @Input() accounts: AccountOption[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() select = new EventEmitter<AccountOption>();

  onClose() { this.close.emit(); }
  onSelect(account: AccountOption, event: Event) {
    event.preventDefault();
    this.select.emit(account);
  }
} 