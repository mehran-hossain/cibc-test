import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../sub-comp/navbar/navbar.component';
import { SidebarComponent } from '../../sub-comp/sidebar/sidebar.component';
import { SidebarService, SidebarConfig } from '../../../services/sidebar.service';
import { UserService, User } from '../../../services/user.service';
import { PayeeService, Payee } from '../../../services/payee.service';
import { BillPaymentVerificationModalComponent, BillPaymentData } from '../bill-payment-verification-modal/bill-payment-verification-modal.component';

@Component({
  selector: 'app-cibc-bill-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, BillPaymentVerificationModalComponent],
  templateUrl: './cibc-bill-payment.component.html',
  styleUrl: './cibc-bill-payment.component.css'
})
export class CibcBillPaymentComponent implements OnInit {
  sidebarConfig: SidebarConfig = {
    mainButtons: [],
    sections: []
  };

  chequingBalance: number = 0;
  chequingAccountNumber: string = '';
  user: User | null = null;
  userPayees: Payee[] = [];
  
  // Modal properties
  showVerificationModal: boolean = false;
  currentPaymentData: BillPaymentData | null = null;
  selectedPayee: Payee | null = null;
  enteredAmount: number = 0;

  constructor(
    public sidebarService: SidebarService, 
    private userService: UserService,
    private payeeService: PayeeService
  ) {}

  ngOnInit(): void {
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
    this.user = this.userService.getUser();
    if (this.user) {
      this.chequingBalance = this.user.accounts.chequing.balance;
      this.chequingAccountNumber = this.user.accounts.chequing.accountNumber;
      this.loadUserPayees();
    }
  }

  loadUserPayees(): void {
    if (this.user) {
      this.payeeService.getUserPayees(this.user.username).subscribe({
        next: (response) => {
          this.userPayees = response.payees;
        },
        error: (error) => {
          console.error('Error loading user payees:', error);
        }
      });
    }
  }

  // Modal event handlers
  onAmountInput(event: any, payee: Payee): void {
    const amount = parseFloat(event.target.value) || 0;
    this.enteredAmount = amount;
    this.selectedPayee = payee;
  }

  onNextButtonClick(): void {
    if (this.selectedPayee && this.enteredAmount > 0) {
      this.currentPaymentData = {
        payee: `${this.selectedPayee.name} (${this.selectedPayee.accountNumber})`,
        account: `Chequing (${this.chequingAccountNumber})`,
        amount: this.enteredAmount,
        paymentDate: 'July 22, 2025' // You can make this dynamic based on selected date
      };
      this.showVerificationModal = true;
    }
  }

  onModalCancel(): void {
    this.showVerificationModal = false;
    this.currentPaymentData = null;
    this.selectedPayee = null;
    this.enteredAmount = 0;
  }

  onModalBack(): void {
    this.showVerificationModal = false;
    this.currentPaymentData = null;
    this.selectedPayee = null;
    this.enteredAmount = 0;
  }

  onModalPayBill(): void {
    // Handle the actual bill payment logic here
    console.log('Processing bill payment:', this.currentPaymentData);
    this.showVerificationModal = false;
    this.currentPaymentData = null;
    this.selectedPayee = null;
    this.enteredAmount = 0;
    // You can add success message or redirect logic here
  }
} 