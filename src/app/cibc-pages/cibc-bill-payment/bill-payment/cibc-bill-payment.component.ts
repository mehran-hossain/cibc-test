import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NavbarComponent } from '../../sub-comp/navbar/navbar.component';
import { SidebarComponent } from '../../sub-comp/sidebar/sidebar.component';
import { SidebarService, SidebarConfig } from '../../../services/sidebar.service';
import { UserService, User } from '../../../services/user.service';
import { PayeeService, Payee as BasePayee } from '../../../services/payee.service';
import { BillPaymentVerificationModalComponent, BillPaymentData } from '../bill-payment-verification-modal/bill-payment-verification-modal.component';
import { AccountSelectModalComponent, AccountOption } from '../account-select-modal/account-select-modal.component';

type Payee = BasePayee & { selectedAccountType: string };

@Component({
  selector: 'app-cibc-bill-payment',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, SidebarComponent, BillPaymentVerificationModalComponent, AccountSelectModalComponent],
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

  // Account select modal state
  showAccountModal: boolean = false;
  accountOptions: AccountOption[] = [];
  accountModalPayeeIndex: number | null = null;

  constructor(
    public sidebarService: SidebarService, 
    private userService: UserService,
    private payeeService: PayeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sidebarConfig = this.sidebarService.getSidebarConfig('home');
    this.user = this.userService.getUser();
    if (this.user) {
      this.chequingBalance = this.user.accounts.chequing.balance;
      this.chequingAccountNumber = this.user.accounts.chequing.accountNumber;
      this.loadUserPayees();
      this.accountOptions = [
        {
          type: 'Chequing',
          accountNumber: this.user.accounts.chequing.accountNumber,
          balance: this.user.accounts.chequing.balance
        },
        {
          type: 'Savings',
          accountNumber: this.user.accounts.savings.accountNumber,
          balance: this.user.accounts.savings.balance > 0 ? this.user.accounts.savings.balance : null
        }
      ];
    }
  }

  loadUserPayees(): void {
    if (this.user) {
      this.payeeService.getUserPayees(this.user.username).subscribe({
        next: (response) => {
          this.userPayees = response.payees.map(payee => ({
            ...payee,
            selectedAccountType: 'Chequing', // default
            userAccountNumber: this.chequingAccountNumber
          }));
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
    if (!this.user || !this.selectedPayee || !this.enteredAmount || !this.currentPaymentData) {
      alert('Missing payment information.');
      return;
    }
    const payeeId = this.selectedPayee.id;
    const accountType = this.selectedPayee.selectedAccountType || 'Chequing';
    const paymentDate = this.currentPaymentData.paymentDate || new Date().toISOString().split('T')[0];
    this.payeeService.payBill(
      this.user.username,
      payeeId,
      this.enteredAmount,
      accountType,
      paymentDate
    ).subscribe({
      next: (res) => {
        // Update user and payees in UI
        if (this.user) {
          this.user.accounts = res.user.accounts;
          this.userService.setUser(this.user);
        }
        this.userPayees = res.payees.map(payee => ({
          ...payee,
          selectedAccountType: accountType,
          userAccountNumber: this.selectedPayee ? this.selectedPayee.userAccountNumber : ''
        }));
        this.router.navigate(['bill-payment-confirmation'], {
          state: {
            payee: this.currentPaymentData?.payee,
            account: this.currentPaymentData?.account,
            amount: this.currentPaymentData?.amount,
            paymentDate: this.currentPaymentData?.paymentDate
          }
        });
      },
      error: (err) => {
        alert('Bill payment failed: ' + (err.error?.message || err.message));
      },
      complete: () => {
        this.showVerificationModal = false;
        this.currentPaymentData = null;
        this.selectedPayee = null;
        this.enteredAmount = 0;
      }
    });
  }

  onAccountClick(payeeIndex: number): void {
    this.accountModalPayeeIndex = payeeIndex;
    this.showAccountModal = true;
  }

  onAccountModalClose(): void {
    this.showAccountModal = false;
    this.accountModalPayeeIndex = null;
  }

  onAccountSelect(account: AccountOption): void {
    if (this.accountModalPayeeIndex !== null) {
      this.userPayees[this.accountModalPayeeIndex].userAccountNumber = account.accountNumber;
      (this.userPayees[this.accountModalPayeeIndex] as any).selectedAccountType = account.type;
    }
    this.showAccountModal = false;
    this.accountModalPayeeIndex = null;
  }
} 